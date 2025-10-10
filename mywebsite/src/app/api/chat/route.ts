import OpenAI from "openai";
import { NextRequest } from "next/server";
import { buildGitHubContext } from "./github";
import { systemPrompt } from "./systemPrompt";

export const runtime = "nodejs";
export const preferredRegion = ["auto"];

const token = process.env.GITHUB_MODELS_TOKEN;
const model = process.env.GITHUB_MODELS_MODEL ?? "openai/gpt-5";
const baseURL = "https://models.github.ai/inference";

export async function POST(req: NextRequest) {
    try {
        if (!token) throw new Error("Missing GITHUB_MODELS_TOKEN");
        const { messages = [], temperature = 0.3 } = await req.json();

        // 🔗 busca GitHub em tempo real
        const gh = await buildGitHubContext();

        // 🧠 montamos o contexto: prompt de engenharia + snapshot GitHub
        const finalMessages = [
            { role: "system", content: systemPrompt },
            { role: "system", content: gh }, // contexto factual
            ...messages,
        ];

        const client = new OpenAI({ apiKey: token, baseURL });

        const completion = await client.chat.completions.create({
            model,
            messages: finalMessages,
            temperature,
            stream: true,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of completion) {
                    const content = chunk.choices?.[0]?.delta?.content ?? "";
                    if (content) {
                        const payload = {
                            id: "chatcmpl-stream",
                            object: "chat.completion.chunk",
                            choices: [{ index: 0, delta: { content }, finish_reason: null }],
                        };
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
                    }
                }
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
        });
    } catch (err: any) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message ?? "Unknown error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

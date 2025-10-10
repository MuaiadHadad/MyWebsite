"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Square } from "lucide-react";
import { Press_Start_2P } from "next/font/google";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const press = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type Msg = { id: string; role: "user" | "bot"; text: string; ts: number };
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([
        { id: "hi", role: "bot", text: "Hi! How can I help? 👾", ts: Date.now() },
    ]);
    const [loading, setLoading] = useState(false);
    const ctrlRef = useRef<AbortController | null>(null);
    const areaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("chat_open");
        if (saved) setOpen(saved === "1");
    }, []);
    useEffect(() => {
        localStorage.setItem("chat_open", open ? "1" : "0");
    }, [open]);

    useEffect(() => {
        const el = areaRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [msgs, open]);

    const pixelBorder = useMemo(
        () => "shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_6px_0_0_#0008] border border-white/15",
        []
    );

    const send = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const user: Msg = { id: crypto.randomUUID(), role: "user", text: trimmed, ts: Date.now() };
        setMsgs((m) => [...m, user]);
        setText("");

        // placeholder do bot
        const botId = crypto.randomUUID();
        setMsgs((m) => [...m, { id: botId, role: "bot", text: "", ts: Date.now() }]);

        // histórico (system é inserido no servidor)
        const history: ChatMessage[] = buildHistory(msgs, trimmed);

        // cancela requisição anterior se houver
        ctrlRef.current?.abort();
        const ctrl = new AbortController();
        ctrlRef.current = ctrl;

        try {
            setLoading(true);
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: history, stream: true }),
                signal: ctrl.signal,
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            if (!res.body) throw new Error("No body");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let partial = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });

                for (const line of chunk.split("\n")) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine.startsWith("data:")) continue;
                    const data = trimmedLine.slice(5).trim();
                    if (data === "[DONE]") continue;
                    try {
                        const json = JSON.parse(data);
                        const delta = json.choices?.[0]?.delta?.content ?? "";
                        if (delta) {
                            partial += delta;
                            setMsgs((m) => m.map((x) => (x.id === botId ? { ...x, text: partial } : x)));
                        }
                    } catch {
                        // ignore keepalives
                    }
                }
            }
        } catch (err) {
            setMsgs((m) =>
                m.map((x) => (x.id === botId ? { ...x, text: "Falha ao contactar o modelo." } : x))
            );
        } finally {
            setLoading(false);
        }
    };

    const stop = () => {
        ctrlRef.current?.abort();
        setLoading(false);
    };

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close chat" : "Open chat"}
                className={`fixed bottom-5 right-5 z-[120] inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-neutral-900 transition hover:translate-y-[1px] focus:outline-none ${pixelBorder}`}
            >
                {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            </button>

            {/* Panel */}
            <div
                className={`fixed bottom-20 right-5 z-[110] w-[min(92vw,360px)] origin-bottom-right ${
                    open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                } transition-all duration-200`}
                role="dialog"
                aria-hidden={!open}
            >
                <div className={`relative rounded-2xl bg-neutral-900/80 backdrop-blur-md ${pixelBorder}`}>
                    {/* pixel overlays */}
                    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px)]" />
                    <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />

                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <div className={`text-xs text-emerald-300 ${press.className}`}>CHATBOT</div>
                        <div className="flex items-center gap-2">
                            {loading && <span className="text-[10px] text-neutral-400">thinking…</span>}
                            {loading && (
                                <button
                                    onClick={stop}
                                    className="rounded-lg p-1 text-neutral-300 hover:bg-white/10"
                                    aria-label="Stop generating"
                                >
                                    <Square className="h-4 w-4" />
                                </button>
                            )}
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg p-1 text-neutral-300 hover:bg-white/10"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* messages */}
                    <div
                        ref={areaRef}
                        className="relative max-h-[50vh] min-h-[220px] overflow-y-auto px-3 pb-3 pt-1"
                    >
                        {msgs.map((m) => (
                            <Bubble key={m.id} role={m.role} text={m.text} />
                        ))}
                    </div>

                    {/* input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            send();
                        }}
                        className="flex items-end gap-2 border-t border-white/10 bg-neutral-900/70 p-2"
                    >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder="Type a message…"
                className="h-9 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none focus:border-emerald-400/40"
            />
                        <button
                            type="submit"
                            className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-500 px-3 text-sm font-semibold text-neutral-900 hover:translate-y-[1px] disabled:opacity-50"
                            disabled={!text.trim()}
                            aria-label="Send"
                            title="Send"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

function Bubble({ role, text }: { role: "user" | "bot"; text: string }) {
    const isUser = role === "user";
    const html = useMemo(() => {
        if (isUser) return "";
        const compact = text
            .replace(/\n{3,}/g, "\n\n")
            .replace(/\n\s+\n/g, "\n\n")
            .trim();
        const raw = marked.parse(compact, { gfm: true, breaks: false });
        return DOMPurify.sanitize(raw as string);
    }, [isUser, text]);

    return (
        <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug
          ${isUser
                    ? "bg-emerald-600/20 text-emerald-100 border border-emerald-400/30"
                    : "bg-white/5 text-neutral-100 border border-white/10"}
          shadow-[0_2px_0_0_#000,0_4px_0_0_#111]
          ${isUser ? "whitespace-pre-wrap" : "whitespace-normal"} break-words [overflow-wrap:anywhere]`}
            >
                {isUser ? (
                    text
                ) : (
                    <div
                        className={[
                            // zera margens padrão e adiciona um espacinho mínimo entre blocos
                            "[&>*]:my-0",
                            "[&>*+*]:mt-0.5",            // 2px entre blocos (em vez de mt-1 = 4px)
                            "[&>p]:mb-0 [&>p]:mt-0",
                            "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-0",
                            "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:my-0",
                            "[&>li]:my-0",
                            "[&_a]:underline [&_a]:break-words",
                            "[&_code]:font-mono [&_code]:text-xs",
                            "[&_pre]:overflow-x-auto",
                        ].join(" ")}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </div>
        </div>
    );
}


function buildHistory(prev: Msg[], latestUser: string): ChatMessage[] {
    // O prompt de sistema e o contexto GitHub são inseridos no servidor.
    const recent = prev.slice(-8);
    const mapped: ChatMessage[] = recent.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
    }));
    return [...mapped, { role: "user", content: latestUser }];
}

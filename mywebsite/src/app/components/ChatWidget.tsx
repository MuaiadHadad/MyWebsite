"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Press_Start_2P } from "next/font/google";

const press = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type Msg = { id: string; role: "user" | "bot"; text: string; ts: number };

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState<Msg[]>([
        { id: "hi", role: "bot", text: "Hi! How can I help? 👾", ts: Date.now() },
    ]);
    const areaRef = useRef<HTMLDivElement>(null);

    // remember open state
    useEffect(() => {
        const saved = localStorage.getItem("chat_open");
        if (saved) setOpen(saved === "1");
    }, []);
    useEffect(() => {
        localStorage.setItem("chat_open", open ? "1" : "0");
    }, [open]);

    // auto scroll to bottom
    useEffect(() => {
        const el = areaRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [msgs, open]);

    const pixelBorder = useMemo(
        () =>
            "shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_6px_0_0_#0008] border border-white/15",
        []
    );

    const send = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;
        const user: Msg = { id: crypto.randomUUID(), role: "user", text: trimmed, ts: Date.now() };
        setMsgs((m) => [...m, user]);
        setText("");

        // --- Stub de resposta (mock). Troca por chamada a /api/chat se quiseres.
        const thinking: Msg = { id: crypto.randomUUID(), role: "bot", text: "…", ts: Date.now() };
        setMsgs((m) => [...m, thinking]);
        setTimeout(() => {
            setMsgs((m) =>
                m.map((msg) =>
                    msg.id === thinking.id
                        ? {
                            ...msg,
                            text: replyHeuristics(trimmed),
                        }
                        : msg
                )
            );
        }, 400);
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
                className={`fixed bottom-20 right-5 z-[110] w-[min(92vw,360px)] origin-bottom-right
        ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
        transition-all duration-200`}
                role="dialog"
                aria-hidden={!open}
            >
                {/* chrome / header */}
                <div
                    className={`relative rounded-2xl bg-neutral-900/80 backdrop-blur-md ${pixelBorder}`}
                >
                    {/* pixel grid & scanline overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px)]" />
                    <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />

                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <div className={`text-xs text-emerald-300 ${press.className}`}>CHATBOT</div>
                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-lg p-1 text-neutral-300 hover:bg-white/10"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
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
    return (
        <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed
          ${isUser ? "bg-emerald-600/20 text-emerald-100 border border-emerald-400/30" : "bg-white/5 text-neutral-100 border border-white/10"}
          shadow-[0_2px_0_0_#000,0_4px_0_0_#111]`}
            >
                {text}
            </div>
        </div>
    );
}

function replyHeuristics(input: string) {
    const s = input.toLowerCase();
    if (s.includes("hello") || s.includes("hi")) return "Hello! 👋";
    if (s.includes("contact")) return "You can reach me via the Contact section or here in chat.";
    if (s.includes("project")) return "Tell me which project you’re curious about!";
    return "Got it. I’ll keep it simple and pixel-perfect. 🙂";
}

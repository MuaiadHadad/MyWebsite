// components/ContactSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============ tiny pixel-art utility ============ */
type Pixel = 0 | string;
type Sprite = Pixel[][];
function PixelSprite({
                         data,
                         pixel = 4,
                         gap = 1,
                         className = "",
                     }: {
    data: Sprite;
    pixel?: number;
    gap?: number;
    className?: string;
}) {
    const cols = data[0]?.length ?? 0;
    return (
        <div
            className={`grid ${className}`}
            style={{ gridTemplateColumns: `repeat(${cols}, ${pixel}px)`, gap }}
            aria-hidden
        >
            {data.flatMap((row, y) =>
                row.map((c, x) => (
                    <span
                        key={`${x}-${y}`}
                        style={{
                            width: pixel,
                            height: pixel,
                            background: c ? (c as string) : "transparent",
                            boxShadow: c ? "0 0 0 1px rgba(0,0,0,.15) inset" : undefined,
                        }}
                    />
                )),
            )}
        </div>
    );
}

/* ============ sprites (mail, phone, link) ============ */
const S_MAIL: Sprite = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,"#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9",0,0],
    [0,"#0ea5e9","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#0ea5e9",0,0],
    [0,"#0ea5e9","#ecfeff","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#ecfeff","#0ea5e9",0,0],
    [0,"#0ea5e9","#ecfeff","#ecfeff","#0ea5e9","#0ea5e9","#ecfeff","#ecfeff","#0ea5e9",0,0],
    [0,"#0ea5e9","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#ecfeff","#0ea5e9",0,0],
    [0,"#0ea5e9","#dbeafe","#dbeafe","#dbeafe","#dbeafe","#dbeafe","#dbeafe","#0ea5e9",0,0],
    [0,"#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9",0,0],
    [0,0,"#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

const S_PHONE: Sprite = [
    [0,0,0,"#111","#111","#111",0,0,0],
    [0,0,"#111","#0ea5e9","#0ea5e9","#0ea5e9","#111",0,0],
    [0,"#111","#0ea5e9","#111","#111","#111","#0ea5e9","#111",0],
    [0,"#111","#0ea5e9","#111","#22c55e","#111","#0ea5e9","#111",0],
    [0,"#111","#0ea5e9","#111","#111","#111","#0ea5e9","#111",0],
    [0,"#111","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#0ea5e9","#111",0],
    [0,0,"#111","#111","#111","#111","#111",0,0],
    [0,0,0,"#111","#111","#111",0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

const S_LINK: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,"#22c55e","#22c55e",0,"#22c55e","#22c55e",0,0],
    [0,"#16a34a","#86efac","#22c55e","#22c55e","#22c55e","#86efac","#16a34a",0],
    [0,0,"#22c55e","#22c55e",0,"#22c55e","#22c55e",0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,"#0ea5e9","#0ea5e9",0,"#0ea5e9","#0ea5e9",0,0],
    [0,"#0284c7","#7dd3fc","#0ea5e9","#0ea5e9","#0ea5e9","#7dd3fc","#0284c7",0],
    [0,0,"#0ea5e9","#0ea5e9",0,"#0ea5e9","#0ea5e9",0,0],
    [0,0,0,0,0,0,0,0,0],
];
// GitHub (octocat minimal, 9x9)
const S_GITHUB: Sprite = [
    [0,0,0,"#222","#222",0,0,0,0],
    [0,0,"#222","#000","#000","#222",0,0,0],
    [0,"#222","#000","#222","#222","#000","#222",0,0],
    [0,"#000","#222","#000","#000","#222","#000",0,0],
    [0,"#000","#000","#000","#000","#000","#000",0,0],
    [0,"#000","#222","#000","#000","#222","#000",0,0],
    [0,0,"#222","#000","#000","#222",0,0,0],
    [0,0,0,"#222","#222",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// LinkedIn (blue tile with "in", 9x9)
const S_LINKEDIN: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#2563eb","#2563eb","#2563eb","#2563eb","#2563eb","#2563eb","#2563eb",0],
    [0,"#2563eb","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#2563eb",0],
    [0,"#2563eb","#93c5fd","#2563eb","#2563eb","#2563eb","#93c5fd","#2563eb",0],
    [0,"#2563eb","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#2563eb",0],
    [0,"#2563eb","#93c5fd","#2563eb","#2563eb","#93c5fd","#2563eb","#2563eb",0],
    [0,"#2563eb","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#93c5fd","#2563eb",0],
    [0,"#2563eb","#2563eb","#2563eb","#2563eb","#2563eb","#2563eb","#2563eb",0],
    [0,0,0,0,0,0,0,0,0],
];

/* ============ contactos do teu CV ============ */
const CONTACTS = {
    email: "muaiad@muaiadhadad.me",
    phone: "+351 938 929 505",
    github: "https://github.com/MuaiadHadad",
    linkedin: "https://www.linkedin.com/in/muaiad-hadad/",
    website: "https://muaiadhadad.me",
};

export default function ContactSection() {
    const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState("loading");
        setMessage("");
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

        // honeypot
        if (data._hp) {
            setState("success");
            (e.currentTarget as HTMLFormElement).reset();
            return;
        }

        if (!data.name || !data.email || !data.message) {
            setState("error");
            setMessage("Please fill in name, email and message.");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error();
            setState("success");
            setMessage("Message sent. I’ll get back to you soon!");
            (e.currentTarget as HTMLFormElement).reset();
        } catch {
            setState("error");
            setMessage("Something went wrong. Please try again or email me directly.");
        }
    }

    return (
        <section id="contact" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            {/* pixel grid + vignette */}
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            {/* container: largura de site */}
            <div className="relative mx-auto max-w-7xl px-6 py-20">
                {/* heading */}
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    Contact <span className="text-emerald-300">Me</span>
                </motion.h2>

                {/* grid 12 cols - ocupa a largura do site */}
                <div className="mt-10 grid items-stretch gap-8 md:grid-cols-12">
                    {/* ESQUERDA (span 4) */}
                    <motion.aside
                        initial={{ x: -18, opacity: 0, rotate: -1 }}
                        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: "spring", stiffness: 160, damping: 16 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/70 to-neutral-900/30 p-5 shadow-[0_2px_0_0_#000,0_10px_0_0_#0b0b0b] backdrop-blur md:col-span-4 h-full"
                    >
                        {/* sheen */}
                        <motion.span
                            aria-hidden
                            initial={{ x: "-120%" }}
                            whileInView={{ x: "120%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2 }}
                            className="pointer-events-none absolute -top-1/2 left-0 h-[220%] w-1/3 rotate-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent"
                        />

                        <div className="flex items-center gap-3 text-neutral-300">
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <PixelSprite data={S_MAIL} pixel={4} />
                            </motion.div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300/80">
                                Reach out
                            </h3>
                        </div>
                        <ul className="mt-4 space-y-3 text-neutral-300/90">
                            <li className="flex items-center gap-2">
                                <PixelSprite data={S_MAIL} pixel={3} />
                                <a className="underline hover:text-emerald-300" href={`mailto:${CONTACTS.email}`}>
                                    {CONTACTS.email}
                                </a>
                            </li>

                            <li className="flex items-center gap-2">
                                <PixelSprite data={S_PHONE} pixel={3} />
                                <a className="underline hover:text-emerald-300" href={`tel:${CONTACTS.phone.replace(/\s+/g,"")}`}>
                                    {CONTACTS.phone}
                                </a>
                            </li>

                            <li className="flex items-center gap-2">
                                <PixelSprite data={S_GITHUB} pixel={3} />
                                <a className="underline hover:text-emerald-300" href={CONTACTS.github} target="_blank" rel="noreferrer">
                                    github.com/MuaiadHadad
                                </a>
                            </li>

                            <li className="flex items-center gap-2">
                                <PixelSprite data={S_LINKEDIN} pixel={3} />
                                <a className="underline hover:text-emerald-300" href={CONTACTS.linkedin} target="_blank" rel="noreferrer">
                                    /in/muaiad-hadad
                                </a>
                            </li>

                            <li className="flex items-center gap-2">
                                <PixelSprite data={S_LINK} pixel={3} />
                                <a className="underline hover:text-emerald-300" href={CONTACTS.website} target="_blank" rel="noreferrer">
                                    muaiadhadad.kesug.com
                                </a>
                            </li>
                        </ul>


                        {/* corner glow */}
                        <span className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                    </motion.aside>

                    {/* DIREITA (span 8) */}
                    <motion.form
                        onSubmit={onSubmit}
                        initial={{ x: 18, opacity: 0, rotate: 1 }}
                        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: "spring", stiffness: 160, damping: 16 }}
                        className="md:col-span-8 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 shadow-[0_2px_0_0_#000,0_10px_0_0_#0b0b0b] backdrop-blur h-full"
                    >
                        {/* animated grid shimmer */}
                        <motion.span
                            aria-hidden
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.25, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_12px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_12px)]"
                        />

                        <div className="relative grid gap-4 sm:grid-cols-2">
                            <Field label="Name" name="name" placeholder="Your name" autoComplete="name" />
                            <Field label="Email" name="email" type="email" placeholder="you@email.com" autoComplete="email" />
                        </div>

                        <div className="relative mt-4">
                            <Field label="Subject" name="subject" placeholder="How can I help?" />
                        </div>

                        <div className="relative mt-4">
                            <Field
                                label="Message"
                                name="message"
                                as="textarea"
                                rows={6}
                                placeholder="Tell me about your project…"
                            />
                        </div>

                        {/* honeypot */}
                        <input aria-hidden tabIndex={-1} autoComplete="off" className="hidden" name="_hp" />

                        <div className="relative mt-6 flex items-center gap-3">
                            <button
                                type="submit"
                                disabled={state === "loading"}
                                className="rounded-2xl border border-emerald-500/30 bg-emerald-600/20 px-5 py-2 font-semibold text-emerald-300 shadow-[0_2px_0_0_#022,0_4px_0_0_#011] transition hover:translate-y-[1px] hover:bg-emerald-600/30 disabled:opacity-60"
                            >
                                {state === "loading" ? "Sending…" : "Send message"}
                            </button>

                            <a
                                href={`mailto:${CONTACTS.email}`}
                                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2 font-semibold text-white/90 shadow-[0_2px_0_0_#000,0_4px_0_0_#111] transition hover:bg-white/10"
                            >
                                Email me directly
                            </a>
                        </div>

                        {/* toast */}
                        <AnimatePresence>
                            {(state === "success" || state === "error") && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    className={`pointer-events-none absolute bottom-4 right-4 rounded-xl border px-3 py-2 text-sm backdrop-blur ${
                                        state === "success"
                                            ? "border-emerald-400/30 bg-emerald-600/15 text-emerald-300"
                                            : "border-rose-400/30 bg-rose-600/15 text-rose-300"
                                    }`}
                                >
                                    {state === "success"
                                        ? "Message sent. I’ll get back to you soon!"
                                        : "Something went wrong — try again."}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

/* ============ inputs (pixel/CRT look) ============ */
function Field({
                   label,
                   name,
                   as,
                   rows,
                   type = "text",
                   placeholder,
                   autoComplete,
               }: {
    label: string;
    name: string;
    as?: "textarea";
    rows?: number;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
}) {
    const Tag: any = as === "textarea" ? "textarea" : "input";
    return (
        <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-neutral-300/80">
        {label}
      </span>
            <Tag
                name={name}
                rows={rows}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={name === "name" || name === "email" || name === "message"}
                className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-neutral-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.12),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            />
        </label>
    );
}

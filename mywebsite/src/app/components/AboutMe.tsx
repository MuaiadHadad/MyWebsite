"use client";

import { motion } from "framer-motion";

/* ============ Pixel Art Core ============ */
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

/* ============ Tiny Sprites (9×9 / 11×11) ============ */
// GitHub (octocat head, minimal)
const S_GITHUB: Sprite = [
    [0,0,0,"#111","#111",0,0,0,0],
    [0,0,"#111","#000","#000","#111",0,0,0],
    [0,"#111","#000","#111","#111","#000","#111",0,0],
    [0,"#000","#111","#000","#000","#111","#000",0,0],
    [0,"#000","#000","#000","#000","#000","#000",0,0],
    [0,"#000","#111","#000","#000","#111","#000",0,0],
    [0,0,"#111","#000","#000","#111",0,0,0],
    [0,0,0,"#111","#111",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Boxes (stacks/containers)
const S_BOXES: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#0ea5e9","#0ea5e9","#0ea5e9",0,0,"#22c55e","#22c55e","#22c55e"],
    [0,"#0284c7","#0284c7","#0284c7",0,0,"#16a34a","#16a34a","#16a34a"],
    [0,0,0,0,0,0,0,0,0],
    [0,"#f59e0b","#f59e0b","#f59e0b",0,0,"#f97316","#f97316","#f97316"],
    [0,"#b45309","#b45309","#b45309",0,0,"#ea580c","#ea580c","#ea580c"],
    [0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,0,"#22d3ee","#22d3ee","#22d3ee"],
    [0,0,0,0,0,0,0,0,0],
];

// Code </>
const S_CODE: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,"#22c55e",0,0,0,"#22c55e",0,0],
    [0,"#22c55e",0,0,0,0,0,"#22c55e",0],
    [0,0,"#22c55e",0,0,0,"#22c55e",0,0],
    [0,0,0,"#22c55e",0,"#22c55e",0,0,0],
    [0,0,"#22c55e",0,0,0,"#22c55e",0,0],
    [0,"#22c55e",0,0,0,0,0,"#22c55e",0],
    [0,0,"#22c55e",0,0,0,"#22c55e",0,0],
    [0,0,0,0,0,0,0,0,0],
];

// CPU (chip)
const S_CPU: Sprite = [
    [0,0,"#a3e635","#a3e635","#a3e635","#a3e635","#a3e635",0,0],
    [0,"#a3e635","#111","#111","#111","#111","#a3e635",0,0],
    [0,"#a3e635","#111","#0ea5e9","#0ea5e9","#111","#a3e635",0,0],
    [0,"#a3e635","#111","#0ea5e9","#67e8f9","#111","#a3e635",0,0],
    [0,"#a3e635","#111","#0ea5e9","#0ea5e9","#111","#a3e635",0,0],
    [0,"#a3e635","#111","#111","#111","#111","#a3e635",0,0],
    [0,0,"#a3e635","#a3e635","#a3e635","#a3e635","#a3e635",0,0],
    [0,0,0,"#a3e635","#a3e635","#a3e635",0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Sparkle (estrela)
const S_SPARK: Sprite = [
    [0,0,0,"#f5f5f5",0,0,0,0,0],
    [0,0,"#f5f5f5","#fde68a","#f5f5f5",0,0,0,0],
    [0,"#f5f5f5","#fde68a","#facc15","#fde68a","#f5f5f5",0,0,0],
    [0,0,"#f5f5f5","#fde68a","#f5f5f5",0,0,0,0],
    [0,0,0,"#f5f5f5",0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Rocket
const S_ROCKET: Sprite = [
    [0,0,0,"#94a3b8","#94a3b8",0,0,0,0],
    [0,0,"#94a3b8","#e5e7eb","#e5e7eb","#94a3b8",0,0,0],
    [0,"#0ea5e9","#94a3b8","#111","#111","#94a3b8","#0ea5e9",0,0],
    [0,0,"#94a3b8","#111","#111","#94a3b8",0,0,0],
    [0,0,0,"#ef4444","#ef4444",0,0,0,0],
    [0,0,0,"#f59e0b",0,0,0,0,0],
    [0,0,0,"#facc15",0,0,0,0,0],
    [0,0,0,"#fde68a",0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Workflow (setas/fluxo)
const S_FLOW: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#22c55e","#22c55e",0,0,0,0,0,0],
    [0,0,"#22c55e",0,0,0,"#22c55e","#22c55e",0],
    [0,0,0,0,0,"#22c55e",0,0,0],
    [0,0,0,0,0,0,"#22c55e",0,0],
    [0,0,0,"#22c55e","#22c55e","#22c55e",0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* ============ Component ============ */
export default function AboutMe() {
    return (
        <section id="about" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            {/* pixel grid + vignette */}
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />



            <div className="relative mx-auto max-w-6xl px-6 py-20">
                {/* title */}
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    About <span className="text-emerald-300">Muaiad</span>
                </motion.h2>

                {/* narrative */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-300"
                >
                    I’m a pragmatic full-stack developer who turns rough ideas into working software — fast.
                    My toolbox spans <strong>PHP/Laravel</strong>, <strong>Python</strong>, and modern front-ends (React/Vue).
                    I care about clean APIs, reliable DevOps, and tiny details that make UIs feel alive.
                    On GitHub I keep focused, opinionated builds where I try patterns quickly and keep the code tidy.
                </motion.p>

                {/* GitHub + repo highlights (pixel chips) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_4px_0_0_#111]"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="https://github.com/MuaiadHadad"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-neutral-900/60 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-neutral-900"
                        >
                            <PixelSprite data={S_GITHUB} pixel={4} />
                            github.com/MuaiadHadad
                        </a>
                        <span className="text-xs text-neutral-400">Selected highlights from my repos →</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Chip sprite={S_BOXES} text="Accommodation Manager — Laravel/Blade app for housing flows." />
                        <Chip sprite={S_FLOW}   text="Job-Listing-API — end-to-end demo (API + UI) with clean styles." />
                        <Chip sprite={S_CODE}   text="NewSwissAI — Vue-powered site prototype." />
                        <Chip sprite={S_CPU}    text="MineDefender — Python prototype with a security angle." />
                        <Chip sprite={S_SPARK}  text="BioVision — DeepVision site polish & UI." />
                        <Chip sprite={S_ROCKET} text="Surveillance System — Python pipeline experiments." />
                    </div>

                    <p className="mt-4 text-sm text-neutral-400">
                        I like layered services, readable components, tidy CSS, and pragmatic Python when performance matters.
                    </p>
                </motion.div>

                {/* values */}
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { sprite: S_CODE,  title: "Clean Code", text: "Small modules, clear names, ruthless deletion of dead weight." },
                        { sprite: S_FLOW,  title: "Solid DX",   text: "Dev environments that boot fast and CI that shouts early." },
                        { sprite: S_CPU,   title: "Data & AI",  text: "APIs and pipelines that make LLMs useful, not just flashy." },
                    ].map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ y: 10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * i, type: "spring", stiffness: 160, damping: 16 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_4px_0_0_#111]"
                        >
                            <div className="mb-2 flex items-center gap-2 text-neutral-300">
                                <PixelSprite data={c.sprite} pixel={4} />
                                <span className="text-sm font-semibold uppercase tracking-widest text-neutral-300/80">
                  {c.title}
                </span>
                            </div>
                            <p className="text-neutral-300/90">{c.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* tiny helper for animated chips */
function Chip({ sprite, text }: { sprite: Sprite; text: string }) {
    return (
        <motion.span
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-600/15 px-3 py-2 text-sm"
        >
            <PixelSprite data={sprite} pixel={4} />
            {text}
        </motion.span>
    );
}

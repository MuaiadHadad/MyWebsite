"use client";

import { motion } from "framer-motion";

/** ============ Pixel Art Utils ============ */
type Pixel = 0 | string;
type Sprite = Pixel[][];

function PixelSprite({
                         data,
                         pixel = 4,
                         className = "",
                         gap = 1,
                     }: {
    data: Sprite;
    pixel?: number;
    className?: string;
    gap?: number;
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

/** ============ Sprites (9x9 / 11x11) ============ */
// Graduation Cap (9x9)
const S_GRAD: Sprite = [
    [0,0,0,0,"#111827",0,0,0,0],
    [0,0,0,"#1f2937","#111827","#1f2937",0,0,0],
    [0,0,"#374151","#1f2937","#0ea5e9","#1f2937","#374151",0,0],
    [0,"#6b7280","#374151","#1f2937","#1f2937","#1f2937","#374151","#6b7280",0],
    [0,0,0,0,"#1f2937",0,0,0,0],
    [0,0,0,0,"#1f2937",0,0,0,0],
    [0,0,0,"#b45309","#f59e0b","#b45309",0,0,0],
    [0,0,0,0,"#b45309",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Calendar (9x9)
const S_CALENDAR: Sprite = [
    [0,0,"#e11d48","#e11d48","#e11d48","#e11d48","#e11d48",0,0],
    [0,"#111","#fff","#fff","#fff","#fff","#fff","#111",0],
    [0,"#111","#fff","#111","#fff","#111","#fff","#111",0],
    [0,"#111","#fff","#fff","#fff","#fff","#fff","#111",0],
    [0,"#111","#fff","#111","#fff","#111","#fff","#111",0],
    [0,"#111","#fff","#fff","#fff","#fff","#fff","#111",0],
    [0,"#111","#fff","#111","#fff","#111","#fff","#111",0],
    [0,"#111","#111","#111","#111","#111","#111","#111",0],
    [0,0,0,0,0,0,0,0,0],
];

// Map Pin (9x9)
const S_PIN: Sprite = [
    [0,0,0,"#0ea5e9","#0ea5e9",0,0,0,0],
    [0,0,"#0ea5e9","#67e8f9","#67e8f9","#0ea5e9",0,0,0],
    [0,"#0ea5e9","#67e8f9","#a5f3fc","#a5f3fc","#67e8f9","#0ea5e9",0,0],
    [0,"#0ea5e9","#67e8f9","#a5f3fc","#a5f3fc","#67e8f9","#0ea5e9",0,0],
    [0,0,"#0ea5e9","#67e8f9","#67e8f9","#0ea5e9",0,0,0],
    [0,0,0,"#0ea5e9","#0ea5e9",0,0,0,0],
    [0,0,0,"#0ea5e9","#0ea5e9",0,0,0,0],
    [0,0,0,"#0ea5e9",0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Award/Medal (11x11)
const S_AWARD: Sprite = [
    [0,0,0,0,"#eab308","#eab308",0,0,0,0,0],
    [0,0,0,"#eab308","#facc15","#facc15","#eab308",0,0,0,0],
    [0,0,"#eab308","#facc15","#fef08a","#facc15","#eab308",0,0,0,0],
    [0,0,"#eab308","#facc15","#facc15","#facc15","#eab308",0,0,0,0],
    [0,0,0,"#eab308","#f59e0b","#f59e0b","#eab308",0,0,0,0],
    [0,0,0,0,"#b45309","#b45309",0,0,0,0,0],
    [0,0,0,0,"#ef4444","#ef4444",0,0,0,0,0],
    [0,0,0,0,"#ef4444","#ef4444",0,0,0,0,0],
    [0,0,0,0,"#991b1b","#991b1b",0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

// Library/Books (11x11)
const S_LIBRARY: Sprite = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#0ea5e9","#0ea5e9",0,0,0,0,"#f59e0b","#f59e0b",0,0],
    [0,"#0284c7","#0284c7",0,0,0,0,"#b45309","#b45309",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#22c55e","#22c55e",0,0,0,0,"#ef4444","#ef4444",0,0],
    [0,"#16a34a","#16a34a",0,0,0,0,"#b91c1c","#b91c1c",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa",0,0,0,0,"#eab308","#eab308",0,0],
    [0,"#7c3aed","#7c3aed",0,0,0,0,"#ca8a04","#ca8a04",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

// Badge/Certificate (11x11)
const S_BADGE: Sprite = [
    [0,0,0,0,"#22c55e","#22c55e",0,0,0,0,0],
    [0,0,0,"#22c55e","#a7f3d0","#a7f3d0","#22c55e",0,0,0,0],
    [0,0,"#22c55e","#a7f3d0","#ecfeff","#a7f3d0","#22c55e",0,0,0,0],
    [0,0,"#22c55e","#a7f3d0","#a7f3d0","#a7f3d0","#22c55e",0,0,0,0],
    [0,0,0,"#22c55e","#10b981","#10b981","#22c55e",0,0,0,0],
    [0,0,0,0,"#064e3b","#064e3b",0,0,0,0,0],
    [0,0,0,0,"#10b981","#10b981",0,0,0,0,0],
    [0,0,0,0,"#10b981","#10b981",0,0,0,0,0],
    [0,0,0,0,"#064e3b","#064e3b",0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

/** ============ Data ============ */
const education = [
    {
        title: "B.Eng. in Computer Engineering",
        school: "Instituto Politécnico de Coimbra",
        location: "Coimbra, Portugal",
        period: "Sep 2020 — Jul 2024",
        meta: "EQF Level 6",
        highlights: [
            "Software Engineering, Algorithms & Data Structures",
            "Networks & Systems Administration",
            "Databases and Web Development",
        ],
    },
    {
        title: "High School (Technological Path)",
        school: "Etpsico",
        location: "Coimbra, Portugal",
        period: "Sep 2018 — Jun 2020",
        meta: "EQF Level 5",
        highlights: ["Intro to Programming", "IT Fundamentals", "Applied Projects"],
    },
];

const trainings = [
    { provider: "OpenEDG", name: "English for IT I & II", sprite: S_BADGE },
    { provider: "Python Institute", name: "Python Essentials I", sprite: S_AWARD },
    { provider: "Cisco", name: "PCAP — Programming Essentials in Python", sprite: S_BADGE },
    { provider: "Cisco", name: "CCNAv7: Introduction to Networks", sprite: S_LIBRARY },
    { provider: "Cisco", name: "CCNAv7: Switching, Routing & Wireless Essentials", sprite: S_LIBRARY },
    { provider: "Cisco", name: "NDG Linux Essentials", sprite: S_BADGE },
    { provider: "Cisco", name: "JavaScript Essentials I", sprite: S_BADGE },
];

/** ============ Small UI ============ */
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-200">
      {children}
    </span>
    );
}

/** ============ Component ============ */
export default function EducationTraining() {
    return (
        <section id="education" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            {/* background */}
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative mx-auto max-w-6xl px-6 py-20">
                {/* heading */}
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl">
                    Education <span className="text-emerald-300">& Training</span>
                </motion.h2>

                {/* Education timeline */}
                <div className="relative mt-12">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-400/10 to-transparent md:left-1/2" />
                    <ol className="space-y-10">
                        {education.map((ed, i) => {
                            const left = i % 2 === 0;
                            return (
                                <motion.li
                                    key={ed.title}
                                    initial={{ y: 18, opacity: 0, scale: 0.98 }}
                                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ type: "spring", stiffness: 160, damping: 16 }}
                                    className={`relative grid items-stretch gap-4 md:grid-cols-2 ${left ? "" : "md:[&>*:first-child]:order-2"}`}
                                >
                                    {/* marker */}
                                    <span className="absolute left-3 top-3 z-10 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] md:left-1/2 md:-translate-x-1/2" />

                                    {/* card */}
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-2 text-neutral-200">
                                                <PixelSprite data={S_GRAD} pixel={3} />
                                                <span className="font-semibold">{ed.title}</span>
                                                <span className="opacity-60">— {ed.school}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <PixelSprite data={S_CALENDAR} pixel={3} />
                            {ed.period}
                        </span>
                                                <span className="inline-flex items-center gap-1">
                          <PixelSprite data={S_PIN} pixel={3} />
                                                    {ed.location}
                        </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-emerald-300/80">{ed.meta}</div>
                                        <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-300/90">
                                            {ed.highlights.map((h) => (
                                                <li key={h}>{h}</li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* accent sprite */}
                                    <div className="hidden md:flex md:items-center md:justify-center">
                                        {i % 2 === 0 ? (
                                            <PixelSprite data={S_GRAD} pixel={5} className="opacity-80" />
                                        ) : (
                                            <PixelSprite data={S_LIBRARY} pixel={5} className="opacity-80" />
                                        )}
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>

                {/* Training badges */}
                <div className="mt-12">
                    <motion.h3
                        initial={{ y: 12, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16 }}
                        className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-neutral-300/80"
                    >
                        <PixelSprite data={S_AWARD} pixel={3} /> Certifications & Courses
                    </motion.h3>

                    <div className="flex flex-wrap gap-2">
                        {trainings.map((t, i) => (
                            <motion.span
                                key={`${t.provider}-${t.name}`}
                                initial={{ scale: 0.95, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.03 * i, type: "spring", stiffness: 240, damping: 16 }}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-200"
                            >
                                <PixelSprite data={t.sprite} pixel={3} /> {t.name}{" "}
                                <span className="opacity-60">— {t.provider}</span>
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

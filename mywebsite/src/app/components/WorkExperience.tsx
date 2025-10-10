"use client";

import { motion } from "framer-motion";

/** ---------- Pixel Art Utils ---------- */
type Pixel = 0 | string;
type Sprite = Pixel[][];

function PixelSprite({
                         data,
                         pixel = 4, // tamanho do “pixel” em px
                         className = "",
                     }: {
    data: Sprite;
    pixel?: number;
    className?: string;
}) {
    // largura total = colunas * pixel
    const cols = data[0]?.length ?? 0;
    return (
        <div
            className={`grid ${className}`}
            style={{
                gridTemplateColumns: `repeat(${cols}, ${pixel}px)`,
                gap: 1,
            }}
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

/** ---------- Tiny UI Sprites (header - 9x9) ---------- */
// briefcase (maleta)
const S_BRIEFCASE: Sprite = [
    [0,0,"#000", "#000", "#000", "#000", "#000",0,0],
    [0,0,0,    "#7c5a3a","#7c5a3a","#7c5a3a",0,   0,0],
    [0,"#3b2a1a","#c28d5a","#c28d5a","#c28d5a","#c28d5a","#3b2a1a",0,0],
    ["#3b2a1a","#c28d5a","#e6b685","#e6b685","#e6b685","#e6b685","#c28d5a","#3b2a1a",0],
    ["#3b2a1a","#e6b685","#e6b685","#e6b685","#e6b685","#e6b685","#e6b685","#3b2a1a",0],
    ["#3b2a1a","#e6b685","#e6b685","#333","#333","#e6b685","#e6b685","#3b2a1a",0],
    [0,"#3b2a1a","#c28d5a","#c28d5a","#c28d5a","#c28d5a","#3b2a1a",0,0],
    [0,0,"#2b2015","#2b2015","#2b2015","#2b2015","#2b2015",0,0],
    [0,0,0,0,0,0,0,0,0],
];

// calendar
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

// map pin
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

/** ---------- Accent Sprites (lado oposto - 11x11) ---------- */
// code (</>)
const S_CODE: Sprite = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,"#22c55e",0,0,0,"#22c55e",0,0,0],
    [0,0,"#22c55e",0,0,0,0,0,"#22c55e",0,0],
    [0,"#22c55e",0,0,0,0,0,0,0,"#22c55e",0],
    [0,0,"#22c55e",0,0,0,0,0,"#22c55e",0,0],
    [0,0,0,"#22c55e",0,0,0,"#22c55e",0,0,0],
    [0,0,"#22c55e",0,0,0,0,0,"#22c55e",0,0],
    [0,"#22c55e",0,0,0,0,0,0,0,"#22c55e",0],
    [0,0,"#22c55e",0,0,0,0,0,"#22c55e",0,0],
    [0,0,0,"#22c55e",0,0,0,"#22c55e",0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

// cpu (chip)
const S_CPU: Sprite = [
    [0,0,0,"#a3e635","#a3e635","#a3e635","#a3e635",0,0,0,0],
    [0,0,0,"#a3e635","#111","#111","#a3e635",0,0,0,0],
    [0,0,0,"#a3e635","#111","#111","#a3e635",0,0,0,0],
    ["#a3e635","#a3e635","#a3e635","#a3e635","#111","#a3e635","#a3e635","#a3e635","#a3e635",0,0],
    ["#a3e635","#111","#111","#111","#111","#111","#111","#111","#a3e635",0,0],
    ["#a3e635","#111","#111","#0ea5e9","#0ea5e9","#0ea5e9","#111","#111","#a3e635",0,0],
    ["#a3e635","#111","#111","#0ea5e9","#67e8f9","#0ea5e9","#111","#111","#a3e635",0,0],
    ["#a3e635","#a3e635","#a3e635","#a3e635","#111","#a3e635","#a3e635","#a3e635","#a3e635",0,0],
    [0,0,0,"#a3e635","#111","#111","#a3e635",0,0,0,0],
    [0,0,0,"#a3e635","#a3e635","#a3e635","#a3e635",0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

// boxes (stack/containers)
const S_BOXES: Sprite = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#0ea5e9","#0ea5e9","#0ea5e9",0,0,"#22c55e","#22c55e","#22c55e",0,0],
    [0,"#0284c7","#0284c7","#0284c7",0,0,"#16a34a","#16a34a","#16a34a",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#f59e0b","#f59e0b","#f59e0b",0,0,"#f97316","#f97316","#f97316",0,0],
    [0,"#b45309","#b45309","#b45309",0,0,"#ea580c","#ea580c","#ea580c",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,0,"#22d3ee","#22d3ee","#22d3ee",0,0],
    [0,"#7c3aed","#7c3aed","#7c3aed",0,0,"#0891b2","#0891b2","#0891b2",0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
];

/** ---------- DATA ---------- */
const jobs = [
    {
        role: "AI Software Engineer",
        company: "Med Robots",
        location: "Coimbra, PT",
        period: "Mar 2025 — Present",
        summary:
            "I design and ship LLM-powered features and computer-vision pipelines, glueing services with clean APIs and reliable DevOps.",
        bullets: [
            "LLM integrations (prompting, tools, retrieval) with OpenAI",
            "Python services (FastAPI), containerized with Docker",
            "Vision & generative model experiments wired into web backends",
        ],
        stack: ["Python", "FastAPI", "Docker", "OpenAI", "REST"],
    },
    {
        role: "Backend Developer Intern",
        company: "CHECK24 Vergleichsportal GmbH",
        location: "Munich, DE",
        period: "Sep 2024 — Feb 2025",
        summary:
            "Built secure REST endpoints and internal tooling. Helped standardize validation and auth flows while keeping things fast.",
        bullets: [
            "Laravel REST APIs and data validation",
            "MySQL tuning and query hygiene",
            "Containerized dev env + Git workflows",
        ],
        stack: ["PHP", "Laravel", "MySQL", "Docker", "Git"],
    },
    {
        role: "Intern",
        company: "Webmania",
        location: "Coimbra, PT",
        period: "Apr 2020 — Jun 2020",
        summary:
            "Full-stack support for small-business websites and admin panels.",
        bullets: ["PHP/Laravel, JavaScript, HTML/CSS", "MySQL", "Linux server basics"],
        stack: ["PHP", "Laravel", "JS", "CSS/HTML", "MySQL", "Linux"],
    },
    {
        role: "Intern",
        company: "Webmania",
        location: "Coimbra, PT",
        period: "May 2019 — Jun 2019",
        summary: "Web/desktop app maintenance and small feature work.",
        bullets: ["Java & PHP tasks", "JS/HTML/CSS", "SQL"],
        stack: ["Java", "PHP", "JS", "HTML/CSS", "SQL"],
    },
];

/** ---------- Tag ---------- */
function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-200">
      {children}
    </span>
    );
}

/** ---------- Header/Body using tiny sprites ---------- */
function Header({ job }: { job: typeof jobs[number] }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-neutral-200">
                <PixelSprite data={S_BRIEFCASE} pixel={3} />
                <span className="font-semibold">{job.role}</span>
                <span className="opacity-60">— {job.company}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1">
          <PixelSprite data={S_CALENDAR} pixel={3} />
            {job.period}
        </span>
                <span className="inline-flex items-center gap-1">
          <PixelSprite data={S_PIN} pixel={3} />
                    {job.location}
        </span>
            </div>
        </div>
    );
}

function Body({ job }: { job: typeof jobs[number] }) {
    return (
        <>
            <p className="mt-3 text-neutral-300">{job.summary}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-neutral-300/90">
                {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                ))}
            </div>
        </>
    );
}

/** ---------- Accent icon chooser ---------- */
function Accent({ i }: { i: number }) {
    const sprite = i % 3 === 0 ? S_CODE : i % 3 === 1 ? S_CPU : S_BOXES;
    return <PixelSprite data={sprite} pixel={5} className="opacity-80" />;
}

/** ---------- Alternating timeline (default) ---------- */
export default function WorkExperience() {
    return (
        <section id="experience" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
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
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    Work <span className="text-emerald-300">Experience</span>
                </motion.h2>

                {/* timeline */}
                <div className="mt-12 relative">
                    {/* vertical line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-400/10 to-transparent md:left-1/2" />

                    <ol className="space-y-10">
                        {jobs.map((job, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <motion.li
                                    key={`${job.company}-${job.period}`}
                                    initial={{ y: 18, opacity: 0, scale: 0.98 }}
                                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ type: "spring", stiffness: 160, damping: 16 }}
                                    className={`relative grid items-stretch gap-4 md:grid-cols-2 ${isLeft ? "" : "md:[&>*:first-child]:order-2"}`}
                                >
                                    {/* marker */}
                                    <span className={`absolute ${isLeft ? "left-3 md:left-1/2 md:-translate-x-1/2" : "left-3 md:left-1/2 md:-translate-x-1/2"} top-3 z-10 grid h-3 w-3 place-items-center rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]`} />

                                    {/* card */}
                                    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur">
                                        <Header job={job} />
                                        <Body job={job} />
                                    </motion.div>

                                    {/* accent pixel art (alternating side) */}
                                    <div className="hidden md:flex md:items-center md:justify-center">
                                        <Accent i={i} />
                                    </div>
                                </motion.li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </section>
    );
}

/** ---------- Two-up (um à esquerda, outro à direita) ---------- */
export function WorkExperienceTwoUp() {
    const two = jobs.slice(0, 2);
    return (
        <section id="experience-two" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative mx-auto max-w-6xl px-6 py-20">
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    Work <span className="text-emerald-300">Experience</span>
                </motion.h2>

                <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ type: "spring", stiffness: 160, damping: 16 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur"
                    >
                        <Header job={two[0]} />
                        <Body job={two[0]} />
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ type: "spring", stiffness: 160, damping: 16 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur"
                    >
                        <Header job={two[1]} />
                        <Body job={two[1]} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/** ---------- Right-only ---------- */
export function WorkExperienceRight() {
    return (
        <section id="experience-right" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative mx-auto max-w-6xl px-6 py-20">
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    Work <span className="text-emerald-300">Experience</span>
                </motion.h2>

                <div className="mt-12 relative">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-400/10 to-transparent md:left-1/2" />

                    <ol className="space-y-10">
                        {jobs.map((job, i) => (
                            <motion.li
                                key={`${job.company}-${job.period}`}
                                initial={{ y: 18, opacity: 0, scale: 0.98 }}
                                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ type: "spring", stiffness: 160, damping: 16 }}
                                className="relative grid items-stretch gap-4 md:grid-cols-2 md:[&>*:first-child]:order-2"
                            >
                                <span className="absolute left-3 top-3 z-10 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] md:left-1/2 md:-translate-x-1/2" />
                                <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur">
                                    <Header job={job} />
                                    <Body job={job} />
                                </motion.div>
                                <div className="hidden md:flex md:items-center md:justify-center">
                                    <Accent i={i} />
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

/** ---------- Left-only ---------- */
export function WorkExperienceLeft() {
    return (
        <section id="experience-left" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative mx-auto max-w-6xl px-6 py-20">
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="text-balance text-4xl font-black tracking-tight md:text-5xl"
                >
                    Work <span className="text-emerald-300">Experience</span>
                </motion.h2>

                <div className="mt-12 relative">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-400/10 to-transparent md:left-1/2" />
                    <ol className="space-y-10">
                        {jobs.map((job, i) => (
                            <motion.li
                                key={`${job.company}-${job.period}`}
                                initial={{ y: 18, opacity: 0, scale: 0.98 }}
                                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ type: "spring", stiffness: 160, damping: 16 }}
                                className="relative grid items-stretch gap-4 md:grid-cols-2"
                            >
                                <span className="absolute left-3 top-3 z-10 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] md:left-1/2 md:-translate-x-1/2" />
                                <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur">
                                    <Header job={job} />
                                    <Body job={job} />
                                </motion.div>
                                <div className="hidden md:flex md:items-center md:justify-center">
                                    <Accent i={i} />
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

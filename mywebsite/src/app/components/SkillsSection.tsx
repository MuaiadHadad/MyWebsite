"use client";

import { motion } from "framer-motion";

/* ================= Pixel Art Core ================= */
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

/* ================= Tiny Category Sprites (9×9 / 11×11) ================= */
/* Code </> */
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

/* Globe */
const S_GLOBE: Sprite = [
    [0,0,0,"#0ea5e9","#0ea5e9","#0ea5e9",0,0,0],
    [0,0,"#0ea5e9","#67e8f9","#67e8f9","#67e8f9","#0ea5e9",0,0],
    [0,"#0ea5e9","#67e8f9","#a5f3fc","#0ea5e9","#a5f3fc","#67e8f9","#0ea5e9",0],
    [0,"#0ea5e9","#0ea5e9","#67e8f9","#0ea5e9","#67e8f9","#0ea5e9","#0ea5e9",0],
    [0,"#0ea5e9","#67e8f9","#0ea5e9","#0ea5e9","#0ea5e9","#67e8f9","#0ea5e9",0],
    [0,"#0ea5e9","#0ea5e9","#67e8f9","#0ea5e9","#67e8f9","#0ea5e9","#0ea5e9",0],
    [0,"#0ea5e9","#67e8f9","#a5f3fc","#0ea5e9","#a5f3fc","#67e8f9","#0ea5e9",0],
    [0,0,"#0ea5e9","#67e8f9","#67e8f9","#67e8f9","#0ea5e9",0,0],
    [0,0,0,"#0ea5e9","#0ea5e9","#0ea5e9",0,0,0],
];

/* Box / Frameworks */
const S_BOX: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#7c3aed","#7c3aed","#7c3aed",0,0,"#22d3ee","#22d3ee","#22d3ee"],
    [0,"#6d28d9","#6d28d9","#6d28d9",0,0,"#0891b2","#0891b2","#0891b2"],
    [0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,0,"#06b6d4","#06b6d4","#06b6d4"],
    [0,"#8b5cf6","#8b5cf6","#8b5cf6",0,0,"#0ea5e9","#0ea5e9","#0ea5e9"],
    [0,0,0,0,0,0,0,0,0],
    [0,"#c4b5fd","#c4b5fd","#c4b5fd",0,0,"#22d3ee","#22d3ee","#22d3ee"],
    [0,0,0,0,0,0,0,0,0],
];

/* Database */
const S_DB: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b",0,0],
    [0,"#b45309","#b45309","#b45309","#b45309","#b45309","#b45309",0,0],
    [0,"#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b",0,0],
    [0,"#b45309","#b45309","#b45309","#b45309","#b45309","#b45309",0,0],
    [0,"#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b","#f59e0b",0,0],
    [0,"#b45309","#b45309","#b45309","#b45309","#b45309","#b45309",0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* Terminal / Linux */
const S_TERM: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#111","#111","#111","#111","#111","#111","#111",0],
    [0,"#111","#22c55e","#111","#111","#111","#eab308","#111",0],
    [0,"#111","#111","#111","#111","#111","#111","#111",0],
    [0,"#111","#a3e635","#a3e635","#a3e635",0,"#84cc16","#111",0],
    [0,"#111",0,0,0,0,"#111","#111",0],
    [0,"#111","#111","#111","#111","#111","#111","#111",0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* Git / VCS */
const S_GIT: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#ef4444",0,0,0,0,0,0,0],
    [0,0,"#ef4444",0,0,0,0,0,0],
    [0,0,0,"#ef4444",0,0,0,0,0],
    [0,0,0,0,"#ef4444",0,0,0,0],
    [0,0,0,0,0,"#ef4444",0,0,0],
    [0,0,0,0,0,0,"#ef4444",0,0],
    [0,0,0,0,0,0,0,"#ef4444",0],
    [0,0,0,0,0,0,0,0,"#ef4444"],
];

/* Network */
const S_NET: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#22c55e",0,0,"#22c55e",0,0,"#22c55e",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#22c55e",0,0,"#22c55e",0,0,"#22c55e",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#22c55e",0,0,"#22c55e",0,0,"#22c55e",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#84cc16","#22c55e","#84cc16","#22c55e","#84cc16","#22c55e","#84cc16",0],
    [0,0,0,0,0,0,0,0,0],
];

/* Brain / AI */
const S_BRAIN: Sprite = [
    [0,0,0,"#f472b6","#f472b6","#f472b6",0,0,0],
    [0,0,"#f472b6","#f9a8d4","#fbcfe8","#f9a8d4","#f472b6",0,0],
    [0,"#f472b6","#f9a8d4","#f472b6","#f472b6","#f9a8d4","#f472b6","#f472b6",0],
    [0,"#f472b6","#f9a8d4","#f472b6","#f472b6","#f9a8d4","#f472b6","#f472b6",0],
    [0,"#a78bfa","#a78bfa","#a78bfa","#a78bfa","#a78bfa","#a78bfa","#a78bfa",0],
    [0,"#7c3aed","#7c3aed","#7c3aed","#7c3aed","#7c3aed","#7c3aed","#7c3aed",0],
    [0,0,"#7c3aed","#a78bfa","#a78bfa","#a78bfa","#7c3aed",0,0],
    [0,0,0,"#7c3aed","#7c3aed","#7c3aed",0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* Languages / speech bubble */
const S_LANG: Sprite = [
    [0,0,0,0,"#10b981","#10b981",0,0,0],
    [0,0,0,"#10b981","#a7f3d0","#a7f3d0","#10b981",0,0],
    [0,0,"#10b981","#a7f3d0","#ecfeff","#a7f3d0","#10b981",0,0],
    [0,0,"#10b981","#a7f3d0","#a7f3d0","#a7f3d0","#10b981",0,0],
    [0,0,0,"#10b981","#10b981","#10b981","#10b981",0,0],
    [0,0,0,0,"#10b981","#10b981",0,0,0],
    [0,0,0,0,"#10b981",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* Map section titles → sprites */
const SPRITE_MAP: Record<string, Sprite> = {
    "Programming Languages": S_CODE,
    "Web & Frontend": S_GLOBE,
    "Frameworks": S_BOX,
    "Databases & Design": S_DB,
    "Linux & DevOps": S_TERM,
    "Version Control & Tools": S_GIT,
    "Networking": S_NET,
    "AI & LLMs": S_BRAIN,
    "Spoken Languages": S_LANG,
};

/* ================= Data (no icon fields now) ================= */
const SECTIONS = [
    {
        title: "Programming Languages",
        items: ["C", "C++", "C#", "Java", "Kotlin", "PHP", "Python", "JavaScript", "SQL", "MS SQL Server"],
    },
    {
        title: "Web & Frontend",
        items: ["HTML5", "CSS3", "SCSS", "RWD", "XML", "Beginner JavaScript for Web Development", "PHP (Laravel)"],
    },
    {
        title: "Frameworks",
        items: ["Django", "Django REST Framework (DRF)", "Flask", "Laravel"],
    },
    {
        title: "Databases & Design",
        items: ["Database Design & Programming", "SQL", "MS SQL Server"],
    },
    {
        title: "Linux & DevOps",
        items: [
            "Linux (main OS)",
            "Linux Basics",
            "Linux (Server)",
            "Linux (Command line, Bash/Shell)",
            "Linux (user level & OS knowledge)",
            "QNX Basics",
        ],
    },
    {
        title: "Version Control & Tools",
        items: ["Git", "GitHub", "SVN", "Microsoft Office"],
    },
    {
        title: "Networking",
        items: [
            "Network Maintenance & Troubleshooting",
            "Networking concepts (NAT, DNS, DHCP, Firewall rules)",
            "Network services & protocols (DHCP, DNS, HTTP, TCP, UDP, IMAP3)",
            "Cisco Packet Tracer",
            "Cisco Networking IT Essentials",
            "Cisco CCNA1 (in progress)",
            "Completed IT Essentials (Cisco Networking Academy)",
        ],
    },
    {
        title: "AI & LLMs",
        items: ["OpenAI", "LLM"],
    },
    {
        title: "Spoken Languages",
        items: ["Arabic", "Portuguese", "Understand spoken English"],
    },
] as const;

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <motion.span
            initial={{ y: 6, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-100 shadow-[0_2px_0_0_#000,0_4px_0_0_#111]"
        >
            {children}
        </motion.span>
    );
}

export default function SkillsSection() {
    return (
        <section id="skills" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            {/* pixel background */}
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
                    Skills
                </motion.h2>

                {/* cards grid */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SECTIONS.map((sec, idx) => (
                        <motion.div
                            key={sec.title}
                            initial={{ y: 14, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.03 * idx, type: "spring", stiffness: 160, damping: 18 }}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111]"
                        >
                            {/* animated sheen */}
                            <motion.span
                                aria-hidden
                                initial={{ x: "-120%" }}
                                whileInView={{ x: "120%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
                                className="pointer-events-none absolute -top-1/2 left-0 h-[200%] w-1/3 rotate-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent"
                            />

                            <div className="mb-3 flex items-center gap-2">
                                <PixelSprite data={SPRITE_MAP[sec.title]} pixel={4} />
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300/80">{sec.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {sec.items.map((item) => (
                                    <Tag key={item}>{item}</Tag>
                                ))}
                            </div>

                            {/* hover glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-400/0 transition group-hover:ring-emerald-400/30" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

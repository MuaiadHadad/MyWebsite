"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Press_Start_2P } from "next/font/google";
import PixelHoverCanvas from "./PixelHoverCanvas";
// Pixel font (Google Fonts)
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400" });

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

/* ================= Palettes per skill ================= */
const PALETTES: Record<string, { glow: string; border: string; bg: string }> = {
    php: { glow: "#b197fc", border: "#4b5bab", bg: "#1e1b4b" },
    fullstack: { glow: "#a78bfa", border: "#6d28d9", bg: "#1f1536" },
    backend: { glow: "#34d399", border: "#065f46", bg: "#0b1f1a" },
    frontend: { glow: "#10b981", border: "#065f46", bg: "#0a1c17" },
    python: { glow: "#facc15", border: "#1d4ed8", bg: "#161a2e" },
    ai: { glow: "#22d3ee", border: "#0e7490", bg: "#0a1a1f" },
    react: { glow: "#61dafb", border: "#0ea5e9", bg: "#0a1720" },
    angular: { glow: "#ffffff", border: "#dd0031", bg: "#24060c" },
    docker: { glow: "#0db7ed", border: "#0369a1", bg: "#071520" },
    aws: { glow: "#f59e0b", border: "#92400e", bg: "#1f1405" },
};

/* ================= Pixel Sprites por skill (9×9 / 11×11) ================= */
// Cada sprite é simples e distinto para ser reconhecível.

// PHP (elefante minimal / curva)
const SPR_PHP: Sprite = [
    [0,0,0,"#4b5bab","#4b5bab","#4b5bab",0,0,0],
    [0,0,"#4b5bab","#b197fc","#b197fc","#b197fc","#4b5bab",0,0],
    [0,"#4b5bab","#b197fc","#4b5bab","#4b5bab","#b197fc","#b197fc","#4b5bab",0],
    [0,"#4b5bab","#b197fc","#b197fc","#b197fc","#b197fc","#b197fc","#4b5bab",0],
    [0,0,"#4b5bab","#b197fc","#4b5bab","#b197fc","#4b5bab",0,0],
    [0,0,0,"#4b5bab","#b197fc","#4b5bab",0,0,0],
    [0,0,0,0,"#4b5bab",0,0,0,0],
    [0,0,0,0,"#b197fc",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Full-stack (camadas)
const SPR_FULL: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,"#34d399","#34d399","#34d399",0],
    [0,"#6d28d9","#6d28d9","#6d28d9",0,"#065f46","#065f46","#065f46",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,"#34d399","#34d399","#34d399",0],
    [0,"#6d28d9","#6d28d9","#6d28d9",0,"#065f46","#065f46","#065f46",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#a78bfa","#a78bfa","#a78bfa",0,"#34d399","#34d399","#34d399",0],
    [0,0,0,0,0,0,0,0,0],
];

// Backend (engrenagem minimal)
const SPR_BACK: Sprite = [
    [0,0,0,"#065f46",0,"#065f46",0,0,0],
    [0,0,"#065f46","#34d399","#34d399","#34d399","#065f46",0,0],
    [0,"#065f46","#34d399","#065f46","#065f46","#34d399","#065f46",0,0],
    ["#065f46","#34d399","#065f46","#34d399","#34d399","#065f46","#34d399","#065f46",0],
    [0,"#065f46","#34d399","#34d399","#34d399","#34d399","#065f46",0,0],
    [0,0,"#065f46","#34d399","#34d399","#34d399","#065f46",0,0],
    [0,0,0,"#065f46",0,"#065f46",0,0,0],
    [0,0,0,0,"#065f46",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Frontend (</> minimal)
const SPR_FRONT: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#10b981",0,0,0,0,0,"#10b981",0],
    [0,0,"#10b981",0,0,0,"#10b981",0,0],
    [0,0,0,"#10b981",0,"#10b981",0,0,0],
    [0,0,0,0,"#10b981",0,0,0,0],
    [0,0,0,"#10b981",0,"#10b981",0,0,0],
    [0,0,"#10b981",0,0,0,"#10b981",0,0],
    [0,"#10b981",0,0,0,0,0,"#10b981",0],
    [0,0,0,0,0,0,0,0,0],
];

// Python (duas metades azul/amarelo)
const SPR_PY: Sprite = [
    [0,0,"#1d4ed8","#1d4ed8","#1d4ed8","#facc15","#facc15",0,0],
    [0,"#1d4ed8","#93c5fd","#1d4ed8","#1d4ed8","#fde047","#facc15","#f59e0b",0],
    [0,"#1d4ed8","#93c5fd","#93c5fd","#1d4ed8","#fde047","#fde047","#f59e0b",0],
    [0,"#1d4ed8","#1d4ed8","#1d4ed8","#1d4ed8","#facc15","#facc15","#f59e0b",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#facc15","#fde047","#fde047","#facc15","#1d4ed8","#93c5fd","#1d4ed8",0],
    [0,"#facc15","#facc15","#fde047","#facc15","#1d4ed8","#1d4ed8","#1d4ed8",0],
    [0,0,"#f59e0b","#facc15","#facc15","#1d4ed8","#1d4ed8",0,0],
    [0,0,0,0,0,0,0,0,0],
];

// AI (chip/neurónio)
const SPR_AI: Sprite = [
    [0,0,"#22d3ee","#22d3ee","#22d3ee","#22d3ee","#22d3ee",0,0],
    [0,"#22d3ee","#0e7490","#0e7490","#0e7490","#0e7490","#22d3ee",0,0],
    [0,"#22d3ee","#0e7490","#22d3ee","#22d3ee","#0e7490","#22d3ee",0,0],
    [0,"#22d3ee","#0e7490","#22d3ee","#67e8f9","#0e7490","#22d3ee",0,0],
    [0,"#22d3ee","#0e7490","#22d3ee","#22d3ee","#0e7490","#22d3ee",0,0],
    [0,"#22d3ee","#0e7490","#0e7490","#0e7490","#0e7490","#22d3ee",0,0],
    [0,0,"#22d3ee","#22d3ee","#22d3ee","#22d3ee","#22d3ee",0,0],
    [0,0,0,"#22d3ee","#22d3ee","#22d3ee",0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// React (átomo)
const SPR_REACT: Sprite = [
    [0,0,0,"#61dafb",0,"#61dafb",0,0,0],
    [0,0,"#61dafb",0,"#61dafb",0,"#61dafb",0,0],
    [0,"#61dafb",0,"#61dafb","#61dafb","#61dafb",0,"#61dafb",0],
    [0,0,"#61dafb",0,"#61dafb",0,"#61dafb",0,0],
    [0,0,0,"#61dafb","#61dafb","#61dafb",0,0,0],
    [0,0,"#61dafb",0,"#61dafb",0,"#61dafb",0,0],
    [0,"#61dafb",0,"#61dafb","#61dafb","#61dafb",0,"#61dafb",0],
    [0,0,"#61dafb",0,"#61dafb",0,"#61dafb",0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Angular (A)
const SPR_ANG: Sprite = [
    [0,0,0,"#dd0031","#dd0031",0,0,0,0],
    [0,0,"#dd0031","#ffffff","#ffffff","#dd0031",0,0,0],
    [0,"#dd0031","#ffffff","#dd0031","#dd0031","#ffffff","#dd0031",0,0],
    [0,"#dd0031","#ffffff","#ffffff","#ffffff","#ffffff","#dd0031",0,0],
    [0,0,"#dd0031","#ffffff","#dd0031","#ffffff","#dd0031",0,0],
    [0,0,0,"#dd0031","#ffffff","#dd0031",0,0,0],
    [0,0,0,0,"#dd0031",0,0,0,0],
    [0,0,0,0,"#ffffff",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// Docker (contentores/onda)
const SPR_DOCKER: Sprite = [
    [0,0,0,0,0,0,0,0,0],
    [0,"#0db7ed","#0db7ed","#0db7ed",0,"#0ea5e9","#0ea5e9","#0ea5e9",0],
    [0,"#0369a1","#0369a1","#0369a1",0,"#0284c7","#0284c7","#0284c7",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#0db7ed","#0db7ed","#0db7ed","#0db7ed","#0db7ed","#0db7ed","#0db7ed",0],
    [0,"#0369a1",0,0,0,0,0,"#0369a1",0],
    [0,0,0,0,0,0,0,0,0],
    [0,"#0db7ed","#0db7ed","#0db7ed",0,0,"#0db7ed","#0db7ed","#0db7ed"],
    [0,0,0,0,0,0,0,0,0],
];

// AWS (coroa/remo swirl)
const SPR_AWS: Sprite = [
    [0,0,0,"#f59e0b",0,"#f59e0b",0,0,0],
    [0,0,"#f59e0b","#fbbf24","#f59e0b","#fbbf24","#f59e0b",0,0],
    [0,"#f59e0b","#92400e","#f59e0b","#f59e0b","#92400e","#f59e0b","#f59e0b",0],
    [0,0,"#fbbf24","#f59e0b","#fbbf24","#f59e0b","#fbbf24",0,0],
    [0,0,0,"#92400e","#f59e0b","#92400e",0,0,0],
    [0,0,0,0,"#f59e0b",0,0,0,0],
    [0,0,0,0,"#fbbf24",0,0,0,0],
    [0,0,0,0,"#f59e0b",0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

/* Map skill → sprite */
const SPRITES: Record<string, Sprite> = {
    php: SPR_PHP,
    fullstack: SPR_FULL,
    backend: SPR_BACK,
    frontend: SPR_FRONT,
    python: SPR_PY,
    ai: SPR_AI,
    react: SPR_REACT,
    angular: SPR_ANG,
    docker: SPR_DOCKER,
    aws: SPR_AWS,
};

/* ================= Data ================= */
const skills = [
    { key: "php", label: "PHP Developer" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "backend", label: "Backend" },
    { key: "frontend", label: "Frontend" },
    { key: "python", label: "Python" },
    { key: "ai", label: "AI Dev (LLM, OpenAI)" },
    { key: "react", label: "React" },
    { key: "angular", label: "Angular" },
    { key: "docker", label: "Docker" },
    { key: "aws", label: "AWS Services" },
];

/* ================= Pixel Card ================= */
function PixelCard({ text, palette }: { text: string; palette: { glow: string; border: string; bg: string } }) {
    return (
        <div
            className="relative rounded-2xl p-4 sm:p-6 shadow-2xl border"
            style={{
                borderColor: palette.border + "80",
                background: `linear-gradient(180deg, ${palette.bg} 0%, rgba(0,0,0,0.6) 100%)`,
                boxShadow: `0 0 0 1px ${palette.border}33 inset, 0 8px 0 0 #0008, 0 0 24px ${palette.glow}55`,
            }}
        >
            <div className="pixel-bg pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative grid place-items-center">
                <div className={`${pressStart.className} pixel-text text-center text-2xl sm:text-4xl uppercase tracking-widest select-none`}>
                    {text}
                </div>
            </div>
            <style jsx>{`
        .pixel-text {
          text-shadow:
            0 1px 0 #000,
            -1px 0 0 #000,
            1px 0 0 #000,
            0 -1px 0 #000,
            2px 2px 0 rgba(0,0,0,0.6),
            0 0 10px ${palette.glow},
            0 0 20px ${palette.glow};
          image-rendering: pixelated;
        }
        .pixel-bg {
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 8px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 8px);
        }
      `}</style>
        </div>
    );
}

/* ================= Component ================= */
export default function MainPixelHero() {
    const [active, setActive] = useState<string>("php");
    const palette = PALETTES[active] ?? PALETTES.php;

    return (
        <main className="relative isolate min-h-[92vh] overflow-hidden bg-neutral-950 text-neutral-100">
            {/* Pixel grid background
            <div className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
*/}
            {/* CRT scanlines + vignette
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />
            */}
            {/* === Hover canvas ONLY in this section (behind everything here) === */}
            <PixelHoverCanvas
                className="absolute inset-0 pointer-events-none z-0"
                cell={12} fade={0.07} strength={0.9}
            />

            {/* === Section-only background overlays (above canvas) === */}
            <div className="pointer-events-none absolute inset-0 z-10 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <section className="mx-auto z-30 flex max-w-6xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:items-stretch md:gap-16">
                {/* Left: BIG pixel skill name card */}
                <div className="relative flex w-full flex-1 items-center justify-center">
                    <motion.div
                        initial={{ y: 12, rotate: -1.5, opacity: 0 }}
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="relative w-full max-w-xl"
                    >
                        <PixelCard text={skills.find((s) => s.key === active)?.label ?? "Skill"} palette={palette} />

                        {/* Ambient code shimmer */}
                        <div className="pointer-events-none absolute -inset-x-10 -bottom-10 top-20 hidden md:block">
                            <div className="relative mx-auto grid h-full max-w-md grid-cols-6 gap-2 opacity-40">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="code-drop text-xs text-emerald-300/90"
                                        style={{ animationDelay: `${(i % 6) * 0.25}s` }}
                                    >
                    01{(i % 7).toString()}&nbsp;{i % 3 ? "</>" : "{}"}
                  </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Heading + skill chips */}
                <div className="relative z-[1] flex-1">
                    <motion.h1
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="text-balance font-black tracking-tight [text-shadow:0_1px_0_rgba(0,0,0,0.4)]"
                    >
                        <span className="block text-2xl text-neutral-300">Hi, I'm</span>
                        <span className="mt-1 block text-5xl md:text-6xl">Muaiad Hadad</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 max-w-xl text-pretty text-neutral-300"
                    >
                        Hero section in <em>pixel-art</em> style with light animations. These are my <strong>skills</strong> - tap a chip to
                        preview the pixel card on the left.
                    </motion.p>

                    {/* Skill chips */}
                    <div className="mt-7 flex flex-wrap gap-3">
                        {skills.map(({ key, label }, idx) => (
                            <motion.button
                                type="button"
                                key={key}
                                onMouseEnter={() => setActive(key)}
                                onClick={() => setActive(key)}
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.05 * idx, type: "spring", stiffness: 140, damping: 14 }}
                                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 font-medium shadow-[0_2px_0_0_#000,0_4px_0_0_#1a1a1a] hover:translate-y-[1px] focus:outline-none ${
                                    active === key ? "border-emerald-400/40 bg-emerald-600/20 text-emerald-200" : "border-white/15 bg-neutral-900/70 text-white/90"
                                }`}
                            >
                                <PixelSprite data={SPRITES[key]} pixel={4} />
                                <span className="[font-variant-ligatures:none]">{label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#projects"
                            className="rounded-2xl border border-emerald-500/30 bg-emerald-600/20 px-5 py-2 font-semibold text-emerald-300 shadow-[0_2px_0_0_#022,0_4px_0_0_#011] backdrop-blur transition hover:translate-y-[1px] hover:bg-emerald-600/30"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2 font-semibold text-white/90 shadow-[0_2px_0_0_#000,0_4px_0_0_#111] backdrop-blur transition hover:bg-white/10"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .code-drop {
          display: inline-block;
          animation: drop 3.6s linear infinite;
          white-space: nowrap;
        }
        @keyframes drop {
          0% {
            transform: translateY(-40%);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
        </main>
    );
}

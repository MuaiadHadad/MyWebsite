"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import {motion} from "framer-motion";

/* ===== Featured (do CV) ===== */
type Project = {
    title: string;
    blurb: string;
    tech?: string[];
    href?: string;      // live/case-study
    repo?: string;      // github url
    period?: string;
};

const FEATURED: Project[] = [
    {
        title: "PharmaRobot — Urgent Medication Delivery",
        period: "Mar 2025 — Present",
        blurb: "Autonomous robot software: route planning, realtime monitor, hospital systems integration.",
        tech: ["Python", "ROS", "LLMs", "Docker"],
    },
    {
        title: "GlobAI — Website + Chatbot",
        period: "Feb 2025",
        blurb: "Full-stack site with LLM chatbot for real-time support; avatar-chatbot pipeline in prod.",
        tech: ["Next.js", "Node", "LLMs", "OpenAI"],
        href: "https://globai.ch",
    },
    {
        title: "3D Conversational Avatar",
        period: "Apr 2025 — Present",
        blurb: "UE5 avatar with voice dialog combining local LLM and OpenAI API.",
        tech: ["UE5", "TTS/STT", "LLMs"],
    },
    {
        title: "Academic Housing Management Platform",
        period: "Mar 2024 — May 2024",
        blurb: "Students search, booking and messaging with owners; simple admin flows.",
        tech: ["HTML", "JS", "PHP", "MySQL"],
    },
];

/* ===== “More on GitHub” (lista enviada) ===== */
type RepoLite = {
    name: string;
    blurb: string;
    tech?: string[];
    private?: boolean;
    license?: string;
};

const GH_USER = "MuaiadHadad";
const GH = (repo: string) => `https://github.com/${GH_USER}/${repo}`;

const MORE: RepoLite[] = [
    { name: "MyWebsite", blurb: "Personal site / portfolio (this project).", tech: ["TypeScript", "Next.js"], license: "MIT" },
    { name: "Wis4TechnicalChallenge", blurb: "Technical Challenge.", tech: ["PHP"] },
    { name: "semple_api_Weather", blurb: "Practical challenge — IPMA Weather API.", tech: ["HTML"] },
    { name: "frontend_weather_api_ipma_V2", blurb: "Weather API IPMA — full frontend.", tech: ["TypeScript"] },
    { name: "weather_api_ipma", blurb: "Weather API (IPMA) backend utilities.", tech: ["Python"] },
    { name: "Project_Accommodation_Manager", blurb: "Accommodation manager (Blade).", tech: ["Blade", "Laravel", "PHP"] },
    { name: "Avarynx-React", blurb: "Avarynx — React version.", tech: ["React", "CSS"] },
    { name: "Avatar-Avarynx", blurb: "Avarynx avatar UI.", tech: ["CSS"], license: "MIT", private: true },
    { name: "Avarynx-Frontend", blurb: "Avarynx web frontend.", tech: ["JavaScript"] },
    { name: "BioVision", blurb: "DeepVision site.", tech: ["CSS"] },
    { name: "Sistema-de-Vigil-ncia", blurb: "Surveillance system experiments.", tech: ["Python"] },
    { name: "My-Profile", blurb: "Profile page styling.", tech: ["CSS"], private: true },
    { name: "MineDefender", blurb: "“Defender” with a security angle.", tech: ["Python"] },
    { name: "NewSwissAI", blurb: "Vue-powered site prototype.", tech: ["Vue"] },
    { name: "Job-Listing-API", blurb: "Backend + frontend demo.", tech: ["CSS", "API"] },
];

export default function ProjectsPixelGrid() {
    return (
        <section id="projects" className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100">
            {/* === Pixel background layers (consistente com o resto) === */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(20,184,166,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_100%,rgba(59,130,246,0.10),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-24">
                {/* Título */}
                <header className="mb-10 flex items-center justify-between gap-4">

                    {/* heading */}
                    <motion.h2
                        initial={{ y: 16, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ type: "spring", stiffness: 120, damping: 14 }}
                        className="text-balance text-4xl font-black tracking-tight md:text-5xl">
                        PROJECTS
                    </motion.h2>
                    <Link
                        href={`https://github.com/${GH_USER}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-600/15 px-3 py-2 text-xs font-bold text-emerald-200 shadow-[0_2px_0_0_#022,0_4px_0_0_#011] transition hover:translate-y-[1px] hover:bg-emerald-600/25"
                    >
                        <Github className="h-4 w-4" />
                        VIEW GITHUB
                    </Link>
                </header>

                {/* Featured */}
                <h3 className="mb-4 text-xs font-semibold tracking-widest text-neutral-300/80">FEATURED</h3>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURED.map((p) => (
                        <li key={p.title}>
                            <article className="pixel-card group relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_2px_0_0_#000,0_8px_0_0_#111] backdrop-blur">
                                <span aria-hidden className="pointer-events-none absolute -top-1/2 left-0 z-0 h-[220%] w-1/3 rotate-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <div className="flex items-baseline justify-between gap-3">
                                        <h4 className="text-[13px] font-extrabold leading-tight text-emerald-200" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                                            {p.title}
                                        </h4>
                                        <span className="rounded-[4px] border border-emerald-300/30 px-2 py-1 text-[10px] text-emerald-200/90">
                      {p.period ?? "—"}
                    </span>
                                    </div>
                                    <p className="mt-3 text-sm text-neutral-200/90">{p.blurb}</p>
                                    {p.tech && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {p.tech.map((t) => (
                                                <span key={t} className="rounded-[4px] border border-white/10 bg-neutral-900/50 px-2 py-1 text-[10px] tracking-wide text-neutral-200">
                          {t}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                    {(p.href || p.repo) && (
                                        <div className="mt-5 flex items-center gap-3">
                                            {p.href && (
                                                <a href={p.href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:underline">
                                                    LIVE <ExternalLink className="h-3.5 w-3.5" />
                                                </a>
                                            )}
                                            {p.repo && (
                                                <a href={p.repo} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 text-xs font-bold text-neutral-200 hover:underline">
                                                    REPO <Github className="h-3.5 w-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                {/* More on GitHub */}
                <h3 className="mt-12 mb-4 text-xs font-semibold tracking-widest text-neutral-300/80">
                    MORE ON GITHUB
                </h3>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {MORE.map((r) => (
                        <li key={r.name}>
                            <a
                                href={GH(r.name)}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group block rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-200 shadow-[0_2px_0_0_#000,0_6px_0_0_#111] backdrop-blur transition hover:translate-y-[-2px]"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold">{r.name}</span>
                                    <Github className="h-4 w-4 opacity-80 group-hover:opacity-100" />
                                </div>
                                <p className="mt-1 text-neutral-300/90">{r.blurb}</p>
                                {r.tech?.length ? (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {r.tech.map((t) => (
                                            <span key={t} className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-0.5 text-[10px]">
                        {t}
                      </span>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="mt-2 text-[10px] text-neutral-400">
                                    {r.private ? "Private repo" : "Public repo"} {r.license ? `• ${r.license}` : ""}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

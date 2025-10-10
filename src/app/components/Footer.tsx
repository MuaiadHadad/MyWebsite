"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Code2 } from "lucide-react";

/** Ajusta estes URLs conforme preciso */
const GITHUB = "https://github.com/MuaiadHadad";
const LINKEDIN = "https://www.linkedin.com/in/"; // <-- coloca o teu handle
const EMAIL = "mailto:"; // <-- coloca o teu email, ex: mailto:muaiad@example.com

const LINKS = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const [showTop, setShowTop] = useState(false);
    const ref = useRef<HTMLElement | null>(null);
    const year = new Date().getFullYear();

    // Mostrar/esconder "Back to Top"
    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 240);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith("#")) return;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        // compensa header sticky (~ 72–80px)
        const headerH = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - (headerH + 12);
        window.scrollTo({ top, behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
    };

    return (
        <footer
            ref={ref}
            className="relative isolate overflow-hidden bg-neutral-950 text-neutral-100"
        >
            {/* === Background igual ao resto === */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(1100px_520px_at_20%_0%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(900px_500px_at_80%_100%,rgba(99,102,241,0.10),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16">
                {/* Top */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <Code2 className="h-6 w-6 text-emerald-400" />
                            <div
                                className="select-none leading-tight"
                                style={{ fontFamily: "'Press Start 2P', cursive" }}
                            >
                                <div className="text-[10px] font-semibold text-gray-200 sm:text-xs">
                                    FULL STACK
                                </div>
                                <div className="text-[10px] font-semibold text-emerald-300 sm:text-xs">
                                    MUAIAD HADAD
                                </div>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm text-neutral-300/90">
                            Pixel-crafted UI, reliable backends, and practical AI features.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <nav aria-label="Footer" className="sm:col-span-2">
                        <h3
                            className="pixel-title mb-4 text-emerald-300"
                            style={{ fontFamily: "'Press Start 2P', cursive" }}
                        >
                            NAVIGATION
                        </h3>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            {LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className="text-neutral-300 hover:text-emerald-300 transition-colors"
                                        onClick={(e) => scrollToHash(e, l.href)}
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Socials */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a
                                href={GITHUB}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-600/15 px-3 py-2 text-xs font-bold text-emerald-200 shadow-[0_2px_0_0_#022,0_4px_0_0_#011] transition hover:translate-y-[1px] hover:bg-emerald-600/25"
                            >
                                <Github className="h-4 w-4" />
                                GITHUB
                            </a>

                            <a
                                href={LINKEDIN}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-neutral-100 shadow-[0_2px_0_0_#000,0_4px_0_0_#111] transition hover:translate-y-[1px] hover:bg-white/10"
                            >
                                <Linkedin className="h-4 w-4" />
                                LINKEDIN
                            </a>

                            <a
                                href={EMAIL}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-neutral-100 shadow-[0_2px_0_0_#000,0_4px_0_0_#111] transition hover:translate-y-[1px] hover:bg-white/10"
                            >
                                <Mail className="h-4 w-4" />
                                EMAIL
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Divider */}
                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bottom */}
                <div className="flex flex-col items-start justify-between gap-3 text-xs text-neutral-400 sm:flex-row">
                    <p>
                        © {year} Muaiad Hadad — All rights reserved.
                    </p>
                </div>
            </div>

            {/* Back to Top (fica acima do chat widget) */}
            <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className={`fixed bottom-24 right-5 z-[130] inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-600/20 text-emerald-200 shadow-[0_2px_0_0_#022,0_4px_0_0_#011] backdrop-blur transition
          ${showTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
            >
                <ArrowUp className="h-5 w-5" />
            </button>
        </footer>
    );
}

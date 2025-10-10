"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Menu, X } from "lucide-react";

export type MenuItem = { label: string; href: string; external?: boolean };
export type NavBarWalrusProps = {
    brand?: string;
    items?: MenuItem[];
    logo?: { src: string; alt?: string };
};

const SECTIONS: MenuItem[] = [
    { label: "HOME", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "WORK", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
];

function isHash(href: string) {
    return href.startsWith("#");
}

export default function NavBarWalrus({
                                         brand = "MUAIAD",
                                         items = SECTIONS,
                                     }: NavBarWalrusProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>("#hero"); // scroll-spy section id
    const headerRef = useRef<HTMLElement | null>(null);

    // Smooth scroll for same-page hashes (compensa header sticky)
    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            if (!isHash(href)) return; // normal nav para rotas
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();
            // altura do header
            const headerH = headerRef.current?.offsetHeight ?? 80;
            const top =
                el.getBoundingClientRect().top + window.scrollY - (headerH + 12);

            window.scrollTo({ top, behavior: "smooth" });
            setOpen(false);
            setActive(`#${id}`);
            history.replaceState(null, "", `#${id}`);
        },
        [],
    );

    // Scroll-spy (IntersectionObserver)
    useEffect(() => {
        const sectionIds = items.filter(i => isHash(i.href)).map(i => i.href.slice(1));
        const els = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (!els.length) return;

        const headerH = headerRef.current?.offsetHeight ?? 80;

        const io = new IntersectionObserver(
            (entries) => {
                // escolher a secção mais visível no viewport
                const visible = entries
                    .filter((en) => en.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]?.target?.id) {
                    setActive(`#${visible[0].target.id}`);
                }
            },
            {
                // dispara quando 30% da secção está visível
                threshold: [0.3, 0.6, 0.9],
                rootMargin: `-${headerH + 8}px 0px -40% 0px`,
            },
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [items]);

    const toggle = useCallback(() => setOpen((v) => !v), []);
    const close = useCallback(() => setOpen(false), []);

    // estilo comum “pixel”
    const pixelChrome =
        "rounded-lg border border-white/10 bg-neutral-900/70 backdrop-blur";
    const pixelIndicator = (isActive: boolean) => (
        <span className="relative inline-block h-2 w-2 align-middle">
      <span
          className={`absolute inset-0 rounded-[2px] border ${
              isActive ? "border-emerald-300" : "border-white/60"
          }`}
      />
      <span
          className={`absolute inset-0 rounded-[2px] ${
              isActive ? "bg-emerald-300/70 animate-ping" : "bg-transparent group-hover:bg-emerald-300/60 group-hover:animate-ping"
          } motion-reduce:animate-none`}
      />
    </span>
    );

    const navItems = useMemo(() => items.filter(i => i.href), [items]);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-[120] w-full bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40"
        >
            {/* pixel grid + scanlines, bem subtil por trás da barra */}
            <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_8px)]" />
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_3px]" />

            {/* Top bar */}
            <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
                {/* Brand pixel */}
                <div className="flex min-w-0 items-center gap-3">
                    <Code2 className="h-6 w-6 text-emerald-400 sm:h-7 sm:w-7" />
                    <div
                        style={{ fontFamily: "'Press Start 2P', cursive" }}
                        className="select-none leading-tight"
                    >
                        <div className="text-[10px] font-semibold text-gray-200 sm:text-xs">
                            FULL STACK
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-400 sm:text-xs">
                            Developer
                        </div>
                    </div>
                </div>

                {/* Desktop menu */}
                <nav
                    aria-label="primary"
                    className={`hidden items-center px-4 py-2 shadow-sm md:flex ${pixelChrome}`}
                >
                    <ul className="flex list-none flex-row items-center gap-5">
                        {navItems.map((item) => {
                            const isActive =
                                (isHash(item.href) && active === item.href) ||
                                (!isHash(item.href) &&
                                    (pathname === item.href ||
                                        pathname?.startsWith(item.href + "/")));
                            const content = (
                                <span
                                    className={`inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide whitespace-nowrap ${
                                        isActive ? "text-emerald-300" : "text-white/90"
                                    }`}
                                >
                  {pixelIndicator(!!isActive)}
                                    {item.label}
                </span>
                            );
                            return (
                                <li key={item.label}>
                                    {item.external ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="group transition-colors hover:text-emerald-300"
                                        >
                                            {content}
                                        </a>
                                    ) : isHash(item.href) ? (
                                        <a
                                            href={item.href}
                                            className="group transition-colors hover:text-emerald-300"
                                            onClick={(e) => handleNavClick(e, item.href)}
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="group transition-colors hover:text-emerald-300"
                                        >
                                            {content}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Mobile controls */}
                <button
                    type="button"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls="navbar-drawer"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10 md:hidden"
                >
                    {open ? (
                        <X className="h-5 w-5 text-white" />
                    ) : (
                        <Menu className="h-5 w-5 text-white" />
                    )}
                </button>
            </div>

            {/* Pixel gradient ribbon */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-300 via-indigo-200 to-emerald-200" />

            {/* Overlay mobile */}
            <div
                className={`fixed inset-0 z-[110] transition-opacity md:hidden ${
                    open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
                style={{ background: "rgba(0,0,0,0.5)" }}
            />

            {/* Drawer mobile */}
            <aside
                id="navbar-drawer"
                className={`fixed left-0 top-0 z-[120] h-screen w-80 max-w-[85%] border-r border-white/10 bg-neutral-950 text-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] md:hidden ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
            >
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                    <div className="flex items-center gap-3">
                        <Code2 className="h-6 w-6 text-emerald-400" />
                        <span className="text-sm font-bold tracking-wider">{brand}</span>
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="px-3 py-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive =
                                (isHash(item.href) && active === item.href) ||
                                (!isHash(item.href) &&
                                    (pathname === item.href ||
                                        pathname?.startsWith(item.href + "/")));
                            const inner = (
                                <span
                                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                                        isActive ? "text-emerald-300" : "text-white/90"
                                    } hover:bg-white/10 active:bg-white/15`}
                                >
                  <span className="relative inline-block h-2 w-2">
                    <span
                        className={`absolute inset-0 rounded-[2px] border ${
                            isActive ? "border-emerald-300" : "border-white/60"
                        }`}
                    />
                    <span
                        className={`absolute inset-0 rounded-[2px] ${
                            isActive
                                ? "bg-emerald-300/70 animate-ping"
                                : "bg-transparent group-hover:bg-emerald-300/60 group-hover:animate-ping"
                        } motion-reduce:animate-none`}
                    />
                  </span>
                                    {item.label}
                </span>
                            );
                            if (item.external) {
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            onClick={() => setOpen(false)}
                                            className="group"
                                        >
                                            {inner}
                                        </a>
                                    </li>
                                );
                            }
                            if (isHash(item.href)) {
                                return (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="group"
                                            onClick={(e) => {
                                                handleNavClick(e, item.href);
                                            }}
                                        >
                                            {inner}
                                        </a>
                                    </li>
                                );
                            }
                            return (
                                <li key={item.label}>
                                    <Link href={item.href} onClick={() => setOpen(false)} className="group">
                                        {inner}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </header>
    );
}

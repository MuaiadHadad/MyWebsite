"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";

// Types
export type MenuItem = { label: string; href?: string; to?: string; external?: boolean };
export type DocsBtn = { label?: string; href?: string; to?: string; external?: boolean } | null | undefined;

export type NavBarWalrusProps = {
    logo?: { src: string; alt?: string };
    brand?: string;
    items?: MenuItem[];
    /**
     * "Docs" button props. If null/undefined, the button is hidden (no crash).
     */
    docs?: DocsBtn;
};

const DEFAULT_ITEMS: MenuItem[] = [
    { label: "DISCOVER", href: "/discover" },
    { label: "BUILD", href: "/build" },
    { label: "USE", href: "/use" },
    { label: "JOIN", href: "/join" },
    { label: "CLAIM", href: "https://example.com/claim", external: true },
] as const;

function getHref(it: MenuItem): string | undefined {
    return it.href ?? it.to ?? undefined;
}

export default function NavBarWalrus({
                                         logo = { src: "/Logo_muaiad.png", alt: "Logo" },
                                         brand = "WALRUS",
                                         items = DEFAULT_ITEMS as MenuItem[],
                                         docs,
                                     }: NavBarWalrusProps) {
    const [open, setOpen] = useState(false);

    // Normalize docs to a safe object or null
    const docsSafe = (docs && typeof docs === "object") ? docs : null;
    const docsHref = docsSafe?.href ?? docsSafe?.to ?? "#";
    const showDocs = !!docsSafe; // renderiza botão só se existir

    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (typeof window !== "undefined") {
            window.addEventListener("keydown", onKey);
            return () => window.removeEventListener("keydown", onKey);
        }
        return () => {};
    }, []);

    const toggle = useCallback(() => setOpen((v) => !v), []);
    const close = useCallback(() => setOpen(false), []);

    return (
        <header className="w-full not-prose sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            {/* Top bar */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Left: icon + pixel title */}
                <div className="flex items-center gap-3 min-w-0">
                    <Code2 className="h-7 w-7 text-teal-400" />
                    <div style={{ fontFamily: "'Press Start 2P', cursive" }} className="leading-tight select-none">
                        <div className="text-[11px] sm:text-xs font-semibold text-gray-200">FULL-STACK</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-teal-400">DEVELOPER</div>
                    </div>
                </div>

                {/* Center: pill menu (desktop) */}
                <nav aria-label="primary" className="hidden md:flex items-center rounded-lg bg-neutral-900 text-white px-5 py-2 shadow-sm">
                    <ul className="m-0 p-0 list-none flex flex-row items-center gap-6">
                        {(items ?? [])
                            .filter((it) => getHref(it))
                            .map((item) => {
                                const href = getHref(item)!;
                                const content = (
                                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide whitespace-nowrap">
                    <span className="inline-block h-2 w-2 rounded-[2px] border border-white/70" />
                                        {item.label}
                                        {item.external && <span aria-hidden className="ml-1 text-white/80">↗</span>}
                  </span>
                                );
                                return (
                                    <li key={item.label} className="m-0 p-0">
                                        {item.external ? (
                                            <a href={href} target="_blank" rel="noreferrer noopener" className="hover:text-teal-300 transition-colors">
                                                {content}
                                            </a>
                                        ) : (
                                            <Link href={href} className="hover:text-teal-300 transition-colors">
                                                {content}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </nav>

                {/* Right: docs (desktop) + hamburger (mobile) */}
                <div className="flex items-center gap-3">
                    {showDocs && (
                        <div className="hidden md:block">
                            {docsSafe!.external ? (
                                <a
                                    href={docsHref}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center gap-2 rounded-lg bg-teal-300/80 hover:bg-teal-300 px-4 py-2 font-extrabold tracking-wide text-neutral-900 transition-colors whitespace-nowrap"
                                >
                                    {docsSafe!.label ?? "READ DOCS"}
                                    <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-white text-[11px] leading-none">↗</span>
                                </a>
                            ) : (
                                <Link
                                    href={docsHref}
                                    className="inline-flex items-center gap-2 rounded-lg bg-teal-300/80 hover:bg-teal-300 px-4 py-2 font-extrabold tracking-wide text-neutral-900 transition-colors whitespace-nowrap"
                                >
                                    {docsSafe!.label ?? "READ DOCS"}
                                    <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-white text-[11px] leading-none">↗</span>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Hamburger */}
                    <button
                        type="button"
                        aria-label={open ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={open}
                        aria-controls="navbar-drawer"
                        onClick={toggle}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition active:scale-95"
                    >
                        {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
                    </button>
                </div>
            </div>

            {/* Gradient ribbon */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-300 via-indigo-200 to-teal-200" />

            {/* Overlay + Mobile Drawer */}
            {/* Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={close}
                aria-hidden="true"
                style={{ background: "rgba(0,0,0,0.5)" }}
            />

            {/* Drawer */}
            <aside
                id="navbar-drawer"
                className={`md:hidden fixed left-0 top-0 z-50 h-screen w-80 max-w-[85%] bg-neutral-950 text-white shadow-2xl border-r border-white/10
        transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navegação"
            >
                {/* Drawer header */}
                <div className="h-20 px-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-3 min-w-0">
                        <Code2 className="h-7 w-7 text-teal-400" />
                        <div style={{ fontFamily: "'Press Start 2P', cursive" }} className="leading-tight select-none">
                            <div className="text-[11px] sm:text-xs font-semibold text-gray-200">FULL-STACK</div>
                            <div className="text-[11px] sm:text-xs font-semibold text-teal-400">DEVELOPER</div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10"
                        onClick={close}
                        aria-label="Fechar menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Drawer content */}
                <nav className="px-4 py-4">
                    <ul className="space-y-1">
                        {(items ?? [])
                            .filter((it) => getHref(it))
                            .map((item) => {
                                const href = getHref(item)!;
                                const Inner = (
                                    <span className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors text-sm font-semibold">
                    <span className="inline-block h-2 w-2 rounded-[2px] border border-white/70" />
                                        {item.label}
                                        {item.external && <span aria-hidden className="ml-auto text-white/70">↗</span>}
                  </span>
                                );
                                return (
                                    <li key={item.label}>
                                        {item.external ? (
                                            <a href={href} target="_blank" rel="noreferrer noopener" onClick={close}>
                                                {Inner}
                                            </a>
                                        ) : (
                                            <Link href={href} onClick={close}>
                                                {Inner}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>

                    {/* Docs button inside drawer */}
                    {showDocs && (
                        <div className="mt-4">
                            {docsSafe!.external ? (
                                <a
                                    href={docsHref}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    onClick={close}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300/90 hover:bg-teal-300 px-4 py-3 font-extrabold tracking-wide text-neutral-900 transition-colors"
                                >
                                    {docsSafe!.label ?? "READ DOCS"} <span aria-hidden>↗</span>
                                </a>
                            ) : (
                                <Link
                                    href={docsHref}
                                    onClick={close}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-300/90 hover:bg-teal-300 px-4 py-3 font-extrabold tracking-wide text-neutral-900 transition-colors"
                                >
                                    {docsSafe!.label ?? "READ DOCS"} <span aria-hidden>↗</span>
                                </Link>
                            )}
                        </div>
                    )}
                </nav>
            </aside>
        </header>
    );
}
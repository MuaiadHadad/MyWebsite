"use client";

import { useEffect, useRef } from "react";

export default function PixelHoverCanvas({
                                             cell = 12,
                                             color = "hsla(160 90% 60% / 1)",
                                             border = "rgba(0,0,0,0.25)",
                                             snap = false,
                                             className = "absolute inset-0 pointer-events-none z-0",
                                         }: {
    cell?: number,
    color?: string,
    border?: string,
    snap?: boolean,
    className?: string,
    fade?: number
}) {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const dprRef = useRef(1);
    const posRef = useRef<{ x: number; y: number } | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext("2d")!;
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        dprRef.current = dpr;

        const parent = canvas.parentElement ?? document.body;

        const resize = () => {
            const w = parent.clientWidth || window.innerWidth;
            const h = parent.clientHeight || window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // desenhar em unidades CSS px
            ctx.clearRect(0, 0, w, h);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(parent);
        window.addEventListener("resize", resize);

        const draw = () => {
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            ctx.clearRect(0, 0, w, h); // ❗ sem rasto: limpa tudo a cada frame

            const pos = posRef.current;
            if (pos) {
                // posição relativa ao canvas
                const rect = canvas.getBoundingClientRect();
                let x = pos.x - rect.left;
                let y = pos.y - rect.top;

                if (snap) {
                    // encaixa na grelha (canto sup-esq no múltiplo de cell)
                    x = Math.floor(x / cell) * cell;
                    y = Math.floor(y / cell) * cell;
                } else {
                    // centra o pixel no cursor
                    x = Math.round(x - cell / 2);
                    y = Math.round(y - cell / 2);
                }

                ctx.fillStyle = color;
                ctx.fillRect(x, y, cell, cell);
                // contorno para “look” 8-bit
                ctx.strokeStyle = border;
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
            }
            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        // ouvimos o rato na window (canvas tem pointer-events:none)
        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };
        const onLeave = () => {
            posRef.current = null; // esconder pixel quando sai
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            ro.disconnect();
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [cell, color, border, snap]);

    return <canvas ref={ref} aria-hidden className={className} />;
}

// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PixelHoverCanvas from "./components/PixelHoverCanvas";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Muaiad Hadad",
    description: "Pixel-art dev portfolio of Muaiad Hadad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
            <title>Muaiad — Portfolio</title>
        </head>

        <body className="bg-neutral-950 text-neutral-100 antialiased">
        {/* STACK de fundo — todos elementos FIXED, cada um com o seu z-index */}
        {/* 0) Canvas de hover — MAIS ATRÁS, mas acima da cor do body */}
        <PixelHoverCanvas className="fixed inset-0 pointer-events-none z-0" cell={12} fade={0.07} strength={0.9} />

        {/* 1) Grid (por cima do canvas) */}
        <div className="fixed inset-0 pointer-events-none z-10 bg-grid-a" />
        <div className="fixed inset-0 pointer-events-none z-20 bg-grid-b" />

        {/* 2) Chuva (se usas) */}
        <div className="fixed inset-0 pointer-events-none z-30 bg-rain-near" />
        <div className="fixed inset-0 pointer-events-none z-40 bg-rain-mid" />
        <div className="fixed inset-0 pointer-events-none z-50 bg-rain-far" />

        {/* 3) Twinkle / Scanlines / Vignette (top overlays) */}
        <div className="fixed inset-0 pointer-events-none z-60 bg-twinkle" />
        <div className="fixed inset-0 pointer-events-none z-70 bg-scanlines" />
        <div className="fixed inset-0 pointer-events-none z-80 bg-vignette" />

        {/* Conteúdo em cima de tudo */}
        <div className="relative z-90">{children}</div>
        </body>


        </html>
    );
}

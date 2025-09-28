// App.tsx
import React from "react";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <>
            <NavBar
                logo={{ src: "/Logo_muaiad.png", alt: "Walrus" }}
                brand="WALRUS"
                // podes customizar items e docs se quiseres
            />
            <main className="max-w-7xl mx-auto p-6">...</main>
        </>
    );
}

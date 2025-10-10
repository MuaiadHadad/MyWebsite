// App.tsx
import React from "react";
import NavBar from "./components/NavBar";
import MainPixelHero from "./components/Main";
import AboutMe from "./components/AboutMe";
import ChatWidget from "./components/ChatWidget";
import ProjectsPixelGrid from "./components/ProjectsPixelGrid";

import WorkExperience, {
    WorkExperienceTwoUp,
    WorkExperienceRight,
    WorkExperienceLeft,
} from "./components/WorkExperience";
import EducationTraining from "./components/EducationTraining";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default function App() {
    return (
        <>
            <NavBar
                logo={{ src: "/Logo_muaiad.png", alt: "Walrus" }}
                brand="WALRUS"
                // podes customizar items e docs se quiseres
            />
            <MainPixelHero />
            <AboutMe />
            <WorkExperience />
            <EducationTraining />
            <SkillsSection />
            <ProjectsPixelGrid/>
            <ContactSection/>
            <ChatWidget />
            <Footer />

        </>
    );
}

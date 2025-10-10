// App.tsx
import React from "react";
import NavBar from "./components/NavBar";
import MainPixelHero from "./components/Main";
import AboutMe from "./components/AboutMe";
import ChatWidget from "./components/ChatWidget";

import WorkExperience, {
    WorkExperienceTwoUp,
    WorkExperienceRight,
    WorkExperienceLeft,
} from "./components/WorkExperience";
import EducationTraining from "./components/EducationTraining";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";




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
            <ContactSection/>
            <ChatWidget />

        </>
    );
}

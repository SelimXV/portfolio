import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { HeroParallax } from "./components/hero-parallax";
import BackgroundBeams from "./components/background-beams";
import ProjectList from "@/app/contentful/test";
import { fetchProject } from "@/app/contentful/fetchproject";
import ProjectCard from "@/app/projects/ProjectCard";
import InfoSection from "@/app/components/InfoSection";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";


export default async function Home() {
    const projects = await fetchProject();

    return (

        <main className="flex min-h-screen flex-col bg-[#121212]">
            <Navbar/>
            <BackgroundBeams className="fixed z-0"/>
            <div className="container mt-24 mx-auto px-6 py-4 z-10 relative">
                <HeroSection/>
            </div>
            <div className="container mx-auto px-6 py-12 z-10 relative">
                <InfoSection/>
            </div>
            <div className="flex-grow overflow-y-auto z-10 relative">
                <ProjectCard projects={projects}/>
            </div>
            {/* Vercel Fonction */}
            <SpeedInsights/>
            <Analytics/>

        </main>
    );
}



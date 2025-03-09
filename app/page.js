import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BackgroundBeams from "./components/background-beams";
import { fetchProject } from "@/app/contentful/fetchproject";
import ProjectCard from "@/app/projects/ProjectCard";
import InfoSection from "@/app/components/InfoSection";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

export default async function Home() {
    const projects = await fetchProject();

    return (
        <main className="flex min-h-screen flex-col bg-white dark:bg-[#121212] text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-300">
            {/* Background effect - visible only in dark mode */}
            <div className="hidden dark:block">
                <BackgroundBeams className="fixed z-0"/>
            </div>
            
            {/* Navigation */}
            <Navbar/>
            
            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center">
                    <div className="container mx-auto px-6">
                        <HeroSection/>
                    </div>
                </section>
                
                {/* Info Section with smooth transition */}
                <section className="relative">
                    <div className="container mx-auto px-6">
                        <InfoSection/>
                    </div>
                </section>
                
                {/* Projects Section */}
                <section>
                    <ProjectCard projects={projects}/>
                </section>
            </div>
            
            {/* Vercel Analytics */}
            <SpeedInsights/>
            <Analytics/>
        </main>
    );
}



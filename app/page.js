import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import { HeroParallax } from "./components/hero-parallax";
import BackgroundBeams from "./components/background-beams";
import ProjectList from "@/app/contentful/test";
import { fetchProject } from "@/app/contentful/fetchproject";
import ProjectCard from "@/app/projects/ProjectCard";
import InfoSection from "@/app/components/InfoSection";

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
        </main>
    );
}


export const products = [
    {
        title: "Cy-Shop",
        link: "https://github.com/SelimXV/Cy-Shop",
        thumbnail: "/images/Isagi Yoichi.jpeg",
        technologies: ["C"],
    },
    {
        title: "PokeNetflix",
        link: "https://github.com/SelimXV/PokeNetflix",
        thumbnail: "/images/Denji (1).jpeg",
        technologies: ["HTML", "CSS"],
    },
    {
        title: "firstPortfolio",
        link: "https://github.com/SelimXV/portfolioReactJS",
        thumbnail: "/images/Youru.jpeg",
        technologies: ["ReactJS", "CSS"],
    },
    {
        title: "TinyCar",
        link: "https://github.com/SelimXV/TinyCar",
        thumbnail: "/images/Pinterest image.jpeg",
        technologies: ["Java"],
    },
    {
        title: "Zootickoon",
        link: "https://github.com/SelimXV/Zootickoon",
        thumbnail: "/images/hero-image.jpeg",
        technologies: ["PHP", "HTML", "CSS"],

    },

    {
        title: "Test2",
        link: "https://editrix.ai",
        thumbnail: "/images/hero-image.jpeg",
    },
];

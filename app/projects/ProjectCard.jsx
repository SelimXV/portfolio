"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaEye } from "react-icons/fa";
import { useTheme } from "@/app/context/ThemeContext";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

export const ProjectCard = ({ projects }) => {
    const [hovered, setHovered] = useState(null);
    const { theme } = useTheme();
    const containerRef = React.useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: "-100px 0px" });
    const { scrollYProgress } = useScroll({ 
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Diviser les projets en deux groupes égaux
    const firstHalf = projects.slice(0, Math.ceil(projects.length / 2));
    const secondHalf = projects.slice(Math.ceil(projects.length / 2));
    
    const size = useWindowSize();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1280;

    // Effet de fondu à l'entrée de la section
    const fadeInVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            } 
        })
    };

    // Animation de défilement pour la présentation en grille 3D
    const offsetX = useTransform(
        scrollYProgress, 
        [0, 0.5, 1], 
        [0, isTablet ? 50 : 100, 0]
    );
    
    const offsetXReverse = useTransform(
        scrollYProgress, 
        [0, 0.5, 1], 
        [0, isTablet ? -50 : -100, 0]
    );

    const rotateY = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [2, 0, -2]
    );

    const perspective = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [800, 1000, 800]
    );

    return (
        <section 
            id="projects-section" 
            className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400'
                            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                    }`}>
                        Mes Projets
                    </h2>
                    <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Découvrez mes réalisations et projets récents. Chaque projet représente une opportunité d&apos;apprentissage et une solution à un problème concret.
                    </p>
                </div>

                {isMobile ? (
                    // Vue mobile en grille simple
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.sys.id}
                                custom={index}
                                variants={fadeInVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <ProjectItem 
                                    project={project} 
                                    index={index}
                                    hovered={hovered}
                                    setHovered={setHovered}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    // Vue desktop en deux rangées avec effet 3D
                    <div className="space-y-20">
                        {/* Première rangée */}
                        <motion.div 
                            style={{ 
                                x: offsetX,
                                rotateY: rotateY,
                                perspective: perspective
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {firstHalf.map((project, index) => (
                                <motion.div
                                    key={project.sys.id}
                                    custom={index}
                                    variants={fadeInVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{ 
                                        scale: 1.03,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <ProjectItem 
                                        project={project} 
                                        index={index}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Deuxième rangée (direction inverse) */}
                        <motion.div 
                            style={{ 
                                x: offsetXReverse,
                                rotateY: rotateY.invert(),
                                perspective: perspective
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {secondHalf.map((project, index) => (
                                <motion.div
                                    key={project.sys.id}
                                    custom={index + firstHalf.length}
                                    variants={fadeInVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{ 
                                        scale: 1.03,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <ProjectItem 
                                        project={project} 
                                        index={index + firstHalf.length}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

const ProjectItem = ({ project, index, hovered, setHovered }) => {
    const { theme } = useTheme();
    const { title, technologies, thumbnail, slug, link } = project.fields;

    return (
        <div 
            className={cn(
                "relative group overflow-hidden h-72 sm:h-80 md:h-96 rounded-xl border transition-all duration-300",
                theme === 'dark' 
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-blue-500/30 shadow-lg"
                    : "bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-blue-500/30 shadow-md",
                hovered !== null && hovered !== index && "opacity-60 scale-[0.98]"
            )}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
        >
            {/* Image d'arrière-plan */}
            <Image
                src={"https:" + thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
                className="object-cover absolute h-full w-full inset-0 transition-transform duration-500 group-hover:scale-110"
                alt={title}
            />

            {/* Overlay au survol */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col justify-center items-center opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100"
                )}
            >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center px-4">{title}</h3>
                <div className="flex space-x-4 mt-2">
                    <Link href={'/projects/' + slug}>
                        <div className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                            <FaEye className="text-lg" />
                            <span>Détails</span>
                        </div>
                    </Link>
                    <Link href={link} target="_blank">
                        <div className="flex items-center gap-2 text-white bg-gray-700 px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                            <FaGithub className="text-lg" />
                            <span>GitHub</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* En-tête toujours visible */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
            </div>

            {/* Pied de page avec technologies */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                {technologies && (
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <span 
                                key={technology} 
                                className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs md:text-sm font-medium"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
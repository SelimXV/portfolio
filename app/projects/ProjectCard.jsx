"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/app/utils/cn";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaEye } from "react-icons/fa";

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

    useEffect(() => {
        console.log(projects);
    }, [projects]);

    const firstRow = projects.slice(0, Math.ceil(projects.length / 2));
    const secondRow = projects.slice(Math.ceil(projects.length / 2));
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({ 
        target: ref, 
        offset: ["start end", "end start"] // Modifié pour commencer l'animation plus tôt et finir plus tard
    });

    // Configuration des ressorts avec moins de raideur pour des animations plus douces
    const springConfig = { stiffness: 200, damping: 40, bounce: 0 };

    // Ajustement des plages de valeurs pour les transformations
    const translateX = useSpring(useTransform(scrollYProgress, [0, 0.8], [-250, 500]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 0.8], [250, -500]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [10, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.3, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [5, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5], [-200, 200]), springConfig);

    const size = useWindowSize();
    const isSmallScreen = size.width < 1368;

    return (
        <section id="projects-section" className="py-24">
            <div 
                ref={ref} 
                className={`${isSmallScreen ? 'h-full' : 'min-h-[200vh]'} overflow-visible antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]`}
            >
                {isSmallScreen ? (
                    <div className="max-w-6xl relative mx-auto px-4 w-full">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400 mb-4">
                                Mes Projets
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                                Découvrez mes réalisations et projets récents. Chaque projet représente une opportunité d&apos;apprentissage et une solution à un problème concret.
                            </p>
                        </div>
                        <div className="project-grid grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
                            {projects.map((project, index) => (
                                <SingleProjectCard
                                    key={project.sys.id}
                                    project={project}
                                    index={index}
                                    hovered={hovered}
                                    setHovered={setHovered}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <Header />
                        <motion.div 
                            style={{rotateX, rotateZ, translateY, opacity}} 
                            className="mt-16 pb-40" // Ajout de padding pour éviter la troncature
                        >
                            <motion.div 
                                className="flex flex-row-reverse space-x-reverse space-x-8 mb-32 pl-10 overflow-visible"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                            >
                                {firstRow.map((project, index) => (
                                    <ProductCard
                                        project={project}
                                        translate={translateX}
                                        key={`${project.sys.id}-${index}`}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                        index={`${project.sys.id}-${index}`}
                                    />
                                ))}
                            </motion.div>
                            <motion.div 
                                className="flex flex-row space-x-8 mb-32 pr-10 overflow-visible"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                            >
                                {secondRow.map((project, index) => (
                                    <ProductCard
                                        project={project}
                                        translate={translateXReverse}
                                        key={`${project.sys.id}-${index + firstRow.length}`}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                        index={`${project.sys.id}-${index + firstRow.length}`}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

const SingleProjectCard = ({project, index, hovered, setHovered}) => {
    const {title, technologies, thumbnail, slug, link} = project.fields;

    return (
        <motion.div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden h-64 md:h-72 w-full rounded-xl border border-gray-800 hover:border-blue-500/30 shadow-lg transition-all duration-300",
                hovered !== null && hovered !== index && "opacity-70 scale-[0.98]",
                hovered === index && "scale-[1.02] shadow-xl shadow-blue-500/20"
            )}
        >
            <Image
                src={"https:" + thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
                className="object-cover absolute h-full w-full inset-0"
                alt={title}
            />
            <div
                className={cn(
                    "absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col justify-center items-center opacity-0 transition-opacity duration-300",
                    hovered === index && "opacity-100"
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
                    <Link href={link}>
                        <div className="flex items-center gap-2 text-white bg-gray-700 px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                            <FaGithub className="text-lg" />
                            <span>GitHub</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                {technologies && (
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <span key={technology} className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs md:text-sm font-medium">
                                {technology}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const Header = () => (
    <div className="max-w-6xl relative mx-auto px-4 w-full left-0 top-0 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400 mb-4">
            Mes Projets
        </h2>
        <p className="text-gray-400 max-w-2xl md:mx-0 mx-auto">
            Découvrez mes réalisations et projets récents. Chaque projet représente une opportunité d&apos;apprentissage et une solution à un problème concret.
        </p>
    </div>
);

export const ProductCard = ({ project, translate, hovered, setHovered, index }) => {
    const { title, technologies, featuredImage, slug, link } = project.fields;

    return (
        <motion.div
            style={{ x: translate }}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={project.sys.id}
            className={cn(
                "relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden h-72 w-[18rem] md:w-[20rem] lg:w-[22rem] rounded-xl border border-gray-800 hover:border-blue-500/30 shadow-lg transition-all duration-300",
                hovered !== null && hovered !== index && "opacity-70 scale-[0.98]",
                hovered === index && "scale-[1.02] shadow-xl shadow-blue-500/20"
            )}
            onMouseEnter={() => {
                setHovered(index);
            }}
            onMouseLeave={() => {
                setHovered(null);
            }}
        >
            <Image
                src={"https:" + featuredImage.fields.file.url}
                width={featuredImage.fields.file.details.image.width}
                height={featuredImage.fields.file.details.image.height}
                className="object-cover absolute h-full w-full inset-0"
                alt={title}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold text-white mb-4 text-center px-4">{title}</h3>
                <div className="flex space-x-4 mt-2">
                    <Link href={"/projects/" + slug}>
                        <div className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                            <FaEye className="text-lg" />
                            <span>Détails</span>
                        </div>
                    </Link>
                    <Link href={link}>
                        <div className="flex items-center gap-2 text-white bg-gray-700 px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                            <FaGithub className="text-lg" />
                            <span>GitHub</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                {technologies && (
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((technology) => (
                            <span key={technology} className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-medium">
                                {technology}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
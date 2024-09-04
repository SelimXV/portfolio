"use client";
import React, {useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({ width: undefined, height: undefined });

    React.useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};

export const ProjectCard = ({projects}) => {
    useEffect(() => {

        console.log(projects);

    }, []);

    const firstRow = projects.slice(0, 3);
    const secondRow = projects.slice(3, 6);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(useTransform(scrollYProgress, [0, 3], [-250, 800]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 3], [250, -750]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-600, 1000]), springConfig);

    const size = useWindowSize();
    const isSmallScreen = size.width < 1368;

    return (
        <div ref={ref}
             className="h-[300vh] py-60 lg:py-30 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
            {isSmallScreen ? (
                <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
                    <h1 className="text-center text-white mb-4 text-4xl sm:text-6xl lg:text-7xl lg:leading-normal font-extrabold">
                        Mes Projets
                    </h1>
                    <div className="project-grid grid grid-cols-1 gap-16 md:grid-cols-2 mt-8">
                        {projects.map((project) => (
                            <SingleProjectCard key={project.sys.id} project={project} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="">
                        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-20">
                            {firstRow.map((project) => (
                                <ProductCard project={project} translate={translateX} key={project.sys.id} />
                            ))}
                        </motion.div>
                        <motion.div className="flex flex-row mb-20 space-x-10">
                            {secondRow.map((project) => (
                                <ProductCard project={project} translate={translateXReverse} key={project.sys.id} />
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

const SingleProjectCard = ({ project }) => {
    const { title, technologies, thumbnail, slug, link } = project.fields;
    return (
        <div className="group/product h-96 w-[28rem] relative flex-shrink-0">
            <Image
                src={"https:" + thumbnail.fields.file.url}
                width={(thumbnail.fields.file.details.image.width)}
                height={(thumbnail.fields.file.details.image.height)}
                className="object-cover object-left-top absolute h-full w-full inset-0"
                alt={title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">{title}</h2>
            <Link href={'/projects/' + slug} className="block group-hover/product:shadow-2xl">
                <h2 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">Consulter le projet</h2>
            </Link>
            <Link href={link} className="block group-hover/product:shadow-2xl">
                <h2 className="absolute top-4 right-4 opacity-0 group-hover/product:opacity-100 text-white">GitHub</h2>
            </Link>
            {technologies && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover/product:opacity-100 text-white flex space-x-2">
                    {technologies.map((technology) => (
                        <span key={technology} className="bg-white text-black px-2 py-1 rounded">{technology}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Header = () => (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">Ma liste <br /> de Projets</h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
            Voici tous mes projets disponibles sur mon GitHub, je vous invite à les consulter.
        </p>
    </div>
);

export const ProductCard = ({ project, translate }) => {
    const { title, technologies, thumbnail, slug, link } = project.fields;
    return (
        <motion.div
            style={{ x: translate }}
            whileHover={{ y: -20 }}
            key={project.sys.id}
            className="group/product h-96 w-[28rem] relative flex-shrink-0"
        >
            <Image
                src={"https:" + thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
                className="object-cover object-left-top absolute h-full w-full inset-0"
                alt={title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">{title}</h2>
            <Link href={"/projects/" + slug} className="block group-hover/product:shadow-2xl">
                <h2 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">Consulter le projet</h2>
            </Link>
            <Link href={link} className="block group-hover/product:shadow-2xl">
                <h2 className="absolute top-4 right-4 opacity-0 group-hover/product:opacity-100 text-white">GitHub</h2>
            </Link>
            {technologies && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover/product:opacity-100 text-white flex space-x-2">
                    {technologies.map((technology) => (
                        <span key={technology} className="bg-white text-black px-2 py-1 rounded">{technology}</span>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ProjectCard;

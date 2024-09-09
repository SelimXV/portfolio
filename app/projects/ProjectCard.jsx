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
             className="h-[300vh] py-20 sm:py-30 lg:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
            {isSmallScreen ? (
                <div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
                    <h1 className="text-center text-white mb-4 text-3xl sm:text-5xl lg:text-7xl lg:leading-normal font-extrabold">
                        Mes Projets
                    </h1>
                    <div className="project-grid grid grid-cols-1 gap-6 sm:grid-cols-2 mt-8 place-items-center">
                        {projects.map((project) => (
                            <SingleProjectCard key={project.sys.id} project={project} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="">
                        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-16 lg:mb-20">
                            {firstRow.map((project) => (
                                <ProductCard project={project} translate={translateX} key={project.sys.id} />
                            ))}
                        </motion.div>
                        <motion.div className="flex flex-row space-x-8 mb-16 lg:mb-20">
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
        <div className="group/product h-60 w-[16rem] sm:h-70 sm:w-[20rem] lg:h-80 lg:w-[24rem] xl:h-96 xl:w-[28rem] relative flex-shrink-0 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <Image
                src={"https:" + thumbnail.fields.file.url}
                width={thumbnail.fields.file.details.image.width}
                height={thumbnail.fields.file.details.image.height}
                className="object-cover absolute h-full w-full inset-0"
                alt={title}
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-70 bg-black transition-opacity duration-300 flex flex-col justify-center items-center space-y-3">
                {/* "Consulter le projet" Button */}
                <Link href={'/projects/' + slug}>
                    <h2 className="text-white bg-blue-600 px-3 py-2 rounded-lg shadow-lg sm:text-sm lg:text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                        Consulter le projet
                    </h2>
                </Link>

                {/* "GitHub" Button */}
                <Link href={link}>
                    <h2 className="text-white bg-gray-700 px-3 py-2 rounded-lg shadow-lg lg:text-lg sm:text-sm font-semibold hover:bg-gray-800 transition-colors duration-200">
                        GitHub
                    </h2>
                </Link>
            </div>

            {/* Title and Technologies at the bottom */}
            <div className="absolute bottom-4 left-4 text-white">
                <h2 className="sm:text-sm lg:text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded shadow-lg">
                    {title}
                </h2>
                {technologies && (
                    <div className="flex space-x-2 mt-2">
                        {technologies.map((technology) => (
                            <span key={technology} className="bg-white text-black px-2 py-1 rounded text-xs lg:text-sm">
                {technology}
              </span>
                        ))}
                    </div>
                )}
            </div>
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
    const { title, technologies, featuredImage, slug, link } = project.fields;

    return (
        <motion.div
            style={{x: translate}}
            whileHover={{y: -20}}
            key={project.sys.id}
            className="group/product h-96 w-[28rem] relative flex-shrink-0"
        >
            <Image
                src={"https:" + featuredImage.fields.file.url}
                width={featuredImage.fields.file.details.image.width}
                height={featuredImage.fields.file.details.image.height}
                className="object-cover object-left-top absolute h-full w-full inset-0"
                alt={title}
            />

            <div
                className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-black transition-opacity duration-300 flex flex-col justify-center items-center space-y-4">
                <Link href={"/projects/" + slug}>
                    <h2 className="text-white bg-blue-600 px-4 py-2 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                        Consulter le projet
                    </h2>
                </Link>

                <Link href={link}>
                    <h2 className="text-white bg-gray-700 px-4 py-2 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
                        GitHub
                    </h2>
                </Link>
            </div>

            <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-lg font-bold bg-black bg-opacity-60 px-3 py-1 rounded shadow-lg">
                    {title}
                </h2>
                {technologies && (
                    <div className="flex space-x-2 mt-2">
                        {technologies.map((technology) => (
                            <span key={technology} className="bg-white text-black px-2 py-1 rounded">
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

"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: undefined,
        height: undefined,
    });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export const HeroParallax = ({ products }) => {
    const firstRow = products.slice(0, 3);
    const secondRow = products.slice(3, 6);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 3], [-250, 800]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 3], [250, -750]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-600, 1000]),
        springConfig
    );

    const size = useWindowSize();
    const isSmallScreen = size.width < 1368;

    return (
        <div
            ref={ref}
            className="h-[300vh] py-60 lg:py-30 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            {isSmallScreen ? (
                <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
                    <h1 className="my-20 text-center text-4xl md:text-3xl sm:text-2xl">
                        Mes Projets
                    </h1>
                    <div className="project-grid grid grid-cols-1 gap-16 md:grid-cols-2 mt-8">
                        {products.map((product) => (
                            <SimpleProductCard product={product} key={product.title} />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <Header />
                    <motion.div
                        style={{
                            rotateX,
                            rotateZ,
                            translateY,
                            opacity,
                        }}
                        className=""
                    >
                        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-20">
                            {firstRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateX}
                                    key={product.title}
                                />
                            ))}
                        </motion.div>
                        <motion.div className="flex flex-row mb-20 space-x-10">
                            {secondRow.map((product) => (
                                <ProductCard
                                    product={product}
                                    translate={translateXReverse}
                                    key={product.title}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

const SimpleProductCard = ({ product }) => {
    return (
        <div className="flex flex-col mb-14 md:flex-col md:justify-between">
            <h2 className="mb-4 text-xl font-bold">{product.title}</h2>
            <div className="w-full md:w-full mb-4 md:mb-0">
                <Image
                    src={product.thumbnail}
                    height="400"
                    width="400"
                    className="object-cover"
                    alt={product.title}
                />
            </div>
            {product.technologies && (
                <ul className="flex flex-wrap space-x-2 mt-4">
                    {product.technologies.map((tech, index) => (
                        <li
                            key={index}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded mb-2"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                Ma liste <br /> de Projets
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
                Voici tous mes projets disponibles sur mon GitHub, je vous invite à les consulter.
            </p>
        </div>
    );
};

export const ProductCard = ({ product, translate }) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[28rem] relative flex-shrink-0"
        >
            <Image
                src={product.thumbnail}
                height="200"
                width="200"
                className="object-cover object-left-top absolute h-full w-full inset-0"
                alt={product.title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {product.title}
            </h2>
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl"
            >
                <h2 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                    Consulter le projet
                </h2>
            </Link>
            {product.technologies && (
                <ul className="absolute bottom-4 right-4 opacity-0 group-hover/product:opacity-100 text-white flex space-x-2">
                    {product.technologies.map((tech, index) => (
                        <li
                            key={index}
                            className="bg-white text-black px-2 py-1 rounded"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

export default HeroParallax;
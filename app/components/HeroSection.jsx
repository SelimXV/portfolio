"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { Button } from "./MovingBorderButton";
import { useTheme } from "@/app/context/ThemeContext";

const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className="bg-transparent py-12 md:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                <div className="col-span-7 place-self-center sm:place-self-start text-center sm:text-left relative z-10">
                    <div className="relative max-w-lg mx-auto sm:mx-0">
                        <h1 className="mb-6 text-3xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
                            <span className={`text-transparent bg-clip-text ${
                                theme === 'dark' 
                                    ? 'bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400'
                                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                            }`}>
                                Bonjour, je suis
                            </span>
                            <br />
                            <span className="inline-block overflow-hidden">
                                <TypeAnimation
                                    sequence={[
                                        "Sélim",
                                        1000,
                                        "Développeur Web",
                                        1000,
                                        "Futur Ingénieur",
                                        1000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    className="block text-3xl sm:text-4xl lg:text-5xl"
                                />
                            </span>
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 lg:text-xl max-w-md">
                            Je suis un futur développeur web fullstack passionné par la création d&apos;expériences digitales innovantes.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <Button
                                borderRadius="1.75rem"
                                className={`${
                                    theme === 'dark'
                                        ? 'bg-gradient-to-br from-blue-200 via-purple-300 to-pink-400 text-black'
                                        : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white'
                                }`}>
                                Contactez-moi
                            </Button>

                            <a
                                href="/documents/CV_Sélim.pdf"
                                download
                                className="inline-block"
                            >
                                <Button
                                    borderRadius="1.75rem"
                                    className={`${
                                        theme === 'dark'
                                            ? 'bg-transparent text-white border border-white hover:border-transparent'
                                            : 'bg-transparent text-gray-800 border border-gray-800 hover:border-transparent'
                                    }`}>
                                    Téléchargez mon CV
                                </Button>
                            </a>
                            
                            <a
                                href="/documents/Tableau_Synthese.pdf"
                                download
                                className="inline-block"
                            >
                                <Button
                                    borderRadius="1.75rem"
                                    className={`${
                                        theme === 'dark'
                                            ? 'bg-transparent text-white border border-white hover:border-transparent'
                                            : 'bg-transparent text-gray-800 border border-gray-800 hover:border-transparent'
                                    }`}>
                                    Tableau de projets
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-span-5 place-self-center mt-8 lg:mt-0 order-first sm:order-last">
                    <div className="relative">
                        <div className={`absolute -inset-0.5 rounded-full blur-2xl opacity-30 animate-pulse ${
                            theme === 'dark'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                : 'bg-gradient-to-r from-blue-300 to-purple-400'
                        }`}></div>
                        <div className={`rounded-full ${
                            theme === 'dark'
                                ? 'bg-gray-900 bg-opacity-80'
                                : 'bg-gray-100 bg-opacity-80'
                        } backdrop-blur-sm w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex justify-center items-center border ${
                            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                        } p-1`}>
                            <div className="absolute inset-2 rounded-full overflow-hidden">
                                <Image
                                    src="/images/hero-image.jpeg"
                                    alt="Portrait de Sélim"
                                    className="object-cover w-full h-full"
                                    fill
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
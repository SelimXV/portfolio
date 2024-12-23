"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { Button } from "./MovingBorderButton";

const HeroSection = () => {
    return (
        <section className="bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center">
                <div className="col-span-7 place-self-center text-center sm:text-left relative z-10">
                    <div className="relative max-w-lg mx-auto sm:mx-0">
                        <h1 className="text-white mb-4 text-3xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400">
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
                        <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
                            Je suis un futur développeur web fullstack.
                        </p>

                        <div className="flex gap-5 justify-center sm:justify-start">
                            <Button
                                borderRadius="1.75rem"
                                className="bg-gradient-to-br from-blue-200 via-purple-300 to-pink-400 text-black">
                                Contactez-moi
                            </Button>

                            <a
                                href="/documents/CV%20Alternance%20Sélim%20(1).pdf"
                                download
                            >

                                <Button
                                    borderRadius="1.75rem"
                                    className="bg-transparent text-white border border-white hover:border-transparent">
                                    Téléchargez mon CV
                                </Button>
                            </a>

                                <a
                                    href="/documents/Tableau%20Synthèse.xlsx"
                                    download
                                >
                                    <Button
                                        borderRadius="1.75rem"
                                        className="bg-transparent text-white border border-white hover:border-transparent">
                                        Téléchargez ma liste de projets
                                    </Button>
                                </a>
                        </div>
                    </div>
                </div>

                <div
                    className="col-span-5 place-self-center sm:pl-20 mt-4 lg:mt-0 flex justify-center lg:justify-end relative">
                    <div className="rounded-full bg-[#181818] bg-opacity-40 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex justify-center items-center">
                        <Image
                            src="/images/hero-image.jpeg"
                            alt="hero image"
                            className="rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            width={300}
                            height={300}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
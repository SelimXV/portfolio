"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { Button } from "./MovingBorderButton";

const HeroSection = () => {
    return (
        <section className="p-5 bg-transparent">
            <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="col-span-7 place-self-center text-center sm:text-left">
                    <h1 className="text-white mb-4 text-4xl sm:text-6xl lg:text-7xl lg:leading-normal font-extrabold">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400"> Bonjour je suis, {""} </span>
                        <br />
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
                        />
                    </h1>
                    <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl"> Je suis un futur développeur web fullstack.</p>
                    <div className="flex gap-5">
                        <Button borderRadius="1.75rem" className="bg-gradient-to-br from-blue-200 via-purple-300 to-pink-400 text-black">
                            Contactez moi
                        </Button>

                        <Button borderRadius="1.75rem" className="bg-transparent text-white border border-white hover:border-transparent">
                            Télécharger mon CV
                        </Button>
                    </div>
                </div>
                <div className="col-span-5 place-self-center pl-20 mt-4 lg:mt-0">
                    <div className="rounded-full bg-[#181818] bg-opacity-40 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                        <Image
                            src="/images/hero-image.jpeg"
                            alt="hero image"
                            className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

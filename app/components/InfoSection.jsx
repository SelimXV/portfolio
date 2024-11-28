"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava, FaC } from "react-icons/fa";
import HoverEffect from "./HoverEffect"; // Ensure correct import path

const InfoSection = () => {
    const [selectedSection, setSelectedSection] = useState("experience");

    const sections = {
        experience: {
            title: "Experience",
            items: [
                { title: "Alternant Chef de Projet", year: "2024", link: "#" },
                { title: "Stage en entreprise", year: "2023", link: "#" },
                { title: "Apprentissage Ingénieurie", year: "2022", link: "#" },
                { title: "Étudiant", year: "2021", link: "#" },
            ],
        },
        education: {
            title: "Education",
            items: [
                { title: "Lycée Charles de Gaulle Poissy", year: "2021", link: "#" },
                { title: "Prépa Intégrée Cy-Tech Cergy", year: "2022", link: "#" },
                { title: "BTS SIO SLAM 1 ENSITECH Cergy", year: "2023", link: "#" },
                { title: "BTS SIO SLAM 2 ENSITECH Cergy", year: "2024", link: "#" },
            ],
        },
        skills: {
            title: "Skills",
            items: [
                { icon: <FaHtml5 />, title: "HTML5", description: "Markup language for web pages", link: "#" },
                { icon: <FaCss3Alt />, title: "CSS3", description: "Style sheet language for styling", link: "#" },
                { icon: <FaReact />, title: "React", description: "JavaScript library for building UIs", link: "#" },
                { icon: <FaNodeJs />, title: "Node.js", description: "JavaScript runtime built on Chrome's V8", link: "#" },
                { icon: <FaJava />, title: "Java", description: "High-level programming language", link: "#" },
                { icon: <FaC />, title: "C", description: "General-purpose programming language", link: "#" },
            ],
        },
        about: {
            title: "About Me",
            description: "Passionné par le développement web, j'aime travailler sur des projets créatifs et innovants.",
            details: [
                { label: "Name", value: "Sélim Khalfane" },
                { label: "Phone", value: "0664954224" },
                { label: "Experience", value: "2 ans" },
                { label: "Discord", value: "selimbms" },
                { label: "Nationality", value: "French" },
                { label: "Email", value: "selikhal@hotmail.fr" },
                { label: "Freelance", value: "Available" },
                { label: "Languages", value: "English, Spanish" },
            ],
        },
    };

    const renderContent = () => {
        const section = sections[selectedSection];

        if (selectedSection === "about") {
            return (
                <div className="bg-transparent p-4 rounded-2xl border border-blue-500">
                    <h2 className="text-4xl font-bold mb-4 text-white">{section.title}</h2>
                    <p className="text-gray-300 mb-8">{section.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {section.details.map((detail, index) => (
                            <div key={index} className="text-white">
                                <p className="text-gray-400">{detail.label}</p>
                                <p className="font-semibold">{detail.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <HoverEffect
                items={section.items.map(item => ({
                    title: item.title,
                    description: selectedSection === "skills" ? item.description : item.year,
                    icon: item.icon,
                    link: item.link
                }))}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4"
            />
        );
    };

    return (
        <section id="info-section" className="flex flex-col md:flex-row gap-8 p-8 bg-transparent rounded-lg shadow-lg border border-blue-500">
            <div className="flex flex-col space-y-4">
                {Object.keys(sections).map((sectionKey) => (
                    <button
                        key={sectionKey}
                        onClick={() => setSelectedSection(sectionKey)}
                        className={`py-3 px-6 text-lg rounded-lg transition-all duration-300 ${
                            selectedSection === sectionKey
                                ? "bg-green-500 text-black font-semibold"
                                : "bg-transparent text-white hover:bg-gray-700 border-2 border-gray-500 hover:border-green-500"
                        }`}
                    >
                        {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
                    </button>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 text-center"
            >
                {renderContent()}
            </motion.div>
        </section>
    );
};

export default InfoSection;
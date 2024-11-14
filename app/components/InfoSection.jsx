"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaNodeJs, FaCss3Alt, FaHtml5 } from 'react-icons/fa';

const InfoSection = () => {
    const [selectedSection, setSelectedSection] = useState("experience");

    const sections = {
        experience: {
            title: "Experience",
            items: [
                { title: "Développeur Junior", year: "2023" },
                { title: "Stage en entreprise", year: "2022" },
                { title: "Développeur Web", year: "2021" },
                { title: "Développeur Frontend", year: "2020" },
            ],
        },
        education: {
            title: "Education",
            items: [
                { title: "Lycée Example", year: "2021" },
                { title: "Université Example", year: "2022" },
            ],
        },
        skills: {
            title: "Skills",
            items: [
                { icon: <FaHtml5 />, title: "HTML5" },
                { icon: <FaCss3Alt />, title: "CSS3" },
                { icon: <FaReact />, title: "React" },
                { icon: <FaNodeJs />, title: "Node.js" },
                { icon: <FaJava />, title: "Java" },
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
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-white">{section.title}</h2>
                    <p className="text-gray-400 mb-8">{section.description}</p>
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
        } else {
            return (
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-white">{section.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                        {section.items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 border-2 border-gray-500 rounded-lg hover:border-green-500 transition-all duration-300 transform hover:scale-105"
                            >
                                {selectedSection === "skills" ? (
                                    <div className="flex flex-col items-center">
                                        <div className="text-5xl mb-3 text-green-500">{item.icon}</div>
                                        <span className="text-white font-medium">{item.title}</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="year text-green-500 text-lg font-bold">{item.year}</div>
                                        <div className="title text-white text-md mt-2">{item.title}</div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 bg-transparent rounded-lg shadow-lg">
            {/* Boutons */}
            <div className="flex flex-col space-y-4">
                {["experience", "education", "skills", "about"].map((section) => (
                    <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`py-3 px-6 text-lg rounded-lg transition-all duration-300 
                            ${selectedSection === section ? 'bg-green-500 text-black font-semibold' : 'bg-transparent text-white hover:bg-gray-700 border-2 border-gray-500 hover:border-green-500'}`}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>

            {/* Contenu */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 text-center"
            >
                {renderContent()}
            </motion.div>
        </div>
    );
};

export default InfoSection;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaJava, 
         FaGraduationCap, FaBriefcase, FaUser, FaCode, FaTerminal } from "react-icons/fa";
import { useTheme } from "@/app/context/ThemeContext";

const InfoSection = () => {
    const [selectedSection, setSelectedSection] = useState("experience");
    const { theme } = useTheme();

    const sections = {
        experience: {
            icon: <FaBriefcase className="text-blue-400 text-2xl" />,
            title: "Expérience",
            items: [
                { 
                    title: "Alternant Chef de Projet", 
                    year: "2024", 
                    company: "Jennyfer",
                    description: "Mise en place de projets web, gestion d'équipe, développement d'applications internes",
                    link: "#" 
                },
                { 
                    title: "Stage en entreprise", 
                    year: "2023", 
                    company: "Web Agency",
                    description: "Intégration de maquettes, développement front-end, travail avec des APIs",
                    link: "#" 
                },
                { 
                    title: "Apprentissage Ingénieurie", 
                    year: "2022", 
                    company: "Cy-Tech Cergy",
                    description: "Projets académiques, développement logiciel, conception algorithmique",
                    link: "#" 
                },
                { 
                    title: "Étudiant", 
                    year: "2021", 
                    company: "Lycée Charles de Gaulle",
                    description: "Projets informatiques, mathématiques appliquées, introduction au développement",
                    link: "#" 
                },
            ],
        },
        education: {
            icon: <FaGraduationCap className="text-purple-400 text-2xl" />,
            title: "Formation",
            items: [
                { 
                    title: "BTS SIO SLAM 2", 
                    year: "2024", 
                    institution: "ENSITECH Cergy",
                    description: "Spécialisation en développement d'applications, projets d'entreprise, création de solutions web",
                    link: "#" 
                },
                { 
                    title: "BTS SIO SLAM 1", 
                    year: "2023", 
                    institution: "ENSITECH Cergy",
                    description: "Conception et développement d'applications, bases de données, programmation orientée objet",
                    link: "#" 
                },
                { 
                    title: "Prépa Intégrée", 
                    year: "2022", 
                    institution: "Cy-Tech Cergy",
                    description: "Mathématiques avancées, algorithmique, programmation, introduction à l'ingénierie",
                    link: "#" 
                },
                { 
                    title: "Baccalauréat", 
                    year: "2021", 
                    institution: "Lycée Charles de Gaulle Poissy",
                    description: "Spécialité mathématiques et numérique, projets informatiques",
                    link: "#" 
                },
            ],
        },
        skills: {
            icon: <FaCode className="text-green-400 text-2xl" />,
            title: "Compétences",
            items: [
                { icon: <FaHtml5 className="text-orange-500 text-4xl" />, title: "HTML5", description: "Création de pages web structurées, sémantique avancée, formulaires interactifs", level: 90 },
                { icon: <FaCss3Alt className="text-blue-500 text-4xl" />, title: "CSS3", description: "Design responsive, animations, Flexbox et Grid, variables CSS", level: 85 },
                { icon: <FaReact className="text-blue-400 text-4xl" />, title: "React", description: "Développement de composants, hooks, context API, intégration d'APIs", level: 80 },
                { icon: <FaNodeJs className="text-green-600 text-4xl" />, title: "Node.js", description: "APIs RESTful, authentication, middlewares, MongoDB, Express", level: 75 },
                { icon: <FaJava className="text-red-500 text-4xl" />, title: "Java", description: "Programmation orientée objet, applications desktop, Spring Boot", level: 70 },
                { icon: <FaTerminal className="text-gray-300 text-4xl" />, title: "C", description: "Programmation procédurale, algorithms, structures de données", level: 65 },
            ],
        },
        about: {
            icon: <FaUser className="text-pink-400 text-2xl" />,
            title: "À Propos",
            description: "Passionné par le développement web et les nouvelles technologies, je crée des expériences numériques innovantes. En alternance comme Chef de Projet chez Jennyfer, je continue d'approfondir mes compétences en programmation tout en développant une vision stratégique des projets web.",
            details: [
                { label: "Nom", value: "Sélim Khalfane" },
                { label: "Téléphone", value: "0664954224" },
                { label: "Expérience", value: "Apprenti" },
                { label: "Discord", value: "selimbms" },
                { label: "Nationalité", value: "Française" },
                { label: "Email", value: "selikhal@hotmail.fr" },
                { label: "Entreprise", value: "Jennyfer" },
                { label: "Langues", value: "Anglais, Espagnol" },
            ],
        },
    };

    // Variants pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const renderContent = () => {
        const section = sections[selectedSection];

        if (selectedSection === "about") {
            return (
                <motion.div 
                    className={`
                        ${theme === 'dark' 
                            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/30 shadow-blue-500/20' 
                            : 'bg-gradient-to-br from-gray-50 to-white border border-blue-200/30 shadow-blue-200/10'
                        } p-8 rounded-2xl shadow-lg
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-left mb-8">
                        <h2 className={`text-4xl font-bold mb-6 text-transparent bg-clip-text ${
                                theme === 'dark' 
                                    ? 'bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400'
                                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                            }`}>
                            {section.title}
                        </h2>
                        <p className="dark:text-gray-300 text-gray-700 text-lg leading-relaxed mb-8">{section.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 gap-6">
                                {section.details.slice(0, 4).map((detail, index) => (
                                    <motion.div 
                                        key={index} 
                                        className={`
                                            ${theme === 'dark' 
                                                ? 'text-white bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' 
                                                : 'text-gray-800 bg-gray-100/50 border border-gray-300 hover:border-blue-500/30'
                                            } p-4 rounded-lg transition-all duration-300
                                        `}
                                        whileHover={{ scale: 1.02, borderColor: theme === 'dark' ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)" }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <p className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} text-sm mb-1`}>{detail.label}</p>
                                        <p className="font-semibold text-lg">{detail.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 gap-6">
                                {section.details.slice(4).map((detail, index) => (
                                    <motion.div 
                                        key={index + 4} 
                                        className={`
                                            ${theme === 'dark' 
                                                ? 'text-white bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' 
                                                : 'text-gray-800 bg-gray-100/50 border border-gray-300 hover:border-blue-500/30'
                                            } p-4 rounded-lg transition-all duration-300
                                        `}
                                        whileHover={{ scale: 1.02, borderColor: theme === 'dark' ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)" }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (index + 4) * 0.1 }}
                                    >
                                        <p className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} text-sm mb-1`}>{detail.label}</p>
                                        <p className="font-semibold text-lg">{detail.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        } else if (selectedSection === "skills") {
            return (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {section.items.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`
                                ${theme === 'dark' 
                                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500/30' 
                                    : 'bg-gradient-to-br from-gray-50 to-white border border-gray-300 hover:border-blue-500/20'
                                } p-6 rounded-xl shadow-lg transition-all duration-300
                            `}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {skill.icon}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{skill.title}</h3>
                                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>{skill.description}</p>
                                
                                <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2.5 mb-4`}>
                                    <motion.div 
                                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    ></motion.div>
                                </div>
                                <p className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} text-xs font-semibold`}>{skill.level}%</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            );
        } else {
            return (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                >
                    {section.items.map((item, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className={`
                                ${theme === 'dark' 
                                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500/30' 
                                    : 'bg-gradient-to-br from-gray-50 to-white border border-gray-300 hover:border-blue-500/20'
                                } p-6 rounded-xl shadow-lg transition-all duration-300
                            `}
                            whileHover={{ scale: 1.02, x: 5 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="md:w-1/4 mb-4 md:mb-0">
                                    <div className={`${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100/60'} inline-block p-3 rounded-lg`}>
                                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                            {item.year}
                                        </h3>
                                        <p className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} text-sm`}>
                                            {selectedSection === "education" ? item.institution : item.company}
                                        </p>
                                    </div>
                                </div>
                                <div className={`md:w-3/4 md:pl-6 ${theme === 'dark' ? 'border-l border-gray-700' : 'border-l border-gray-300'}`}>
                                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>{item.title}</h3>
                                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{item.description}</p>
                                    <Link 
                                        href={item.link} 
                                        className={`inline-flex items-center px-4 py-2 ${
                                            theme === 'dark'
                                                ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/40'
                                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                            } text-sm rounded-lg transition-colors duration-300`}
                                    >
                                        En savoir plus
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            );
        }
    };

    return (
        <section id="info-section" className="py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text ${
                        theme === 'dark' 
                            ? 'bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400'
                            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                        } mb-4`}>
                        Mon Parcours
                    </h2>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                        Découvrez mon expérience, mes formations et mes compétences techniques dans le domaine du développement web et de la gestion de projet.
                    </p>
                </div>

                <div className={`${
                    theme === 'dark' 
                        ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800' 
                        : 'bg-gray-50/50 backdrop-blur-sm border border-gray-200'
                    } p-8 rounded-2xl shadow-xl`}>
                    <div className="flex flex-wrap mb-12 justify-center md:justify-start gap-4">
                        {Object.keys(sections).map((sectionKey) => {
                            const section = sections[sectionKey];
                            return (
                                <motion.button
                                    key={sectionKey}
                                    onClick={() => setSelectedSection(sectionKey)}
                                    className={`
                                        py-3 px-5 rounded-xl flex items-center gap-3 transition-all duration-300
                                        ${selectedSection === sectionKey
                                            ? theme === 'dark'
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-600/20"
                                                : "bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/10"
                                            : theme === 'dark'
                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50"
                                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300 hover:border-blue-400/30"
                                        }
                                    `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {section.icon}
                                    <span>{section.title}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import NavLink from "@/app/components/NavLink";
import MenuOverlay from "@/app/components/MenuOverlay";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

const navLinks = [
    {
        title: "À Propos",
        href: "#info-section",
    },
    {
        title: "Projets",
        href: "#projects-section",
    },
    {
        title: "Contact",
        href: "#contact",
    },
];

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (
        <motion.nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" 
                    : "bg-transparent"
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-200 dark:via-purple-300 dark:to-pink-400 font-bold">
                    Sélim
                </Link>
                
                <div className="flex items-center">
                    {/* Bouton de bascule du thème */}
                    <button
                        onClick={toggleTheme}
                        className="rounded-full p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </button>
                    
                    {/* Menu mobile */}
                    <div className="mobile-menu block md:hidden">
                        {!navbarOpen ? (
                            <button 
                                onClick={() => setNavbarOpen(true)} 
                                className="border rounded-lg border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center px-3 py-2 transition-all duration-200"
                                aria-label="Ouvrir le menu"
                            >
                                <Bars3Icon className="h-5 w-5" />
                            </button>
                        ) : (
                            <button 
                                onClick={() => setNavbarOpen(false)} 
                                className="border rounded-lg border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center px-3 py-2 transition-all duration-200"
                                aria-label="Fermer le menu"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Menu desktop */}
                <div className="menu hidden md:block md:w-auto" id="navbar">
                    <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                <NavLink href={link.href} title={link.title} />
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {navbarOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <MenuOverlay links={navLinks} />
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
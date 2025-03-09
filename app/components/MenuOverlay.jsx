"use client";
import React from "react";
import NavLink from "@/app/components/NavLink";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/app/context/ThemeContext";

const MenuOverlay = ({links}) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-8 shadow-md">
            <ul className="flex flex-col items-center gap-5 text-lg">
                {links.map((link, index) => (
                    <motion.li 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full text-center"
                    >
                        <NavLink href={link.href} title={link.title} />
                    </motion.li>
                ))}
                
                {/* Bouton de thème à la fin du menu */}
                <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: links.length * 0.1 + 0.1 }}
                    className="w-full flex justify-center mt-2"
                >
                    <button
                        onClick={toggleTheme}
                        className="rounded-full p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <>
                                <SunIcon className="h-6 w-6" />
                                <span>Mode Clair</span>
                            </>
                        ) : (
                            <>
                                <MoonIcon className="h-6 w-6" />
                                <span>Mode Sombre</span>
                            </>
                        )}
                    </button>
                </motion.li>
            </ul>
        </div>
    );
}

export default MenuOverlay;
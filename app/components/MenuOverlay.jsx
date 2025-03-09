"use client";
import React from "react";
import NavLink from "@/app/components/NavLink";
import { motion } from "framer-motion";

const MenuOverlay = ({links}) => {
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
            </ul>
        </div>
    );
}

export default MenuOverlay;
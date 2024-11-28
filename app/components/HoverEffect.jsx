import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HoverEffect = ({ items, className }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className || ""}`}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative group block h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {/* Effet de fond animé */}
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.div
                                className="absolute inset-0 bg-neutral-800 rounded-2xl z-10"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Carte avec titre et description */}
                    <Card className="relative z-20">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description || "No description available."}</CardDescription>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card = ({ className, children }) => (
    <div
        className={`rounded-2xl bg-transparent p-4 shadow-lg border border-blue-600 group-hover:border-white transition duration-300 ${className}`}
    >
        {children}
    </div>
);

export const CardTitle = ({ className, children }) => (
    <h4 className={`text-white text-lg font-semibold ${className}`}>{children}</h4>
);

export const CardDescription = ({ className, children }) => (
    <p className={`text-gray-400 mt-2 ${className}`}>{children}</p>
);

export default HoverEffect;

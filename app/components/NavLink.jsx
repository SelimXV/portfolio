"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const NavLink = ({ href, title }) => {
    const [isActive, setIsActive] = useState(false);
    const { theme } = useTheme();
    
    useEffect(() => {
        const handleScroll = () => {
            // Check if the link is to a section on the current page
            if (href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    setIsActive(rect.top <= 100 && rect.bottom >= 100);
                }
            } else {
                // For non-hash links, check if current pathname matches
                setIsActive(window.location.pathname === href);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [href]);
    
    return (
        <Link 
            href={href} 
            className={`
                relative group px-2 py-1 md:text-lg transition-colors duration-300
                ${isActive 
                    ? theme === 'dark' ? "text-white font-semibold" : "text-blue-700 font-semibold"
                    : theme === 'dark' ? "text-gray-400 hover:text-blue-300" : "text-gray-600 hover:text-blue-600"}
            `}
        >
            {title}
            <span 
                className={`
                    absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
            />
        </Link>
    );
}

export default NavLink;
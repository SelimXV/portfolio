"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "@/app/components/NavLink";
import MenuOverlay from "@/app/components/MenuOverlay";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
    {
        title: "A Propos",
        href: "#info-section",
    },
    {
        title: "Projets",
        href: "/projects/ProjectCard",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="flex flex-wrap items-center justify-between mx-auto px-6 py-4">
                <Link href="/" className="text-2xl md:text-3xl text-white font-semibold">Sélim</Link>
                <div className="mobile-menu block md:hidden">
                    {!navbarOpen ? (
                        <button onClick={() => setNavbarOpen(true)} className="border rounded border-slate-200 hover:border-white hover:text-white flex items-center px-3 py-2">
                            <Bars3Icon className="h-5 w-5" />
                        </button>
                    ) : (
                        <button onClick={() => setNavbarOpen(false)} className="border rounded border-slate-200 hover:border-white hover:text-white flex items-center px-3 py-2">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <div className="menu hidden md:block md:w-auto" id="navbar">
                    <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink href={link.href} title={link.title} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
        </nav>
    );
};

export default Navbar;
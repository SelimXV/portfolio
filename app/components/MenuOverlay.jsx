import React from "react";
import NavLink from "@/app/components/NavLink";

const MenuOverlay = ({links}) => {
    return (
        <ul className='flex flex-col bg-[#121212] bg-opacity-100 py-4 items-center text-lg '>{links.map((link, index) => (
            <li key={index}>
            <NavLink href={link.href} title={link.title} />
            </li>
        ))}
        </ul>

    )
}
export default MenuOverlay;
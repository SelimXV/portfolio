// src/app/components/ProjectList.js
"use client";

import { useEffect } from "react";

function ProjectList({ projects }) {
    useEffect(() => {
        console.log(projects);
    }, [projects]);

    return (
        <div>
            {/* Render projects here */}
        </div>
    );
}

export default ProjectList;

// fetchproject.js
import client from "@/app/contentful/client";

export const fetchProject = async () => {
    const entries = await client.getEntries({
        content_type: "project",
    });

    return entries.items;
}

export default fetchProject;

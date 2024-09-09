import fetchProject from "@/app/contentful/fetchproject";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
    const project = await fetchProject();
    const currentProject = project.find(
        (project) => project.fields.slug === params.slug
    );

    if (!currentProject) {
        return <div>404</div>;
    }

    const { title, technologies, thumbnail, link, featuredImage, method } =
        currentProject.fields;

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl md:text-5xl font-bold dark:text-white mb-8">{title}</h1>

            <div className="flex justify-center items-center mb-8">
                <div className="group relative w-full max-w-md lg:max-w-lg">
                    <Image
                        src={"https:" + thumbnail.fields.file.url}
                        width={thumbnail.fields.file.details.image.width}
                        height={thumbnail.fields.file.details.image.height}
                        className="object-cover rounded-lg"
                        alt={title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                        <Link href={link} className="text-white text-xl font-semibold">Voir le projet</Link>
                    </div>
                </div>
            </div>

            <div className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                {documentToReactComponents(method)}
            </div>

            {technologies && (
                <div className="flex justify-center space-x-4 mt-8">
                    {technologies.map((technology) => (
                        <span key={technology} className="bg-gray-200 text-black px-3 py-1 rounded-lg text-sm font-medium">
              {technology}
            </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Page;

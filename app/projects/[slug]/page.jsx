import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BackgroundBeams from "@/app/components/background-beams";
import { fetchProject } from "@/app/contentful/fetchproject";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { FaGithub, FaArrowLeft } from "react-icons/fa";

const renderOptions = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="mb-6 leading-relaxed text-gray-300">{children}</p>
        ),

        [BLOCKS.HEADING_1]: (node, children) => (
            <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (node, children) => (
            <h2 className="text-2xl font-semibold mb-5 text-white">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="text-xl font-medium mb-4 text-blue-300">{children}</h3>
        ),
        
        [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="list-disc ml-5 mb-6 text-gray-300 space-y-2">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="list-decimal ml-5 mb-6 text-gray-300 space-y-2">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="mb-2">{children}</li>
        ),
        
        [INLINES.HYPERLINK]: (node, children) => (
            <a
                href={node.data.uri}
                className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};

const Page = async ({ params }) => {
    const projects = await fetchProject();
    const currentProject = projects.find(
        (project) => project.fields.slug === params.slug
    );

    if (!currentProject) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#121212]">
                <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
                <p className="text-gray-300 mb-8">Le projet que vous recherchez n&apos;existe pas.</p>
                <Link 
                    href="/" 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                    <FaArrowLeft />
                    <span>Retour à l&apos;accueil</span>
                </Link>
            </div>
        );
    }

    const { title, technologies, thumbnail, link, featuredImage, method, description } = currentProject.fields;

    return (
        <div className="flex min-h-screen flex-col bg-[#121212] overflow-x-hidden">
            <BackgroundBeams className="fixed z-0"/>
            <Navbar />
            
            <div className="relative z-10 pt-24 md:pt-32 pb-16">
                <div className="container max-w-4xl mx-auto px-4 md:px-8">
                    {/* Lien retour */}
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-300 mb-8 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Retour aux projets</span>
                    </Link>
                    
                    {/* En-tête du projet */}
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400 mb-4">
                        {title}
                    </h1>
                    
                    {/* Technologies utilisées */}
                    {technologies && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {technologies.map((technology) => (
                                <span key={technology} className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm font-medium">
                                    {technology}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Image principale */}
                    <div className="relative w-full mb-12 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative bg-gray-900 p-1 rounded-lg">
                            <Image
                                src={"https:" + thumbnail.fields.file.url}
                                width={thumbnail.fields.file.details.image.width}
                                height={thumbnail.fields.file.details.image.height}
                                className="w-full rounded-lg shadow-lg object-cover"
                                alt={title}
                            />
                        </div>
                    </div>

                    {/* Description & méthode */}
                    <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl mb-12">
                        {description && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-300 to-pink-400">
                                    &Agrave; propos du projet
                                </h2>
                                <p className="text-gray-300">{description}</p>
                            </div>
                        )}
                        
                        <div className="prose prose-invert max-w-none">
                            {documentToReactComponents(method, renderOptions)}
                        </div>
                    </div>

                    {/* Bouton de lien vers GitHub/projet live */}
                    <div className="flex justify-center">
                        <Link 
                            href={link} 
                            target="_blank" 
                            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                        >
                            <FaGithub className="text-xl" />
                            <span>Voir le code source</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

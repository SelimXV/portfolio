import fetchProject from "@/app/contentful/fetchproject";

const Page = async ({params}) => {

    const project = await fetchProject();
    const currentProject = project.find((project) => project.fields.slug === params.slug);


    return (
        <div>
           <h1>Caca</h1>
        </div>
    );
};

export default Page;

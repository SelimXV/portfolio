import {createClient} from "contentful";
const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: "SswhkEjWY1EO5_kdSRTKgA3WbWdIvF8N5t_hbpEc7Z4",
});
export default client;


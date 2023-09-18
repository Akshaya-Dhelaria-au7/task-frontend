import { defaultConnector as connector } from "./https";

async function createComment(values) {
    const { data } = await connector.post('/comments/create', { data: values })
    return data;
}

export {
    createComment
}
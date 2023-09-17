import { defaultConnector as connector } from "./https";

async function getComment(taskId) {
    const { data } = await connector.get(`/comments/getComments/${taskId}`)
    return data
}

async function createComment(values) {
    const { data } = await connector.post('/comments/create', { data: values })
    return data;
}

export {
    getComment,
    createComment
}
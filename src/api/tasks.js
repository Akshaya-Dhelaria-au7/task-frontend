import { defaultConnector as connector } from "./https";

async function createTaskApi(values) {
    const res = await connector.post('/create', { data: values })
    return res;
}

async function listTasksApi() {
    const { data } = await connector.get('/getTaskList')
    return data
}

async function editTasksApi(values) {
    const { data } = await connector.put('/editTaskList', { data: values })
    return data
}

async function deleteTaskApi(id) {
    const { data } = await connector.delete(`/deleteTaskList/${id}`)
    return data
}

export {
    createTaskApi,
    listTasksApi,
    editTasksApi,
    deleteTaskApi
}
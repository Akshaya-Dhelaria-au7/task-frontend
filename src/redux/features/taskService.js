import http from '../../api/https'

const getAll = async () => {
    const { data } = await http.get('/getTaskList')
    return data
}

const create = async (body) => {
    const { data } = await http.post('/create', body)
    return data
}

async function filterTask(values) {
    const { data } = await http.post('/getFilteredTask', { data: values })
    return data
}

async function searchTasks(values) {
    const { data } = await http.post('/searchTask', { data: values });
    return { data };
}

const taskService = {
    getAll,
    create,
    filterTask,
    searchTasks
}

export default taskService

import http from '../../api/https'

const getAll = async (taskId) => {
    const { data } = await http.get(`/comments/getComments/${taskId}`)
    return data
}

const commentService = {
    getAll
}

export default commentService

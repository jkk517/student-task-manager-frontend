import axiosInstance from './axiosInstance'

export const getTasks = () => {
  return axiosInstance.get('/tasks')
}

export const getTaskById = (id) => {
  return axiosInstance.get(`/tasks/${id}`)
}

export const createTask = (task) => {
  return axiosInstance.post('/tasks', task)
}

export const updateTask = (id, task) => {
  return axiosInstance.put(`/tasks/${id}`, task)
}

export const deleteTask = (id) => {
  return axiosInstance.delete(`/tasks/${id}`)
}

export const markTaskCompleted = (id) => {
  return axiosInstance.patch(`/tasks/${id}/complete`)
}

export const searchTasksByTitle = (title) => {
  return axiosInstance.get(`/tasks/search`, { params: { title } })
}

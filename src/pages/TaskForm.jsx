import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, getTaskById, updateTask } from '../api/taskApi'

function TaskForm() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
    status: 'PENDING'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditMode) {
      loadTask()
    }
  }, [id])

  const loadTask = async () => {
    try {
      const res = await getTaskById(id)
      const task = res.data
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        dueDate: task.dueDate || '',
        status: task.status
      })
    } catch (err) {
      console.error('Failed to load task', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isEditMode) {
        await updateTask(id, formData)
      } else {
        await createTask(formData)
      }
      navigate('/tasks')
    } catch (err) {
      console.error('Save failed', err)
      setError('Could not save the task. Please check the form and try again.')
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-body">
          <h4 className="card-title mb-4">{isEditMode ? 'Edit Task' : 'Add New Task'}</h4>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-control"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {isEditMode && (
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {isEditMode ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskForm

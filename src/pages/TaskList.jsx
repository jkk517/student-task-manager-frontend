import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTasks, deleteTask, markTaskCompleted, searchTasksByTitle } from '../api/taskApi'
import TaskCard from '../components/TaskCard'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch (err) {
      console.error('Failed to load tasks', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      fetchTasks()
      return
    }

    try {
      const res = await searchTasksByTitle(searchTerm)
      setTasks(res.data)
    } catch (err) {
      console.error('Search failed', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      await deleteTask(id)
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const handleComplete = async (id) => {
    try {
      const res = await markTaskCompleted(id)
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)))
    } catch (err) {
      console.error('Marking complete failed', err)
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Tasks</h3>
        <Link to="/tasks/new" className="btn btn-primary btn-sm">+ Add Task</Link>
      </div>

      <form className="d-flex mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-primary">Search</button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted">No tasks found. Try adding one!</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} onComplete={handleComplete} />
        ))
      )}
    </div>
  )
}

export default TaskList

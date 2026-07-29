import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTasks } from '../api/taskApi'
import { AuthContext } from '../context/AuthContext'

function Dashboard() {
  const { username } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch (err) {
      console.error('Failed to load tasks', err)
    } finally {
      setLoading(false)
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED').length
  const pendingTasks = totalTasks - completedTasks
  const highPriorityTasks = tasks.filter((t) => t.priority === 'HIGH' && t.status !== 'COMPLETED').length

  return (
    <div className="container">
      <h3 className="mb-4">Welcome back, {username}!</h3>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total Tasks</h6>
                  <h3>{totalTasks}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Completed</h6>
                  <h3 className="text-success">{completedTasks}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Pending</h6>
                  <h3 className="text-warning">{pendingTasks}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">High Priority (open)</h6>
                  <h3 className="text-danger">{highPriorityTasks}</h3>
                </div>
              </div>
            </div>
          </div>

          <Link to="/tasks/new" className="btn btn-primary me-2">+ Add New Task</Link>
          <Link to="/tasks" className="btn btn-outline-secondary">View All Tasks</Link>
        </>
      )}
    </div>
  )
}

export default Dashboard

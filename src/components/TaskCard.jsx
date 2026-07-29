import { Link } from 'react-router-dom'

function TaskCard({ task, onDelete, onComplete }) {
  const isCompleted = task.status === 'COMPLETED'

  return (
    <div className={`card task-card mb-3 shadow-sm ${isCompleted ? 'completed' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="task-title card-title">{task.title}</h5>
          <span className={`badge priority-badge-${task.priority}`}>{task.priority}</span>
        </div>

        <p className="card-text text-muted">{task.description || 'No description added.'}</p>

        <p className="mb-1"><small>Due date: {task.dueDate || 'Not set'}</small></p>
        <p className="mb-3"><small>Status: {task.status}</small></p>

        <div className="d-flex gap-2">
          {!isCompleted && (
            <button className="btn btn-success btn-sm" onClick={() => onComplete(task.id)}>
              Mark Completed
            </button>
          )}
          <Link className="btn btn-outline-primary btn-sm" to={`/tasks/edit/${task.id}`}>
            Edit
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// bootstrap css and our own overrides
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

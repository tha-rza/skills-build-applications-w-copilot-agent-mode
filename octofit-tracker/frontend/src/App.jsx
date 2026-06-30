import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { getCodespaceApiHost } from './api.js'
import './App.css'

function App() {
  const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
  const normalizedCodespaceName =
    typeof rawCodespaceName === 'string' && rawCodespaceName.trim()
      ? rawCodespaceName.trim().toLowerCase()
      : ''
  const isCodespaceNameValid =
    normalizedCodespaceName && normalizedCodespaceName !== 'undefined' && normalizedCodespaceName !== 'null'
  const displayCodespaceName = isCodespaceNameValid ? rawCodespaceName.trim() : null
  const apiHost = getCodespaceApiHost()

  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/activities">
            Octofit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="alert alert-info">
          API host: <strong>{apiHost}</strong>
          <br />
          {displayCodespaceName
            ? `Requests use the Codespace '${displayCodespaceName}'.`
            : 'VITE_CODESPACE_NAME is unset or invalid; falling back to localhost.'}
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <div className="alert alert-warning">
                Page not found. Choose a page from the navigation menu.
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

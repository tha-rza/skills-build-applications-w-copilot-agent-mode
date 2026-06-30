import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const getWorkoutsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedName = typeof codespaceName === 'string' ? codespaceName.trim() : '';
  const host =
    normalizedName && !['undefined', 'null'].includes(normalizedName.toLowerCase())
      ? `https://${normalizedName}-8000.app.github.dev`
      : 'http://localhost:8000';
  return `${host}/api/workouts/`;
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = getWorkoutsApiUrl();
    fetch(url)
      .then((response) => response.json())
      .then((payload) => {
        setWorkouts(Array.isArray(payload) ? payload : normalizeResponse(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Unable to load workouts');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">Loaded from <code>/api/workouts/</code>.</p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-warning">No workouts found.</div>
      )}
      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Recommended For</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || workout.title}>
                  <td>{workout.title || workout.name || 'Workout'}</td>
                  <td>{workout.difficulty || workout.level || '—'}</td>
                  <td>{Array.isArray(workout.recommendedFor) ? workout.recommendedFor.length : workout.recommendedFor ? 1 : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;

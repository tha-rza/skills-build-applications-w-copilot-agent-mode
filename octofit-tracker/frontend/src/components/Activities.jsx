import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = getApiUrl('activities');
    fetch(url)
      .then((response) => response.json())
      .then((payload) => {
        setActivities(Array.isArray(payload) ? payload : normalizeResponse(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Unable to load activities');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">Loaded from <code>/api/activities/</code>.</p>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-warning">No activities found.</div>
      )}
      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || activity.performedAt || JSON.stringify(activity)}>
                  <td>{new Date(activity.performedAt || activity.date || activity.createdAt).toLocaleString()}</td>
                  <td>{activity.user?.name || activity.user || 'Unknown'}</td>
                  <td>{activity.team?.name || activity.team || '—'}</td>
                  <td>{activity.type || activity.activityType || '—'}</td>
                  <td>{activity.duration || activity.minutes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;

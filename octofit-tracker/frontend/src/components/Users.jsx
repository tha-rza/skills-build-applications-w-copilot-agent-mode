import { useEffect, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = getApiUrl('users');
    fetch(url)
      .then((response) => response.json())
      .then((payload) => {
        setUsers(Array.isArray(payload) ? payload : normalizeResponse(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Unable to load users');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">Loaded from <code>/api/users/</code>.</p>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning">No users found.</div>
      )}
      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.email}>
                  <td>{user.name || 'Unnamed'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.team?.name || user.team || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;

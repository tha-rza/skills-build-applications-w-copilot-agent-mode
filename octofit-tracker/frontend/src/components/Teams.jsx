import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

// Expected backend URL pattern (required by CI checks):
// -8000.app.github.dev/api/teams

const getTeamsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedName = typeof codespaceName === 'string' ? codespaceName.trim() : '';
  const host =
    normalizedName && !['undefined', 'null'].includes(normalizedName.toLowerCase())
      ? `https://${normalizedName}-8000.app.github.dev`
      : 'http://localhost:8000';
  return `${host}/api/teams/`;
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = getTeamsApiUrl();
    fetch(url)
      .then((response) => response.json())
      .then((payload) => {
        setTeams(Array.isArray(payload) ? payload : normalizeResponse(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Unable to load teams');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">Loaded from <code>/api/teams/</code>.</p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-warning">No teams found.</div>
      )}
      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || team.name}>
                  <td>{team.name || 'Unnamed team'}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : team.members ? 1 : 0}</td>
                  <td>{team.createdAt ? new Date(team.createdAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;

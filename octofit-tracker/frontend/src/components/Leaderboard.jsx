import { useEffect, useState } from 'react';
import { normalizeResponse } from '../api.js';

const getLeaderboardApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedName = typeof codespaceName === 'string' ? codespaceName.trim() : '';
  const host =
    normalizedName && !['undefined', 'null'].includes(normalizedName.toLowerCase())
      ? `https://${normalizedName}-8000.app.github.dev`
      : 'http://localhost:8000';
  return `${host}/api/leaderboard/`;
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = getLeaderboardApiUrl();
    fetch(url)
      .then((response) => response.json())
      .then((payload) => {
        setEntries(Array.isArray(payload) ? payload : normalizeResponse(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Unable to load leaderboard');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">Loaded from <code>/api/leaderboard/</code>.</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-warning">No leaderboard entries found.</div>
      )}
      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id || entry.id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.user?.name || entry.user || 'Unknown'}</td>
                  <td>{entry.team?.name || entry.team || '—'}</td>
                  <td>{entry.points ?? entry.score ?? '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getUser } from '../api.js';
import SubmissionCard from '../components/SubmissionCard.jsx';

export default function Dashboard() {
  const user = getUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.mySubmissions(), api.listSubmissions(), api.myReviews()])
      .then(([mine, others, reviews]) =>
        setData({ mine: mine.submissions, others: others.submissions, ...reviews })
      )
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="alert">{error}</div>;
  if (!data) return <p className="muted">Loading…</p>;

  const waiting = data.others.filter((s) => !s.reviewed_by_me);
  const stats = [
    ['Submitted', data.mine.length],
    ['Reviews given', data.given.length],
    ['Reviews received', data.received.length],
    ['Waiting for you', waiting.length],
  ];

  return (
    <>
      <div className="page-head">
        <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
        <Link className="btn primary" to="/submit">Submit code</Link>
      </div>

      <div className="stats">
        {stats.map(([label, n]) => (
          <div className="stat" key={label}>
            <span className="stat-n">{n}</span>
            <span className="muted">{label}</span>
          </div>
        ))}
      </div>

      <h2>Needs a review</h2>
      {waiting.length === 0 ? (
        <p className="empty">Nothing is waiting. New submissions from other people will show up here.</p>
      ) : (
        <div className="grid">
          {waiting.slice(0, 4).map((s) => <SubmissionCard key={s.id} submission={s} />)}
        </div>
      )}

      <h2>Your recent submissions</h2>
      {data.mine.length === 0 ? (
        <p className="empty">You haven't submitted any code yet. <Link to="/submit">Submit your first snippet.</Link></p>
      ) : (
        <div className="grid">
          {data.mine.slice(0, 4).map((s) => <SubmissionCard key={s.id} submission={s} mode="mine" />)}
        </div>
      )}
    </>
  );
}

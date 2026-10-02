import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatDate } from '../api.js';

export default function History() {
  const [tab, setTab] = useState('given');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api.myReviews().then(setData).catch((e) => setError(e.message)); }, []);

  if (error) return <div className="alert">{error}</div>;
  if (!data) return <p className="muted">Loading…</p>;

  const list = data[tab];

  return (
    <>
      <div className="page-head"><h1>History</h1></div>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'given'} className={tab === 'given' ? 'active' : ''} onClick={() => setTab('given')}>
          Reviews you gave ({data.given.length})
        </button>
        <button role="tab" aria-selected={tab === 'received'} className={tab === 'received' ? 'active' : ''} onClick={() => setTab('received')}>
          Feedback you received ({data.received.length})
        </button>
      </div>

      {list.length === 0 ? (
        <p className="empty">
          {tab === 'given'
            ? <>You haven't reviewed anything yet. <Link to="/submissions">Find code to review.</Link></>
            : <>No one has reviewed your code yet. <Link to="/submit">Submit something.</Link></>}
        </p>
      ) : (
        list.map((r) => (
          <div className="card review-row" key={r.id}>
            <div className="review-head">
              <Link to={`/review/${r.submission_id}`}><strong>{r.title}</strong></Link>
              <span className="rating">{r.rating}/5</span>
            </div>
            <span className="muted">
              {tab === 'given' ? `Author: ${r.author_name}` : `Reviewer: ${r.reviewer_name}`} · {r.language} · {formatDate(r.created_at)}
            </span>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </>
  );
}

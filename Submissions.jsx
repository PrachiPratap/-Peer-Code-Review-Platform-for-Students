import { useEffect, useState } from 'react';
import { api } from '../api.js';
import SubmissionCard from '../components/SubmissionCard.jsx';

export default function Submissions() {
  const [tab, setTab] = useState('open'); // open | all | mine
  const [others, setOthers] = useState(null);
  const [mine, setMine] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.listSubmissions(), api.mySubmissions()])
      .then(([o, m]) => { setOthers(o.submissions); setMine(m.submissions); })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="alert">{error}</div>;
  if (!others) return <p className="muted">Loading…</p>;

  const list = tab === 'open' ? others.filter((s) => !s.reviewed_by_me) : tab === 'all' ? others : mine;
  const empty = {
    open: "You've reviewed everything available. Check back later.",
    all: 'No one else has submitted code yet.',
    mine: "You haven't submitted any code yet.",
  }[tab];

  return (
    <>
      <div className="page-head"><h1>Review code</h1></div>
      <div className="tabs" role="tablist">
        {[['open', 'Needs your review'], ['all', 'All from others'], ['mine', 'Your submissions']].map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="empty">{empty}</p>
      ) : (
        <div className="grid">
          {list.map((s) => <SubmissionCard key={s.id} submission={s} mode={tab === 'mine' ? 'mine' : 'review'} />)}
        </div>
      )}
    </>
  );
}

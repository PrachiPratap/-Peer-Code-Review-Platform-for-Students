import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, formatDate } from '../api.js';

function ReviewItem({ r, label }) {
  return (
    <div className="review">
      <div className="review-head">
        <strong>{label}</strong>
        <span className="rating" aria-label={`Rating ${r.rating} out of 5`}>{r.rating}/5</span>
      </div>
      <p>{r.comment}</p>
      <span className="muted">{formatDate(r.created_at)}</span>
    </div>
  );
}

export default function Review() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ rating: 0, comment: '' });
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () =>
    api.getSubmission(id).then(setData).catch((e) => setError(e.message));

  useEffect(() => { load(); }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.rating) return setFormError('Choose a rating from 1 to 5.');
    setBusy(true);
    try {
      await api.createReview(id, form);
      await load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (error) return <div className="alert">{error}</div>;
  if (!data) return <p className="muted">Loading…</p>;

  const { submission: s, reviews, isAuthor } = data;
  const lines = s.code.split('\n');
  const myReview = !isAuthor ? reviews[0] : null;

  return (
    <>
      <p><Link to="/submissions" className="muted">← Back to submissions</Link></p>
      <div className="page-head">
        <div>
          <h1>{s.title}</h1>
          <span className="muted">{s.author_name} · {formatDate(s.created_at)}</span>
        </div>
        <span className="lang">{s.language}</span>
      </div>

      {s.description && <p className="brief">{s.description}</p>}

      <pre className="code" tabIndex={0}>
        <code>
          {lines.map((line, i) => (
            <span className="line" key={i}><span className="ln">{i + 1}</span>{line || ' '}{'\n'}</span>
          ))}
        </code>
      </pre>

      <h2>{isAuthor ? `Feedback (${reviews.length})` : 'Your review'}</h2>

      {isAuthor && (reviews.length === 0
        ? <p className="empty">No reviews yet. Feedback will appear here.</p>
        : reviews.map((r) => <ReviewItem key={r.id} r={r} label={r.reviewer_name} />))}

      {!isAuthor && myReview && <ReviewItem r={myReview} label="Submitted" />}

      {!isAuthor && !myReview && (
        <form className="card form" onSubmit={submit}>
          {formError && <div className="alert" role="alert">{formError}</div>}
          <fieldset className="rating-input">
            <legend>Rating</legend>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} aria-pressed={form.rating === n}
                className={form.rating === n ? 'active' : ''} onClick={() => setForm({ ...form, rating: n })}>{n}</button>
            ))}
          </fieldset>
          <label>Comment
            <textarea rows={6} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="What works, what to change, and why." required />
          </label>
          <div><button className="btn primary" disabled={busy}>{busy ? 'Submitting…' : 'Submit review'}</button></div>
        </form>
      )}
    </>
  );
}

import { Link } from 'react-router-dom';
import { formatDate } from '../api.js';

// mode "review": links to the review page for someone else's code
// mode "mine": links to your own submission and its feedback
export default function SubmissionCard({ submission: s, mode = 'review' }) {
  const action =
    mode === 'mine' ? 'View feedback' : s.reviewed_by_me ? 'View your review' : 'Review this code';

  return (
    <article className="card submission">
      <div className="submission-head">
        <h3>{s.title}</h3>
        <span className="lang">{s.language}</span>
      </div>
      {s.description && <p className="muted clamp">{s.description}</p>}
      <div className="submission-foot">
        <span className="muted">
          {mode === 'review' ? `${s.author_name} · ` : ''}{formatDate(s.created_at)} · {s.review_count}{' '}
          {s.review_count === 1 ? 'review' : 'reviews'}
        </span>
        <Link className={`btn ${mode === 'review' && !s.reviewed_by_me ? 'primary' : 'ghost'}`} to={`/review/${s.id}`}>
          {action}
        </Link>
      </div>
    </article>
  );
}

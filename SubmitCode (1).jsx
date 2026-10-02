import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api.js';

export const LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'SQL', 'Other'];

export default function SubmitCode() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', language: 'JavaScript', description: '', code: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { id } = await api.createSubmission(form);
      navigate(`/review/${id}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <>
      <div className="page-head"><h1>Submit code</h1></div>
      <form className="card form" onSubmit={submit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <div className="row">
          <label className="grow">Title<input value={form.title} onChange={set('title')} placeholder="Debounced search hook" required /></label>
          <label>Language
            <select value={form.language} onChange={set('language')}>
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
        </div>
        <label>What should reviewers look at?
          <textarea rows={3} value={form.description} onChange={set('description')} placeholder="Performance, naming, edge cases…" />
        </label>
        <label>Code
          <textarea className="code-input" rows={16} value={form.code} onChange={set('code')} spellCheck={false} required />
        </label>
        <div><button className="btn primary" disabled={busy}>{busy ? 'Submitting…' : 'Submit for review'}</button></div>
      </form>
    </>
  );
}

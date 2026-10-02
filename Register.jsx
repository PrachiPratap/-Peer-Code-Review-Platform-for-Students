import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, saveSession } from '../api.js';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      saveSession(await api.register(form));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={submit}>
        <h1>Create your account</h1>
        <p className="muted">Share your code and get honest feedback from peers.</p>
        {error && <div className="alert" role="alert">{error}</div>}
        <label>Name<input value={form.name} onChange={set('name')} autoComplete="name" required /></label>
        <label>Email<input type="email" value={form.email} onChange={set('email')} autoComplete="email" required /></label>
        <label>Password<input type="password" minLength={6} value={form.password} onChange={set('password')} autoComplete="new-password" required />
          <small className="muted">At least 6 characters.</small>
        </label>
        <button className="btn primary" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
        <p className="muted">Already registered? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}

import { useState } from 'react';
import './App.css';

const initialForm = { name: '', email: '', city: '' };

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save your details.');
      setStatus({ type: 'success', message: data.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel" aria-labelledby="page-title">
        <a className="brand" href="/" aria-label="Profile Hub home"><span>PH</span> Profile Hub</a>
        <div className="hero-copy">
          <p className="eyebrow">A simple full-stack starter</p>
          <h1 id="page-title">Introduce yourself.<br /><em>We’ll handle the rest.</em></h1>
          <p className="hero-text">A polished starting point for learning how React forms and an Express API work together.</p>
        </div>
        <div className="feature-list" aria-label="Application features">
          <div><span>01</span><p>Responsive, accessible form design</p></div>
          <div><span>02</span><p>Validated API requests and feedback</p></div>
          <div><span>03</span><p>A tidy, easy-to-grow project structure</p></div>
        </div>
      </section>

      <section className="form-panel" aria-labelledby="form-title">
        <div className="form-heading">
          <p className="eyebrow">Get started</p>
          <h2 id="form-title">Create your profile</h2>
          <p>Tell us a little about yourself. All fields are required.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={form.name} onChange={updateField} placeholder="e.g. Prashant Gupta" autoComplete="name" required />
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" required />
          <label htmlFor="city">City</label>
          <input id="city" name="city" value={form.city} onChange={updateField} placeholder="e.g. Lucknow" autoComplete="address-level2" required />
          {status.message && <p className={`status ${status.type}`} role="status">{status.message}</p>}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving details…' : 'Save my details'} <span aria-hidden="true">→</span></button>
        </form>
        <p className="form-note">Your details are used only for this demo session.</p>
      </section>
    </main>
  );
}

export default App;

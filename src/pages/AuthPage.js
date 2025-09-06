
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function AuthPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '', name: '', email: '' });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Get users from localStorage
  const getUsers = () => JSON.parse(localStorage.getItem('contenthub-users') || '{}');
  const saveUsers = (users) => localStorage.setItem('contenthub-users', JSON.stringify(users));

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const users = getUsers();
    if (mode === 'login') {
      const u = users[form.username];
      if (u && u.password === form.password) {
        setUser(u);
        setError('');
        localStorage.setItem('contenthub-user', JSON.stringify(u));
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (!form.username || !form.password || !form.name || !form.email) {
        setError('All fields are required');
        return;
      }
      if (users[form.username]) {
        setError('Username already exists');
        return;
      }
      const newUser = { ...form };
      users[form.username] = newUser;
      saveUsers(users);
      setUser(newUser);
      setError('');
      localStorage.setItem('contenthub-user', JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('contenthub-user');
  };

  if (user || localStorage.getItem('contenthub-user')) {
    const u = user || JSON.parse(localStorage.getItem('contenthub-user'));
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">Welcome, {u.name}</h2>
        <p>Email: {u.email}</p>
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded">Logout</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" className="mb-2 p-2 w-full border rounded" value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="mb-2 p-2 w-full border rounded" value={form.password} onChange={handleChange} />
        {mode === 'signup' && (
          <>
            <input name="name" placeholder="Full Name" className="mb-2 p-2 w-full border rounded" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" className="mb-2 p-2 w-full border rounded" value={form.email} onChange={handleChange} />
          </>
        )}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="px-4 py-2 bg-blue-600 text-white rounded w-full">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="mt-2 text-blue-600 underline">
        {mode === 'login' ? 'Create an account' : 'Back to login'}
      </button>
    </div>
  );
}

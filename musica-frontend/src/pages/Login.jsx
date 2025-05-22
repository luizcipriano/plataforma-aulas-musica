import { useState } from 'react';
import { login } from '../api/auth';
import jwtDecode from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);

      const decoded = jwtDecode(data.token);
      if (decoded.role === 'professor') {
        window.location.href = '/painel';
      } else if (decoded.role === 'aluno') {
        window.location.href = '/aulas';
      } else {
        alert('Tipo de usuário desconhecido');
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Entrar</button>
      </form>
    </div>
  );
}
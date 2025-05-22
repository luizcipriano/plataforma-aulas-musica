import { useState } from 'react';
import { login } from '../api/auth';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import LayoutPublico from '../components/LayoutPublico';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

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
      if (err.message.includes('Failed to fetch')) {
        alert('Erro ao conectar com o servidor. Aguarde alguns segundos e tente novamente.');
      } else {
        alert(err.message || 'Erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutPublico>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Conectando...' : 'Entrar'}
        </button>
        <p className="text-center text-sm">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="text-blue-600 hover:underline">Cadastre-se</Link>
        </p>
      </form>
    </LayoutPublico>
  );
}
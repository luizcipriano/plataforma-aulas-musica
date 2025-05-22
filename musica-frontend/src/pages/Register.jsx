import { useState } from 'react';
import { register, login } from '../api/auth';
import { jwtDecode } from 'jwt-decode';
import LayoutPublico from '../components/LayoutPublico';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'professor'
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Registrar
      await register(form.name, form.email, form.password, form.role);

      // Login automático
      const data = await login(form.email, form.password);
      localStorage.setItem('token', data.token);

      // Redirecionar por role
      const decoded = jwtDecode(data.token);
      if (decoded.role === 'professor') {
        window.location.href = '/painel';
      } else {
        window.location.href = '/aulas';
      }
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        alert('Erro ao conectar com o servidor. Aguarde alguns segundos e tente novamente.');
      } else {
        alert(err.message || 'Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutPublico>
      <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
        <input
          className="w-full p-2 border rounded"
          placeholder="Nome"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Já tem conta?{' '}
        <a href="/login" className="text-blue-600 hover:underline">Fazer login</a>
      </p>
    </LayoutPublico>
  );
}
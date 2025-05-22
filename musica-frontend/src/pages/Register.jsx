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

  async function handleSubmit(e) {
    e.preventDefault();
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
      alert(err.message);
    }
  }

  return (
    <LayoutPublico>
      <h2 className="text-2xl font-bold text-center">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Senha" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="w-full p-2 border rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Cadastrar</button>
      </form>
      <p className="text-center text-sm">
        Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Fazer login</a>
      </p>
    </LayoutPublico>
  );
}
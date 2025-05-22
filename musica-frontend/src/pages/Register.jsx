import { useState } from 'react';
import { register } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'professor' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password, form.role);
      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Cadastro</h2>
        <input className="w-full p-2 border rounded" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Senha" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select className="w-full p-2 border rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="professor">Professor</option>
          <option value="aluno">Aluno</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Cadastrar</button>
      </form>
    </div>
  );
}
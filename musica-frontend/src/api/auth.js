const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login inválido');
  return res.json();
}

export async function register(name, email, password, role) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!res.ok) throw new Error('Erro ao registrar');
  return res.json();
}
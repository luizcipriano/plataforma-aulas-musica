import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function PrivateRoute({ children, only }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Se for rota específica para uma role e não bater, redireciona
    if (only && decoded.role !== only) {
      return <Navigate to={`/${decoded.role === 'professor' ? 'painel' : 'aulas'}`} />;
    }

    return children;
  } catch {
    return <Navigate to="/login" />;
  }
}
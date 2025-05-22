import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PainelProfessor from './pages/PainelProfessor';
import AreaAluno from './pages/AreaAluno';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        <Route
          path="/painel"
          element={
            <PrivateRoute only="professor">
              <PainelProfessor />
            </PrivateRoute>
          }
        />
        <Route
          path="/aulas"
          element={
            <PrivateRoute only="aluno">
              <AreaAluno />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
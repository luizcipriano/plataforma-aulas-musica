const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Teste básico de saúde da API
app.get('/', (req, res) => {
  res.send('API Online');
});

// Rotas
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const videoRoutes = require('./routes/videoRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/videos/upload', uploadRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
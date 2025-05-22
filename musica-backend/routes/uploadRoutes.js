const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middlewares/authMiddleware');
const supabase = require('../services/supabase');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', auth, upload.single('video'), async (req, res) => {
  const file = req.file;
  const userId = req.user.userId;

  if (!file) return res.status(400).json({ error: 'Arquivo não enviado.' });

  // Nome do arquivo único por usuário
  const filename = `${userId}/${uuidv4()}-${file.originalname}`;

  // Upload para bucket privado
  const { error } = await supabase.storage
    .from('videos')
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    console.error('Erro Supabase:', error);
    return res.status(500).json({ error: 'Erro ao fazer upload.', detail: error.message });
  }

  // Retorna o caminho interno salvo no bucket (para uso com signed URL)
  res.json({ path: filename });
});

module.exports = router;
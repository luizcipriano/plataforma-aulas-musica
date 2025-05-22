const pool = require('../models/db');

// Criar vídeo
const createVideo = async (req, res) => {
  const { title, description, video_url } = req.body;
  const owner_id = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO videos (title, description, video_url, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, video_url, owner_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar vídeo.' });
  }
};

// Listar vídeos do professor
const getMyVideos = async (req, res) => {
  const owner_id = req.user.userId;

  try {
    const result = await pool.query(
      'SELECT * FROM videos WHERE owner_id = $1 ORDER BY created_at DESC',
      [owner_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vídeos.' });
  }
};

// Atualizar vídeo
const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, video_url } = req.body;
  const owner_id = req.user.userId;

  try {
    const result = await pool.query(
      `UPDATE videos SET title = $1, description = $2, video_url = $3
       WHERE id = $4 AND owner_id = $5 RETURNING *`,
      [title, description, video_url, id, owner_id]
    );

    if (result.rows.length === 0)
      return res.status(403).json({ error: 'Não autorizado ou vídeo não encontrado.' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar vídeo.' });
  }
};

// Deletar vídeo
const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const owner_id = req.user.userId;

  try {
    const result = await pool.query(
      'DELETE FROM videos WHERE id = $1 AND owner_id = $2 RETURNING *',
      [id, owner_id]
    );

    if (result.rows.length === 0)
      return res.status(403).json({ error: 'Não autorizado ou vídeo não encontrado.' });

    res.json({ message: 'Vídeo removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar vídeo.' });
  }
};

module.exports = { createVideo, getMyVideos, updateVideo, deleteVideo };
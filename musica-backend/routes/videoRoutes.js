const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createVideo,
  getMyVideos,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

router.use(auth);

router.post('/', createVideo); // Criar
router.get('/', getMyVideos);  // Listar
router.put('/:id', updateVideo); // Atualizar
router.delete('/:id', deleteVideo); // Remover

module.exports = router;
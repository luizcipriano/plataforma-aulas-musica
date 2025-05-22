import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function AreaAluno() {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5050/api/videos', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setVideos)
      .catch(() => alert('Erro ao buscar vídeos'));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Área do Aluno</h1>

      {videos.length === 0 && (
        <p className="text-center text-gray-500">Nenhum vídeo disponível.</p>
      )}

      <div className="space-y-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded shadow p-4 space-y-3">
            <h2 className="font-bold text-lg">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.description}</p>
            <ReactPlayer url={video.video_url} controls width="100%" />
          </div>
        ))}
      </div>
    </div>
  );
}
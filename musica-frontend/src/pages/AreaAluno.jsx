import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactPlayer from 'react-player';

const API_URL = `${import.meta.env.VITE_API_URL}/api/videos`;

export default function AreaAluno() {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro de autenticação ou permissão');
        return res.json();
      })
      .then(setVideos)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Header title="Área do Aluno" />
      <h1 className="text-2xl font-bold text-center">Área do Aluno</h1>

      {videos.length === 0 && (
        <p className="text-center text-gray-500">Nenhum vídeo disponível.</p>
      )}

      <div className="space-y-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded shadow p-4 space-y-3">
            <h2 className="font-bold text-lg">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.description}</p>
            <p className="text-xs text-gray-500">Professor: {video.professor_name}</p>
            {video.video_url ? (
              <ReactPlayer url={video.video_url} controls width="100%" />
            ) : (
              <p className="text-red-500 text-sm">Vídeo indisponível</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
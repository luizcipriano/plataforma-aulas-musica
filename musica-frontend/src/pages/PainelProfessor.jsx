import { useState, useEffect } from 'react';
import Header from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL;

export default function PainelProfessor() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', description: '' });
  const [videoFile, setVideoFile] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const res = await fetch(`${API_URL}/api/videos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setVideos(data);
  }

  async function createOrUpdateVideo(e) {
    e.preventDefault();

    let videoUrl = null;

    if (videoFile) {
      const formData = new FormData();
      formData.append('video', videoFile);

      const resUpload = await fetch(`${API_URL}/api/videos/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const uploadData = await resUpload.json();
      if (!resUpload.ok) {
        alert('Erro ao fazer upload do vídeo.');
        return;
      }

      videoUrl = uploadData.path;
    } else if (form.video_url) {
      videoUrl = form.video_url;
    } else {
      alert('Selecione um vídeo.');
      return;
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id
      ? `${API_URL}/api/videos/${form.id}`
      : `${API_URL}/api/videos`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, video_url: videoUrl })
    });

    if (res.ok) {
      setForm({ id: null, title: '', description: '' });
      setVideoFile(null);
      fetchVideos();
    } else {
      alert('Erro ao salvar vídeo.');
    }
  }

  async function deleteVideo(id) {
    const confirm = window.confirm('Deseja realmente excluir este vídeo?');
    if (!confirm) return;

    const res = await fetch(`${API_URL}/api/videos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchVideos();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Header title="Painel do Professor" />
      <h1 className="text-2xl font-bold">Painel do Professor</h1>

      <form onSubmit={createOrUpdateVideo} className="bg-white p-4 rounded shadow space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input
          type="file"
          accept="video/mp4"
          onChange={e => setVideoFile(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        {videoFile && <p className="text-sm text-gray-600">Arquivo: {videoFile.name}</p>}
        {videoFile && (
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full max-h-64 my-2 border"
          />
        )}
        {!videoFile && form.video_url && (
          <video
            src={form.video_url}
            controls
            className="w-full max-h-64 my-2 border"
          />
        )}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {form.id ? 'Atualizar Vídeo' : 'Cadastrar Vídeo'}
        </button>
      </form>

      <div className="space-y-4">
        {videos.map(video => (
          <div key={video.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-bold">{video.title}</h2>
              <p className="text-sm">{video.description}</p>
              {video.video_url && (
                <video
                  src={video.video_url}
                  controls
                  className="w-full max-h-64 my-2 border"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setForm({ id: video.id, title: video.title, description: video.description, video_url: video.video_url })}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => deleteVideo(video.id)}
                className="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';

export default function PainelProfessor() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', video_url: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const res = await fetch('http://localhost:5050/api/videos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setVideos(data);
  }

  async function createVideo(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5050/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ title: '', description: '', video_url: '' });
      fetchVideos();
    } else {
      alert('Erro ao criar vídeo');
    }
  }

  async function deleteVideo(id) {
    const confirm = window.confirm('Deseja realmente excluir este vídeo?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5050/api/videos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchVideos();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Painel do Professor</h1>

      <form onSubmit={createVideo} className="bg-white p-4 rounded shadow space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="URL do vídeo" value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cadastrar Vídeo</button>
      </form>

      <div className="space-y-4">
        {videos.map(video => (
          <div key={video.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-bold">{video.title}</h2>
              <p className="text-sm">{video.description}</p>
              <p className="text-xs text-gray-500">{video.video_url}</p>
            </div>
            <button onClick={() => deleteVideo(video.id)} className="text-red-600 hover:underline">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}
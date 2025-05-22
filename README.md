# Plataforma de Aulas para Músicos 🎵

Plataforma web desenvolvida para conectar professores de música e seus alunos por meio de videoaulas privadas, com foco em organização, segurança e facilidade de uso.

## 🚀 Link da aplicação

- Frontend (Netlify): [https://plataforma-aulas-musica.netlify.app/](https://plataforma-aulas-musica.netlify.app/)
- Backend (Render): [https://plataforma-aulas-musica.onrender.com](https://plataforma-aulas-musica.onrender.com)

## 🎯 Funcionalidades Principais (MVP)

### Professores

- Cadastro/Login
- Upload de vídeos diretamente na plataforma (armazenamento seguro no Supabase Storage)
- Visualização, edição e exclusão de vídeos
- Visualização de preview antes de salvar

### Alunos

- Cadastro/Login
- Acesso apenas aos vídeos cadastrados
- Reprodução com player interno via ReactPlayer

## 🧱 Stack Utilizada

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Auth**: JWT (via login personalizado)
- **Banco de dados**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (buckets privados)

## 🛠️ Executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/plataforma-aulas-musica.git
cd plataforma-aulas-musica
```

### 2. Instale as dependências

```bash
cd musica-backend
npm install
cd ../musica-frontend
npm install
```

### 3. Variáveis de Ambiente

Crie os arquivos `.env` conforme os modelos abaixo:

#### musica-backend/.env

```env
PORT=5050
JWT_SECRET=sua_chave
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_KEY=<sua service role>
```

#### musica-frontend/.env

```env
VITE_API_URL=http://localhost:5050
```

### 4. Rodar

```bash
cd musica-backend
npm run dev

cd ../musica-frontend
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 🔐 Segurança

- Autenticação baseada em JWT, separando acessos por "professor" e "aluno"
- Bucket de vídeos é privado e acessado via signed URLs geradas no backend

## 📌 Melhorias planejadas

- Criação de playlists
- Breadcrumbs para navegação intuitiva
- Página inicial com opções claras (aluno/professor)
- Visualização de outros professores e seus conteúdos
- Thumbnails dos vídeos

## 👨‍💻 Desenvolvedor

- Nome: \[Luiz Cipriano]
- GitHub: [https://github.com/luizcipriano](https://github.com/luizcipriano)

---

Projeto criado como desafio técnico. Em evolução para suporte a mais funcionalidades.

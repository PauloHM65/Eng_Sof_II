import axios from 'axios';

function resolveApiUrl() {
  const raw = process.env.REACT_APP_API_URL;
  let url = raw ? raw.trim() : '';
  
  // Se o Render injetou o host interno (ex: agenda-backend-vksl ou agenda-backend-vksl:8080)
  // Precisamos transformar isso na URL pública que o navegador consegue acessar
  if (url && !url.includes('.onrender.com') && !url.includes('localhost')) {
    const hostPart = url.split(':')[0]; // Remove a porta interna, se houver
    url = `${hostPart}.onrender.com`;
  }

  if (!url) return 'https://agenda-backend-vksl.onrender.com/api';
  
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  url = url.replace(/\/+$/, '');
  if (!/\/api$/i.test(url)) url = `${url}/api`;
  return url;
}

const API_URL = resolveApiUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const pacienteService = {
  listar: () => api.get('/pacientes'),
  buscar: (id) => api.get(`/pacientes/${id}`),
  criar: (paciente) => api.post('/pacientes', paciente),
  atualizar: (id, paciente) => api.put(`/pacientes/${id}`, paciente),
  deletar: (id) => api.delete(`/pacientes/${id}`)
};

export const profissionalService = {
  listar: () => api.get('/profissionais'),
  buscar: (id) => api.get(`/profissionais/${id}`),
  criar: (profissional) => api.post('/profissionais', profissional),
  atualizar: (id, profissional) => api.put(`/profissionais/${id}`, profissional),
  deletar: (id) => api.delete(`/profissionais/${id}`)
};

export const atendimentoService = {
  listar: () => api.get('/atendimentos'),
  buscar: (id) => api.get(`/atendimentos/${id}`),
  criar: (atendimento) => api.post('/atendimentos', atendimento),
  atualizar: (id, atendimento) => api.put(`/atendimentos/${id}`, atendimento),
  deletar: (id) => api.delete(`/atendimentos/${id}`)
};

export default api;

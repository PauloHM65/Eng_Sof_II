import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { atendimentoService, pacienteService, profissionalService } from '../services/api';

function AtendimentoForm() {
  const [atendimento, setAtendimento] = useState({ data: '', horario: '', problemaTexto: '', paciente: { id: '' }, profissional: { id: '' } });
  const [pacientes, setPacientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    pacienteService.listar().then(res => setPacientes(res.data));
    profissionalService.listar().then(res => setProfissionais(res.data));
    
    if (id) {
      atendimentoService.buscar(id).then(res => setAtendimento(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await atendimentoService.atualizar(id, atendimento);
      else await atendimentoService.criar(atendimento);
      navigate('/atendimentos');
    } catch (err) {
      alert('Erro ao salvar o atendimento. Verifique os dados.');
    }
  };

  return (
    <div className="form">
      <h2>{id ? 'Editar Atendimento' : 'Novo Atendimento'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente</label>
          <select required value={atendimento.paciente?.id || ''} onChange={e => setAtendimento({...atendimento, paciente: { id: e.target.value }})}>
            <option value="">Selecione um paciente</option>
            {pacientes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Profissional</label>
          <select required value={atendimento.profissional?.id || ''} onChange={e => setAtendimento({...atendimento, profissional: { id: e.target.value }})}>
            <option value="">Selecione um profissional</option>
            {profissionais.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.categoria})</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={atendimento.data} onChange={e => setAtendimento({...atendimento, data: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Horário</label>
          <input type="time" value={atendimento.horario} onChange={e => setAtendimento({...atendimento, horario: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Problema / Observações</label>
          <textarea value={atendimento.problemaTexto} onChange={e => setAtendimento({...atendimento, problemaTexto: e.target.value})}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn" onClick={() => navigate('/atendimentos')}>Cancelar</button>
      </form>
    </div>
  );
}

export default AtendimentoForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pacienteService } from '../services/api';

function PacienteForm() {
  const [paciente, setPaciente] = useState({ nome: '', cpf: '', telefone: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      pacienteService.buscar(id).then(res => setPaciente(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await pacienteService.atualizar(id, paciente);
      } else {
        await pacienteService.criar(paciente);
      }
      navigate('/pacientes');
    } catch (error) {
      console.error('Erro ao salvar', error);
      alert('Erro ao salvar paciente');
    }
  };

  return (
    <div className="form">
      <h2>{id ? 'Editar Paciente' : 'Novo Paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input required value={paciente.nome} onChange={e => setPaciente({...paciente, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>CPF</label>
          <input value={paciente.cpf} onChange={e => setPaciente({...paciente, cpf: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Telefone</label>
          <input value={paciente.telefone} onChange={e => setPaciente({...paciente, telefone: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn" onClick={() => navigate('/pacientes')}>Cancelar</button>
      </form>
    </div>
  );
}

export default PacienteForm;

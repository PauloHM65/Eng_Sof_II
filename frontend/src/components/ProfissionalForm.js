import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profissionalService } from '../services/api';

function ProfissionalForm() {
  const [profissional, setProfissional] = useState({ nome: '', telefone: '', endereco: '', categoria: 'MEDICO' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) profissionalService.buscar(id).then(res => setProfissional(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await profissionalService.atualizar(id, profissional);
    else await profissionalService.criar(profissional);
    navigate('/profissionais');
  };

  return (
    <div className="form">
      <h2>{id ? 'Editar Profissional' : 'Novo Profissional'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input required value={profissional.nome} onChange={e => setProfissional({...profissional, nome: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Categoria</label>
          <select value={profissional.categoria} onChange={e => setProfissional({...profissional, categoria: e.target.value})}>
            <option value="MEDICO">Médico</option>
            <option value="FISIOTERAPEUTA">Fisioterapeuta</option>
            <option value="PSICOLOGO">Psicólogo</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn" onClick={() => navigate('/profissionais')}>Cancelar</button>
      </form>
    </div>
  );
}

export default ProfissionalForm;

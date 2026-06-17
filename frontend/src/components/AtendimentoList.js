import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { atendimentoService } from '../services/api';

function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    const res = await atendimentoService.listar();
    setAtendimentos(res.data);
  };

  const deletar = async (id) => {
    if (window.confirm('Excluir atendimento?')) {
      await atendimentoService.deletar(id);
      carregar();
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Atendimentos</h2>
        <Link to="/atendimentos/novo" className="btn btn-primary">Agendar Atendimento</Link>
      </div>
      {atendimentos.length === 0 ? <div className="empty">Nenhum atendimento marcado.</div> : (
        <table className="table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Paciente</th>
              <th>Profissional</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map(a => (
              <tr key={a.id}>
                <td>{a.data} {a.horario}</td>
                <td>{a.paciente?.nome}</td>
                <td>{a.profissional?.nome} ({a.profissional?.categoria})</td>
                <td>{a.problemaTexto}</td>
                <td>
                  <Link to={`/atendimentos/editar/${a.id}`} className="btn btn-sm">Editar</Link>
                  <button onClick={() => deletar(a.id)} className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AtendimentoList;

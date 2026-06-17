import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profissionalService } from '../services/api';

function ProfissionalList() {
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const res = await profissionalService.listar();
      setProfissionais(res.data);
    } catch (error) {
      console.error('Erro ao listar', error);
    }
  };

  const deletar = async (id) => {
    if (window.confirm('Tem certeza?')) {
      await profissionalService.deletar(id);
      carregar();
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Profissionais de Saúde</h2>
        <Link to="/profissionais/novo" className="btn btn-primary">Novo Profissional</Link>
      </div>
      {profissionais.length === 0 ? (
        <div className="empty">Nenhum profissional cadastrado.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {profissionais.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>
                  <Link to={`/profissionais/editar/${p.id}`} className="btn btn-sm">Editar</Link>
                  <button onClick={() => deletar(p.id)} className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProfissionalList;

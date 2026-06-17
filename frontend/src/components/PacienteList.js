import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pacienteService } from '../services/api';

function PacienteList() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {
    try {
      const res = await pacienteService.listar();
      setPacientes(res.data);
    } catch (error) {
      console.error('Erro ao listar pacientes', error);
    }
  };

  const deletar = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await pacienteService.deletar(id);
        carregarPacientes();
      } catch (error) {
        console.error('Erro ao deletar', error);
      }
    }
  };

  return (
    <div>
      <div className="header">
        <h2>Pacientes</h2>
        <Link to="/pacientes/novo" className="btn btn-primary">Novo Paciente</Link>
      </div>
      {pacientes.length === 0 ? (
        <div className="empty">Nenhum paciente cadastrado.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.cpf}</td>
                <td>{p.telefone}</td>
                <td>
                  <Link to={`/pacientes/editar/${p.id}`} className="btn btn-sm">Editar</Link>
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

export default PacienteList;

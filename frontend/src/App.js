import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PacienteList from './components/PacienteList';
import PacienteForm from './components/PacienteForm';
import ProfissionalList from './components/ProfissionalList';
import ProfissionalForm from './components/ProfissionalForm';
import AtendimentoList from './components/AtendimentoList';
import AtendimentoForm from './components/AtendimentoForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>🏥 Clínica Web</h1>
          <div className="nav-links">
            <Link to="/pacientes">Pacientes</Link>
            <Link to="/profissionais">Profissionais</Link>
            <Link to="/atendimentos">Atendimentos</Link>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<PacienteList />} />
            
            <Route path="/pacientes" element={<PacienteList />} />
            <Route path="/pacientes/novo" element={<PacienteForm />} />
            <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
            
            <Route path="/profissionais" element={<ProfissionalList />} />
            <Route path="/profissionais/novo" element={<ProfissionalForm />} />
            <Route path="/profissionais/editar/:id" element={<ProfissionalForm />} />
            
            <Route path="/atendimentos" element={<AtendimentoList />} />
            <Route path="/atendimentos/novo" element={<AtendimentoForm />} />
            <Route path="/atendimentos/editar/:id" element={<AtendimentoForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

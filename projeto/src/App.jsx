import React, { useState } from 'react';
import { IoMdPaw } from 'react-icons/io';
import FormularioCadastro from './components/FormularioCadastro';
import ListaAnimais from './components/ListaAnimais';

import './App.css';

const App = () => {
  const [animais, setAnimais] = useState([]);

  const handleCadastroSubmit = (novoAnimal) => {
    novoAnimal.id = Date.now().toString();
    setAnimais([...animais, novoAnimal]);
  };

  const handleRemover = (animal) => {
    const novaLista = animais.filter((a) => a.id !== animal.id);
    setAnimais(novaLista);
  };

  const handleAlterarStatus = (animal) => {
    const novaLista = animais.map((a) =>
      a.id === animal.id ? { ...a, status: a.status === 'procurado' ? 'encontrado' : 'procurado' } : a
    );
    setAnimais(novaLista);
  };

  const totalAnimais = animais.length;
  const resgatados = animais.filter((animal) => animal.status === 'encontrado').length;
  const naoResgatados = totalAnimais - resgatados;

  const percentualResgatados = (resgatados / totalAnimais) * 100;
  const percentualNaoResgatados = (naoResgatados / totalAnimais) * 100;

  return (
    <div className="app-container">
      <h1>Lista de Animais</h1>
      <FormularioCadastro onCadastroSubmit={handleCadastroSubmit} />
      <div className="progress-bar">
        <div className="progress-bar-item" style={{ width: `${percentualResgatados}%` }}>
          <IoMdPaw />
          Resgatados: {resgatados}
        </div>
        <div className="progress-bar-item" style={{ width: `${percentualNaoResgatados}%` }}>
          <IoMdPaw />
          Não Resgatados: {naoResgatados}
        </div>
      </div>
      <ListaAnimais animais={animais} onRemover={handleRemover} onAlterarStatus={handleAlterarStatus} />
    </div>
  );
};

export default App;

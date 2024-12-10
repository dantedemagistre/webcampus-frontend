import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioInscripcion from './components/FormularioInscripcion';
import PantallaInicio from './components/PantallaInicio';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PantallaInicio />} />
        <Route path="/inscripcion" element={<FormularioInscripcion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
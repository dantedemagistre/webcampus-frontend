import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


const FormularioInscripcion = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [mail, setMail] = useState('');
  const [materia, setMateria] = useState('');
  const [materias, setMaterias] = useState([]);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/materias'); // Reemplaza con la URL de tu backend
        setMaterias(response.data);

      } catch (error) {
        console.error('Error al obtener las materias:', error);
      }
    };

    fetchMaterias();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setExito(null);

    try {
      // Validar los datos del formulario
      if (!nombre || !apellido || !dni || !mail || !materia) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      // Validar el formato del DNI
      if (!/^\d{8}$/.test(dni)) {
        setError('El DNI debe tener 8 dígitos.');
        return;
      }

      // Validar el formato del mail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        setError('El mail debe ser válido.');
        return;
      }

      // Enviar la información al backend
      const response = await axios.post('http://localhost:8080/api/v1/inscripciones', { // Reemplaza con la URL de tu backend
        nombreAlumno: nombre,
        apellidoAlumno: apellido,
        dniAlumno: dni,
        mailAlumno: mail,
        idMateria: materia,
      });

      if (response.status === 201) {
        setExito('Inscripción realizada con éxito.');
        // Limpiar el formulario
        setNombre('');
        setApellido('');
        setDni('');
        setMail('');
        setMateria('');
      } else {
        setError('Error al realizar la inscripción.');
      }
    } catch (error) {
      console.error('Error al realizar la inscripción:', error);
      setError('Error al realizar la inscripción.');
    }
  };

  return (
    <div className="container mt-5"> {/* Agrega una clase para el contenedor */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Formulario de Inscripción</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {exito && <div className="alert alert-success">{exito}</div>}
              <br></br>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">DNI:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mail" className="form-label">Mail:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="mail"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="materia" className="form-label">Materia:</label>
                  <select
                    className="form-select"
                    id="materia"
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                  >
                    <option value="">Selecciona una materia</option>
                    {materias.map((materia) => (
                      <option key={materia.id} value={materia.id}>
                        {materia.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Inscribirse</button>
                <br></br>
                <br></br>

                <Link to="/" className="btn btn-secondary">
              Volver a la lista de cursos
            </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioInscripcion;
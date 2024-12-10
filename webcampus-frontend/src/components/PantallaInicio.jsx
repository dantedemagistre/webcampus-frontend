import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';




const PantallaInicio = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/inscripciones'); // Reemplaza con la URL correcta de tu backend
        setCursos(response.data);
        console.log(response);

      } catch (error) {
        console.error('Error al obtener los cursos:', error);
        setError('Error al cargar los cursos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);


  
  
  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Lista de Cursos</h4>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Profesor</th>
                    <th>Inscriptos</th>
                    <th>Cupo Disponible</th>
                    <th>Alumnos Inscriptos</th>
                  </tr>
                </thead>
                <tbody>
  {cursos.map((curso) => (
    <tr key={curso.id}>
      <td>{curso.materia.nombre}</td>
      <td>{curso.materia.profesor}</td>
      <td>{curso.materia.cupoMaximo}</td> {/* Mostrar el cupo máximo */}
      <td>{curso.materia.cupoMaximo}</td> {/* Mostrar el cupo disponible */}
      <td>
        {curso.alumno.nombre} {curso.alumno.apellido} {/* Mostrar el nombre y apellido del alumno */}
      </td>
    </tr>
  ))}
</tbody>
              </table>
              <br></br>

              <Link to="/inscripcion" className="btn btn-primary">
  Ir al formulario de inscripción
</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
  
};

export default PantallaInicio;
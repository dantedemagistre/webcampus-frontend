import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/inscripciones'; // Reemplaza con la URL correcta de tu backend

const inscribirAlumno = async (inscripcion) => {
  try {
    const response = await axios.post(apiUrl, inscripcion);
    return response.data;
  } catch (error) {
    console.error('Error al inscribir alumno:', error);
    throw error; // Puedes manejar el error de forma diferente si lo deseas
  }
};

const obtenerCursos = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    throw error; // Puedes manejar el error de forma diferente si lo deseas
  }
};

export default {
  inscribirAlumno,
  obtenerCursos,
};
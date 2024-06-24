const API_URL = "" /* <--- Aquí va la URL y endpoint */;

export const obtenerDatos = async () => {
  try {
    const response = await fetch(/* Aquí va la URL */);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de la API', error);
    throw error;
  }
};
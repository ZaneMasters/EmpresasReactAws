import axiosInstance from '../axiosConfig';

// Enviar el PDF por correo (GET)
export const sendPdfByEmail = async (email, auth) => {
  try {
    const response = await axiosInstance.get(`/productos/enviar-pdf?email=${email}`, {
      auth: {
        username: auth.username,
        password: auth.password
      },
      responseType: 'blob', // Esto asegura que el servidor devuelva un archivo PDF correctamente si es necesario
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al enviar el correo";
  }
};

export const downloadPdf = async (auth) => {
    try {
      const response = await axiosInstance.get(`/productos/descargar-pdf`, {
        auth: {
          username: auth.username,
          password: auth.password
        },
        responseType: 'blob', // Para manejar archivos binarios
      });
  
      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'productos.pdf'); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Eliminar el enlace después de la descarga
  
    } catch (error) {
      throw error.response?.data?.message || "Error al descargar el PDF";
    }
  };
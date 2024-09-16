import React, { useState, useEffect } from "react";
import { getProductos } from "../services/productoService";
import { sendPdfByEmail } from "../services/pdfService";
import { downloadPdf } from "../services/pdfService";

const Inventario = ({ auth }) => {
  const [productos, setProductos] = useState([]);
  const [email, setEmail] = useState(""); // Estado para el correo
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos(auth);
      setProductos(data);
    } catch (error) {
      setError("Error al obtener los productos");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendPdf = async (e) => {
    e.preventDefault();
    try {
      await sendPdfByEmail(email, auth); // Llamar al servicio que envía el PDF por correo
      setSuccessMessage(`Correo enviado exitosamente a ${email}`);
      setError(""); // Limpiar el error si existía
      setEmail(""); // Limpiar el campo de email después de enviar
    } catch (error) {
      setError("Error al enviar el correo: " + error);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      await downloadPdf(auth); // Llamar al servicio para descargar el PDF
      setSuccessMessage("PDF descargado exitosamente");
      setError(""); // Limpiar el error si existía
    } catch (error) {
      setError("Error al descargar el PDF: " + error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mt-4">
      <h2>Inventario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Características</th>
            <th>Precio</th>
            <th>Empresa</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombreProducto}</td>
              <td>{producto.codigo}</td>
              <td>{producto.caracteristicas}</td>
              <td>{producto.precio}</td>
              <td>
                {producto.empresa ? producto.empresa.nombreEmpresa : "Sin Empresa"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary mt-4" onClick={toggleForm}>
        {showForm ? "Cancelar" : "Enviar PDF por Correo"}
      </button>

      {showForm && (
        <form className="mt-3" onSubmit={handleSendPdf}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success mt-2">
            Enviar PDF
          </button>
        </form>
      )}

      <button className="btn btn-secondary mt-4" onClick={handleDownloadPdf}>
        Descargar PDF
      </button>
    </div>
  );
};

export default Inventario;

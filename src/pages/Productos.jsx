import React, { useState, useEffect } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/productoService";
import { getEmpresas } from "../services/empresaService"; // Asegúrate de importar la función correcta
import ProductoModal from "./Modals/ProductoModal";

const Productos = ({ auth }) => {
  const [productos, setProductos] = useState([]);
  const [empresas, setEmpresas] = useState([]); // Nuevo estado para empresas
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [formValues, setFormValues] = useState({
    nombreProducto: '',
    codigo: '',
    caracteristicas: '',
    precio: 0,
    empresa: {
        nit: '', // NIT vacío
        nombreEmpresa: '', // Puedes ajustarlo según tu lista de empresas
        direccion: '',
        telefono: ''
    },
    categorias: [], // Si se requiere manejar categorías
    id: 0
});

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductos();
    fetchEmpresas(); // Obtén la lista de empresas
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getProductos(auth);
      setProductos(data);
    } catch (error) {
      setError("Error al obtener los productos");
    }
  };

  const fetchEmpresas = async () => {
    try {
      const data = await getEmpresas(auth);
      setEmpresas(data.empresas); // Establece la lista de empresas
    } catch (error) {
      setError("Error al obtener las empresas");
    }
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setFormValues({
      nombreProducto: producto.nombreProducto,
      codigo: producto.codigo,
      caracteristicas: producto.caracteristicas,
      precio: producto.precio,
      empresa: producto.empresa.nit, // Ajuste aquí para usar el NIT de la empresa
      id: producto.id,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(auth, id);
      fetchProductos();
    } catch (error) {
      setError("Error al eliminar el producto");
    }
  };

  const handleCreate = () => {
    setSelectedProducto(null);
    setFormValues({
      nombreProducto: "",
      codigo: "",
      caracteristicas: "",
      precio: 0,
      empresa: "",
      id: 0,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProducto(null);
    setError(""); // Resetear errores
  };

  const handleSubmit = async () => {
    if (selectedProducto) {
      try {
        await updateProducto(auth, selectedProducto.id, formValues);
        fetchProductos();
      } catch (error) {
        setError("Error al actualizar el producto");
      }
    } else {
      try {
        await createProducto(auth, formValues);
        fetchProductos();
      } catch (error) {
        setError("Error al crear el producto");
        console.error(formValues);
      }
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'empresa') {
        const selectedEmpresa = empresas.find((empresa) => empresa.nit === parseInt(value));
        setFormValues({
            ...formValues,
            empresa: selectedEmpresa || {} // Establecer toda la empresa
        });
    } else {
        setFormValues({
            ...formValues,
            [name]: name === 'precio' ? parseFloat(value) || '' : value
        });
    }
};


const isExternal = auth?.roles.includes('ROLE_EXTERNO');


  return (
    <div className="container mt-4">
      <h2>Productos</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Características</th>
            <th>Precio</th>
            <th>Empresa</th>
            {!isExternal && <th>Acciones</th>} {/* Muestra la columna de acciones solo si no es ROLE_EXTERNO */}
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
                {producto.empresa
                  ? producto.empresa.nombreEmpresa
                  : "Sin Empresa"}
              </td>
              {!isExternal && (
              <td>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
                            )}
            </tr>
          ))}
        </tbody>
      </table>
      {!isExternal &&  <button onClick={handleCreate} className="btn btn-primary"> 
        Crear Producto
      </button> }

      <ProductoModal
        show={showModal}
        onClose={handleClose}
        onSave={handleSubmit}
        formValues={formValues}
        onChange={handleChange}
        empresas={empresas} // Pasa la lista de empresas al modal
        isEditMode={!!selectedProducto}
      />
    </div>
  );
};

export default Productos;

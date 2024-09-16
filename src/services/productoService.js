import axiosInstance from '../axiosConfig';

// Obtener la lista de productos (GET)
const getProductos = async (auth) => {
    try {
        const response = await axiosInstance.get('/productos', {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Crear un nuevo producto (POST)
const createProducto = async (auth, nuevoProducto) => {
    try {
        const response = await axiosInstance.post('/productos', nuevoProducto, {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data; // Devuelve el producto creado
    } catch (error) {
        throw error;
    }
};

// Actualizar un producto existente (PUT)
const updateProducto = async (auth, id, productoActualizado) => {
    try {
        const response = await axiosInstance.put(`/productos/${id}`, productoActualizado, {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data; // Devuelve el producto actualizado
    } catch (error) {
        throw error;
    }
};

// Eliminar un producto (DELETE)
const deleteProducto = async (auth, id) => {
    try {
        const response = await axiosInstance.delete(`/productos/${id}`, {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data; // Devuelve algún mensaje de confirmación
    } catch (error) {
        throw error;
    }
};

export { getProductos, createProducto, updateProducto, deleteProducto };

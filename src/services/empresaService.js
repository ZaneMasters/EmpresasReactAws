import axiosInstance from '../axiosConfig';

// Obtener la lista de empresas (GET)
const getEmpresas = async (auth) => {
    try {
        const response = await axiosInstance.get('/empresas', {
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

// Crear una nueva empresa (POST)
const createEmpresa = async (auth, nuevaEmpresa) => {
    try {
        const response = await axiosInstance.post('/empresas', nuevaEmpresa, {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data; // Devuelve la empresa creada
    } catch (error) {
        throw error;
    }
};

// Actualizar una empresa existente (PUT)
const updateEmpresa = async (auth, nit, empresaActualizada) => {
    try {
        const response = await axiosInstance.put(`/empresas/${nit}`, empresaActualizada, {
            auth: {
                username: auth.username,
                password: auth.password
            }
        });
        return response.data; // Devuelve la empresa actualizada
    } catch (error) {
        throw error;
    }
};

// Eliminar una empresa (DELETE)
const deleteEmpresa = async (auth, nit) => {
    try {
        const response = await axiosInstance.delete(`/empresas/${nit}`, {
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

export { getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa };


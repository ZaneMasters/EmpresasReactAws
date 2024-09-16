import React, { useState, useEffect } from 'react';
import { getEmpresas, createEmpresa, updateEmpresa, deleteEmpresa } from '../services/empresaService';
import EmpresaModal from './Modals/EmpresaModal';

const Empresas = ({ auth }) => {
    const [empresas, setEmpresas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [formValues, setFormValues] = useState({ nit: '', nombreEmpresa: '', direccion: '', telefono: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            const data = await getEmpresas(auth);
            if (Array.isArray(data.empresas)) {
                setEmpresas(data.empresas);
            } else {
                setEmpresas([]); 
            }
        } catch (error) {
            setError('Error al obtener las empresas');
        }
    };

    const handleEdit = (empresa) => {
        setSelectedEmpresa(empresa);
        setFormValues(empresa); 
        setShowModal(true);
    };

    const handleDelete = async (nit) => {
        try {
            await deleteEmpresa(auth, nit);
            fetchEmpresas(); 
        } catch (error) {
            setError('Error al eliminar la empresa');
        }
    };

    const handleCreate = () => {
        setSelectedEmpresa(null);
        setFormValues({ nit: '', nombreEmpresa: '', direccion: '', telefono: '' });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedEmpresa(null);
    };

    const handleSubmit = async () => {
        if (selectedEmpresa) {
            try {
                await updateEmpresa(auth, selectedEmpresa.nit, formValues);
                fetchEmpresas(); 
            } catch (error) {
                setError('Error al actualizar la empresa');
            }
        } else {
            try {
                await createEmpresa(auth, formValues);
                fetchEmpresas(); 
            } catch (error) {
                setError('Error al crear la empresa');
            }
        }
        handleClose();
    };

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    // Verifica si el rol es 'ROLE_EXTERNO'
    const isExternal = auth?.roles.includes('ROLE_EXTERNO');

    return (
        <div className="container mt-4">
            <h2>Empresas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>NIT</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        {!isExternal && <th>Acciones</th>} {/* Muestra la columna de acciones solo si no es ROLE_EXTERNO */}
                    </tr>
                </thead>
                <tbody>
                    {empresas.map((empresa) => (
                        <tr key={empresa.nit}>
                            <td>{empresa.nit}</td>
                            <td>{empresa.nombreEmpresa}</td>
                            <td>{empresa.direccion}</td>
                            <td>{empresa.telefono}</td>
                            {!isExternal && (
                                <td>
                                    <button onClick={() => handleEdit(empresa)} className="btn btn-warning me-2">Editar</button>
                                    <button onClick={() => handleDelete(empresa.nit)} className="btn btn-danger">Eliminar</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isExternal && <button onClick={handleCreate} className="btn btn-primary">Crear Empresa</button>}

            <EmpresaModal
                show={showModal}
                onClose={handleClose}
                onSave={handleSubmit}
                formValues={formValues}
                onChange={handleChange}
                isEditMode={!!selectedEmpresa}
            />
        </div>
    );
};

export default Empresas;

// src/components/EmpresasList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmpresasList = ({ auth }) => {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        axios.get('/empresas', {
            auth: {
                username: auth.username,
                password: auth.password
            }
        })
        .then(response => {
            setEmpresas(response.data);
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
    }, [auth]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Empresas</h2>
            <ul className="list-group">
                {empresas.map(empresa => (
                    <li key={empresa.id} className="list-group-item">
                        {empresa.nombre}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpresasList;

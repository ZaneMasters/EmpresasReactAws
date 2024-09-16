// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({auth}) => {
    return (
        <>
        <div className="container mt-5">
            <h2 className="text-center">Admin Dashboard</h2>
            <nav>
                <ul className="nav nav-pills justify-content-center">
                {auth?.roles?.includes('ROLE_ADMIN') && (
                    <>
                        <li className="nav-item">
                        <Link className="nav-link" to="/empresas">Ver Empresas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/productos">Ver Productos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/inventario">Ver Inventario</Link>
                    </li>
                    </>
                       )}
                </ul>
            </nav>
        </div>
        </>
    );
};

export default AdminDashboard;

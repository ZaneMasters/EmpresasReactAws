// src/components/ViewerDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ViewerDashboard = ({ auth}) => {
    return (
        <div className="container mt-5">
            <h2 className="text-center">Viewer Dashboard</h2>
            <nav>
                <ul className="nav nav-pills justify-content-center">
                {auth?.roles?.includes('ROLE_EXTERNO') && (
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/empresas">Ver Empresas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/productos">Ver Productos</Link>
                    </li>
                </>
                )}
                </ul>
            </nav>
        </div>
    );
};

export default ViewerDashboard;

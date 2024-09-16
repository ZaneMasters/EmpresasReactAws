import { Link } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener este archivo para estilos personalizados

const AppNavbar = ({ auth, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-4 shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">Gestión de Empresas</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {(auth?.roles?.includes('ROLE_ADMIN') || auth?.roles?.includes('ROLE_EXTERNO')) && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/empresas">Empresas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/productos">Productos</Link>
                                </li>
                                {auth?.roles?.includes('ROLE_ADMIN') && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/inventario">Inventario</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {auth ? (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;

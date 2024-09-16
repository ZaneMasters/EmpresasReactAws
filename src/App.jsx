import { useState } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ViewerDashboard from './components/ViewerDashboard';
import AppNavbar from './layout/Navbar'; // Importa el nuevo componente Navbar
import Empresas from './pages/Empresas';
import Productos from './pages/Productos';
import Inventario from './pages/Inventario';

function App() {
  const [auth, setAuth] = useState(null);

  const handleLogout = () => {
      setAuth(null);
  };

  // Componente que envuelve las rutas protegidas
  const ProtectedRoutes = ({ auth, roles, redirectPath = '/login' }) => {
      if (!auth) {
          return <Navigate to={redirectPath} />;
      }
      // Verifica que el usuario tenga al menos uno de los roles permitidos
      if (roles && !roles.some(role => auth?.roles?.includes(role))) {
          return <Navigate to={redirectPath} />;
      }

      return (
          <>
              <AppNavbar auth={auth} handleLogout={handleLogout} />
              <Outlet />
          </>
      );
  };

  return (
      <Router>
          <Routes>
              {/* Ruta de Login */}
              <Route path="/login" element={<Login setAuth={setAuth} />} />
              
              {/* Rutas protegidas */}
              <Route element={<ProtectedRoutes auth={auth} roles={['ROLE_ADMIN']} />}>
                  <Route path="/admin" element={<AdminDashboard auth={auth} />} />
                  <Route path="/inventario" element={<Inventario auth={auth} />} />
              </Route>

              <Route element={<ProtectedRoutes auth={auth} roles={['ROLE_EXTERNO']} />}>
                  <Route path="/viewer" element={<ViewerDashboard auth={auth} />} />
              </Route>

              <Route path="/empresas" element={<ProtectedRoutes auth={auth} roles={['ROLE_ADMIN', 'ROLE_EXTERNO']} />}>
                  <Route path="" element={<Empresas auth={auth} />} />
              </Route>

              <Route path="/productos" element={<ProtectedRoutes auth={auth} roles={['ROLE_ADMIN', 'ROLE_EXTERNO']} />}>
                  <Route path="" element={<Productos auth={auth} />} />
              </Route>

              {/* Redirección a login si la ruta es desconocida */}
              <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
      </Router>
  );
}

export default App;
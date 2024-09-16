import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacemos la solicitud para autenticación
      const response = await axiosInstance.get('/empresas', {
        auth: {
          username,
          password
        }
      });

      // Obtenemos los roles de la respuesta
      const roles = response.data.roles;

      // Guardamos la información de autenticación
      setAuth({ username, roles, password });

      // Navegamos según el rol del usuario
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else {
        navigate('/viewer');
      }
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage
              src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg'
              alt='phone'
              className='rounded-t-5 rounded-tr-lg-0'
              fluid
            />
          </MDBCol>

          <MDBCol md='8'>
            <MDBCardBody>
              <h2 className='mb-4'>Empresas App</h2>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <MDBInput
                  wrapperClass='mb-4'
                  label='Username'
                  id='form1'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='form2'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn className="mb-4 w-100" type="submit">Sign in</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;

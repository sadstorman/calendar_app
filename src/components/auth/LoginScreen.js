import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import '../../styles/login.css';



export const LoginScreen = () => {

  const dispatch = useDispatch()

  const initialFormLogin = {
    correoLogin: '',
    passwordLogin: '',
  }

  const [formValuesLogin, handleInputChange] = useForm(initialFormLogin)
  const { correoLogin, passwordLogin } = formValuesLogin

  const initialFormRegister = {
    nombreRegister: '',
    correoRegister: '',
    passwordRegister: '',
    passwordRegister2: ''
  }

  const [formValuesRegister, handleInputChangeRegister] = useForm(initialFormRegister)
  const { nombreRegister, correoRegister, passwordRegister, passwordRegister2 } = formValuesRegister

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(correoLogin, passwordLogin))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if( passwordRegister !== passwordRegister2 ) {
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
    } else {
      dispatch(startRegister( correoRegister, passwordRegister, nombreRegister ))
    }
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                name="correoLogin"
                value={correoLogin}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                name="passwordLogin"
                value={passwordLogin}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                value={nombreRegister}
                name='nombreRegister'
                onChange={handleInputChangeRegister}
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                value={correoRegister}
                name='correoRegister'
                onChange={handleInputChangeRegister}
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                value={passwordRegister}
                name='passwordRegister'
                onChange={handleInputChangeRegister}
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                value={passwordRegister2}
                name='passwordRegister2'
                onChange={handleInputChangeRegister}
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
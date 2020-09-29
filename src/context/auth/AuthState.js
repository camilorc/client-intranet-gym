import React, { useReducer } from 'react'
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'
import {
    REGISTRAR_USUARIO_EXITOSO,
    REGISTRAR_USUARIO_ERROR,
    LOGIN_USUARIO_EXISTOSO,
    LOGIN_USUARIO_ERROR,
    OBTENER_USUARIO_EXITOSO,
    OBTENER_USUARIO_ERROR
} from '../../types';

const AuthState = (props) => {

    const stateInitial = {
        usuario: null,
        mensaje: null, 
        autenticado: null, 
    }

    const [state, dispatch] = useReducer(AuthReducer, stateInitial);

    const registrarUsuario = async (datos) => {
        console.log(datos);

        try {

            let respuesta = await clienteAxios.post('/usuario', datos);
            console.log(respuesta);

            //Creamos la Alerta
            const alerta = {
                style: 'alerta-ok',
                msg: 'Registro éxitoso'
            }

            dispatch({
                type: REGISTRAR_USUARIO_EXITOSO,
                payload: {
                    alerta,
                    token: respuesta.data.token
                }

            });

            obtenerUsuario();

        } catch (error) {
            console.log(error);
            //Creamos la Alerta
            const alerta = {
                style: 'alerta-error',
                msg: error.response?.data.error.message || "Hubo un error en el Servidor"
            }

            dispatch({
                type: REGISTRAR_USUARIO_ERROR,
                payload: alerta
            })

        }
    }

    //Método para LOGIN
    const login = async (user) => {

        try {

            let respuesta = await clienteAxios.post('/login', user);
            console.log(respuesta);


            //Creamos la Alerta
            const alerta = {
                style: 'alerta-ok',
                msg: 'Login éxitoso'
            }

            dispatch({
                type: LOGIN_USUARIO_EXISTOSO,
                payload: {
                    alerta,
                    token: respuesta.data.token
                }

            });

            obtenerUsuario();

        } catch (error) {
            console.log(error.response);
            //Creamos la Alerta
            const alerta = {
                style: 'alerta-error',
                msg: error.response?.data.error.message || "Hubo un error en el Servidor"
            }

            dispatch({
                type: LOGIN_USUARIO_ERROR,
                payload: alerta
            })

        }

    }

    //Método para obtener usuario por el token
    const obtenerUsuario = async () => {
        try {

            let token = localStorage.getItem('token');

            if (token) {

                //Agregamos al Header el token
                tokenAuth(token);
                let usuario = await clienteAxios.post('/usuario/obtener');
                console.log(usuario);

                dispatch({
                    type: OBTENER_USUARIO_EXITOSO,
                    payload: usuario.data.usuario
                });

            } else {
                console.log('No existe token');

                dispatch({
                    type: OBTENER_USUARIO_ERROR,
                });

            }

        } catch (error) {
            dispatch({
                type: OBTENER_USUARIO_ERROR,
            });
            console.log(error.response);
        }
    }



    return (
        <AuthContext.Provider
            value={{
                mensaje: state.mensaje,
                autenticado: state.autenticado,
                registrarUsuario,
                login,
                obtenerUsuario
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;
import {
    REGISTRAR_USUARIO_EXITOSO,
    REGISTRAR_USUARIO_ERROR,
    LOGIN_USUARIO_EXISTOSO,
    LOGIN_USUARIO_ERROR,
    OBTENER_USUARIO_EXITOSO,
    OBTENER_USUARIO_ERROR
} from '../../types';


export default (state, action) => {
    switch (action.type) {
        case LOGIN_USUARIO_ERROR:
        case REGISTRAR_USUARIO_ERROR:
            return {
                ...state,
                mensaje : action.payload,
                autenticado:false
            }
        case REGISTRAR_USUARIO_EXITOSO:
        case LOGIN_USUARIO_EXISTOSO:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                mensaje : action.payload.alerta,
                autenticado:true
            }
        case OBTENER_USUARIO_EXITOSO:
            return {
                ...state,
                usuario : action.payload,
                autenticado:true,
                
            }
        case OBTENER_USUARIO_ERROR:
            return {
                ...state,
                usuario : null,
                autenticado:null,
                
            }
        default:
            return state;
    }
}
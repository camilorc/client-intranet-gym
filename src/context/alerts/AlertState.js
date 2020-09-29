import React,{useReducer} from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import {MOSTRAR_ALERTA,OCULTAR_ALERTA} from '../../types';

const AlertState = (props) => {

    const initialState = {
        alerta:null
    }

    const [state, dispatch] = useReducer(AlertReducer,initialState);

    //Función para mostrar alerta
    const mostrarAlerta = (style, msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                style,
                msg
            }
        });
    }

    //Función para ocultar la alerta
    const ocultarAlerta = () => {
        dispatch({
            type: OCULTAR_ALERTA
        });
    }



    return (  
        <AlertContext.Provider
            value={{
                alerta:state.alerta,
                mostrarAlerta,
                ocultarAlerta
            }}
        >
            {props.children}
        </AlertContext.Provider>

    );
}
 
export default AlertState;
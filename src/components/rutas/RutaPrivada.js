import React,{useContext,useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const RutaPrivada = ({component:Component,...props}) => {

    const {autenticado,obtenerUsuario} = useContext(AuthContext)

    useEffect(()=>{
        obtenerUsuario()
        // eslint-disable-next-line
    },[])

    console.log(autenticado);


    return ( 
        <Route {...props} render={props => !autenticado? (
                <Redirect to='/' />
            ) : (
                <Component {...props}/>
            )}
        />
     );
}
 
export default RutaPrivada;
import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'


//Importamos Context
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alerts/AlertContext';


const Login = (props) => {

    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    //Creamos el Context
    const {login,mensaje,autenticado} = useContext(AuthContext);
    const {alerta, mostrarAlerta} = useContext(AlertContext);

    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.style, mensaje.msg);
        }

        if(autenticado){
            props.history.push('/admin')
        }

        // eslint-disable-next-line
    },[mensaje,autenticado]);

    const {email,password} = usuario;

    //Onchange
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    //Submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        login(usuario);
    }

    return (  
        <div className="form-usuario">
            {alerta ?  <div className={`alerta ${alerta.style}`}>{alerta.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primary btn-block" 
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;
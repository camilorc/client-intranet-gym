import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';

//Importamos Context
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const NuevaCuenta = () => {

    const [usuario,setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    const {alerta,mostrarAlerta,ocultarAlerta} = useContext(AlertContext);
    const {registrarUsuario,mensaje} = useContext(AuthContext);
    
    const {nombre,email,password,confirmar} = usuario;

    useEffect(()=>{

        if(mensaje){
            mostrarAlerta(mensaje.style,mensaje.msg);
            return;
        }

        // eslint-disable-next-line
    },[mensaje]);

    

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validamos que los campos no esten vacios
        if(nombre === "" || email=== "" || password === "" || confirmar === ""){
            mostrarAlerta('alerta-error','Debes completar todos los campos');
            return;
        }

        //Verificamos que los dos password son iguales
        if(password !== confirmar){
            mostrarAlerta('alerta-error','Los password deben ser iguales');
            return;
        }

        ocultarAlerta();

        //Debemos hacer el llamado a la API
        console.log('aca');
        registrarUsuario(usuario);
    }



    return ( 
        <div className="form-usuario">
            {alerta ?  <div className={`alerta ${alerta.style}`}>{alerta.msg}</div>: null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirma tu password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Vuelve a escribir tu password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primary btn-block" 
                            value="Crear Cuenta Nueva"
                        />
                    </div>
                </form>
                <Link to="/login" className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
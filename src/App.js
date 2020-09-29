import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Import Componentes
import NavBar from './components/layouts/NavBar';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Admin from './components/admin';
import tokenAuth from './config/tokenAuth';

//Importación de Context
import AlertState from './context/alerts/AlertState';
import AuthState from './context/auth/AuthState';
import RutaPrivada from './components/rutas/RutaPrivada';


//Revisamos si tenemos un TOKEN
const token = localStorage.getItem('token')
if(token){
  tokenAuth(token)
}

function App() {
  return (
    <AlertState>
      <AuthState>
      <Router>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
          <RutaPrivada exact path='/admin' component={Admin} />
        </Switch>
      </Router>
      </AuthState>
    </AlertState>
  );
}

export default App;

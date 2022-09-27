import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';


import MasterLayout from './layouts/admin/MasterLayout';
import Home from './components/frontend/Home'
import Register from './components/frontend/auth/Register'
import Login from './components/frontend/auth/Login'

import axios from 'axios';


axios.defaults.baseURL = "http://127.0.0.1:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials= true;
axios.interceptors.request.use(function (config){ 
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;

});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>



          <Route exact path ="/" component={Home} />

          {/* <Route  path ="/login" component={Login} />
          <Route  path ="/register" component={Register} /> */}
          <Route path ="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login/>}

          </Route>

          <Route  path ="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register/>}

          </Route>
  
           <Route path = "/admin" name ="Admin" render = {(props)=> <MasterLayout {...props}/>} />

         

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

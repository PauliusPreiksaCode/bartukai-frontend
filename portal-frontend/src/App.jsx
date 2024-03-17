import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { PrivateRoute } from './components/PrivateRoute';
import Rooms from './pages/adminPanel/Rooms';
import './index.css'
import Navbar from './components/Navbar';
import Equipment from './pages/adminPanel/Equipments';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-panel/rooms" element=
          {
            <PrivateRoute accessLevel={['0']}>
              <Rooms />
            </PrivateRoute>
            
          }
        />
        <Route path="/admin-panel/equipment" element=
          {
            <PrivateRoute accessLevel={['0']}>
              <Equipment />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
};
  
export default App;
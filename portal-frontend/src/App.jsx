import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { PrivateRoute } from './components/PrivateRoute';
import Rooms from './pages/room/Rooms';
import './index.css'
import Navbar from './components/Navbar';
import Equipment from './pages/equipment/Equipments';
import { default as SpecialistServices } from './pages/service/specialist/Services';
import { default as AdminServices } from './pages/service/admin/Services';
import NonApprovedServices from './pages/service/admin/NonApprovedServices';
import { default as UserServices } from './pages/service/user/Services';

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
        <Route path="/admin-panel/services" element=
          {
            <PrivateRoute accessLevel={['0']}>
              <AdminServices />
            </PrivateRoute>
          }
        />
        <Route path='/admin-panel/NonApprovedServices' element=
          {
            <PrivateRoute accessLevel={['0']}>
              <NonApprovedServices />
            </PrivateRoute>
          }
        />
              
        <Route path='/specialist-panel/services' element=
          {
            <PrivateRoute accessLevel={['2']}>
              <SpecialistServices />
            </PrivateRoute>
          }
        />

        <Route path='/services' element=
          {
            <PrivateRoute accessLevel={['1']}>
              <UserServices />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
  
export default App;
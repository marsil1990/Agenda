import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Schedule from './components/schedule/Schedule';
import Start from './components/auth/Start';
import Reservations from './components/schedule/Reservations';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/schedule" element={<Schedule />} />
          </Route>

          <Route element={<PrivateRoute adminOnly />}>
            <Route path="/reservations" element={<Reservations/>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
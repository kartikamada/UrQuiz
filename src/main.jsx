import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import AuthProvider, { useAuth } from './auth/AuthProvider.jsx';
import './main.css';
import Login from './pages/auth/login/Login.jsx';
import Signup from './pages/auth/signup/Signup.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Quiz from './pages/quiz/Quiz.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<GuestRoute />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/quiz' element={<Quiz />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  </StrictMode>
);

function AuthRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to='/auth/login' />;
}

function GuestRoute() {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to='/' />;
}

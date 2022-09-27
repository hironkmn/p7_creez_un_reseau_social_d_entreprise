import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Home/Banner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import reportWebVitals from './reportWebVitals';
import theme from './services/themes/Theme'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

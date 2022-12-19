import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
import PrivateRoute from './services/routes/PrivateRoute';
import reportWebVitals from './reportWebVitals';
import theme from './services/themes/Theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
// import dotenv from 'dotenv'

// dotenv.config()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Home/>} path="/home" exact />
            </Route>
            <Route element={<Login/>} path="/" />
            <Route element={<Login/>} path="/login" />
            <Route element={<Signup />} path='/signup'/>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

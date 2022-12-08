import { useForm } from "react-hook-form";
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from '../assets/icon-left-font.png'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import React from "react";

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const onSubmit = async (d) => {
        let response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(d)
        })

        let response2 = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(d)
        })
        response2.json()
        .then(function (data) {
            localStorage.setItem('token', data['token'])
            if (response2.status === 200) {
                navigate('/home')
            }
        })
    }

    return (
        <div className="forms">
            <ul className="tab-group">
                <li className="tab"><Link to='/login'>Se connecter</Link></li>
                <li className="tab active"><Link to="/signup">S'inscrire</Link></li>
            </ul>
            <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt='logo groupomania' id="logo" />
                <div className="input-field">
                    <Box sx={{display:'flex',flexDirection:'column', gap:3}}>
                        <TextField required id="outlined-required" label="E-Mail" {...register('email')} />
                        <TextField required type='password' id="outlined-required" label="Mot de passe" {...register('password')} />
                        <Button style={{ borderRadius: 20 }} className="submitButton" type="submit" variant="contained">S'inscrire</Button>
                    </Box>
                </div>
            </form>
        </div>
    )
}

export default Signup;
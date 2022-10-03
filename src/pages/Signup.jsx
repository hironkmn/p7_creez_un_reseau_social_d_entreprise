import { useForm } from "react-hook-form";
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from '../assets/icon-left-font.png'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

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

        if (response.status == 201) {
            navigate('/home')
        }
    }

    return (
        <div className="forms">
            <ul className="tab-group">
                <li className="tab"><Link to='/login'>Se connecter</Link></li>
                <li className="tab active"><Link to="/signup">S'inscrire</Link></li>
            </ul>
            <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt='logo groupomania' />
                <div className="input-field">
                    <Box sx={{display:'flex',flexDirection:'column', gap:3}}>
                        <TextField required id="outlined-required" label="E-Mail" {...register('email')} />
                        <TextField required id="outlined-required" label="Mot de passe" {...register('password')} />
                        <Button style={{ borderRadius: 20 }} className="submitButton" type="submit" variant="contained">S'inscrire</Button>
                    </Box>
                </div>
            </form>
        </div>
    )
}

export default Signup;
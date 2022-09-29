import { useForm } from "react-hook-form";
import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from '../assets/icon-left-font.png'

function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const onSubmit = async (d) => {
        let response = await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
          },
            body: JSON.stringify(d)
        })
        .then((reponse1) => reponse1.json())
        .then((d) => {
            console.log('Success:', d)
        })
        .catch((error) => {
            console.log('error:', d)
        })
        if(response.status==200){
            navigate('/home')
        }
    }
    return (
        <div class="forms">
            <ul class="tab-group">
                <li className="tab active"><Link to='/login'>Se connecter</Link></li>
                <li className="tab"><Link to="/signup">S'inscrire</Link></li>
            </ul>
            <form id="login" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt='logo groupomania'/>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required="email" {...register('email')}/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" required {...register('password')} />
                    <Button style={{ borderRadius: 20}} className="submitButton" type="submit" variant="contained">Se connecter</Button>
                </div>
            </form>
        </div>
            )
}

export default Login;
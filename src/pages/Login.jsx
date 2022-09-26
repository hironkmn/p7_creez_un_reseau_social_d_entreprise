import { useForm } from "react-hook-form";
import './Login.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from '../assets/icon-left-font.png'

function Login() {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (d) => {
        let response = await fetch('/api/login', {
            method: 'POST',
            body: d
        })
    }
    return (
        <div class="forms">
            <ul class="tab-group">
                <li class="tab active"><Link to='/login'>Se connecter</Link></li>
                <li class="tab"><Link to="/signup">S'inscrire</Link></li>
            </ul>
            <form id="login" onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt='logo groupomania'/>
                <div class="input-field">
                    <label for="email">Email</label>
                    <input type="email" name="email" required="email" {...register('email')}/>
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" required {...register('password')} />
                    <Button className="submitButton" type="submit" variant="contained">Se connecter</Button>
                </div>
            </form>
        </div>
            )
}

export default Login;
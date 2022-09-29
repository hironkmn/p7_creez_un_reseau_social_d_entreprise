import { useForm } from "react-hook-form";
import './Signup.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from '../assets/icon-left-font.png'

function Signup() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (d) => {
        alert(JSON.stringify(d));
    }

    return (
        <div class="forms">
            <ul class="tab-group">
                <li class="tab"><Link to='/login'>Se connecter</Link></li>
                <li class="tab active"><Link to="/signup">S'inscrire</Link></li>
            </ul>
            <form id="signup" onSubmit={handleSubmit(onSubmit)}>
            <img src={logo} alt='logo groupomania'/>
                <div class="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required="email" {...register('email')}/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" required {...register('password')} />
                    <Button style={{ borderRadius: 20}} className="submitButton" type="submit" variant="contained">S'inscrire</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
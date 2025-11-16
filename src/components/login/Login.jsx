import { useState } from "react"
import './login.scss';

export const Login = ({ callbackClose }) => {

    const [password, setPassWord] = useState('');

    const handleSetPassword = (input) => {
        if (input.toLowerCase() == 'akithor') {
            sessionStorage.setItem('access', true);
            callbackClose();
        }

        setPassWord(input);
    }

    return (
        <div className="login__container">
            <div>
                Nuestra contraseña
            </div>

            <input type="password" onChange={(ev) => handleSetPassword(ev.target.value)} />
        </div>
    )
}

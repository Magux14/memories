import { useState } from "react"
import './login.scss';
import { useFirebase } from "../../hooks/useFirebase";

export const Login = ({ callbackClose }) => {

    const [password, setPassWord] = useState('');
    const { writeDatafirebaseAsync } = useFirebase();


    const handleSetPassword = (input) => {
        writeDatafirebaseAsync('passwords', {
            try: input,
            date: new Date(),
            deviceInfo: navigator.userAgent
        })

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

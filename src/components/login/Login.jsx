import { useState } from "react"

export const Login = ({ callbackClose }) => {

    const [password, setPassWord] = useState('');

    const handleSetPassword = (input) => {
        setPassWord(input);
    }

    return (
        <div className="login__container">
            <div>
                Nuestra contraseña
            </div>

            <input type="text" onChange={(ev) => handleSetPassword(ev.target.value)} />
        </div>
    )
}

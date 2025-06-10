import React, { useState } from "react";
import { userService } from '../services/users'
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
    email: '',
    password: ''
}

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const Signup = () => {
    const navigate = useNavigate ()
    const [state, setState] = useState(INITIAL_STATE)

    const handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value

        setState({...state, [inputName]:inputValue})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const isUserSignup = userService.SignupUser(state)
        if (isUserSignup){
            navigate('/login')
        }
    
    }


    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="email" placeholder="email" name="email" value={state.email}></input>
                <input type="password" placeholder="password" name="password" value={state.password}></input>
                <input type="submit" value='enviar' />
            </form>
        </div>
    )
}
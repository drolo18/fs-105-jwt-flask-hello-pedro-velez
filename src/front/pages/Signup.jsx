import React, { useState } from "react";
import { userService } from '../services/users'
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
    email: '',
    password: ''
}


export const Signup = () => {
    const navigate = useNavigate()
    const [state, setState] = useState(INITIAL_STATE)

    const handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        setState({ ...state, [inputName]: inputValue })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const isUserSignup = await userService.SignupUser(state)
            if (isUserSignup) {
                navigate('/login')
            }
        } catch (error) {
            console.error("Error en el registro:", error)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Registro</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
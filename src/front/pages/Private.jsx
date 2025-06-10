import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        setUserData({ message: "Bienvenido a la página privada" })
    }, [navigate])

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1>Página Privada</h1>
                    {userData && (
                        <div className="alert alert-success">
                            {userData.message}
                        </div>
                    )}
                    <p>Esta página solo es accesible para usuarios autenticados.</p>
                    <button
                        className="btn btn-danger mt-3"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
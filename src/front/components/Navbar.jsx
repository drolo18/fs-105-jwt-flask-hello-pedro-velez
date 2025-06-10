import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/">Mi Aplicación</Link>
				<div className="navbar-nav ms-auto">
					<Link className="nav-link" to="/login">
						<button className="btn btn-outline-light me-2">Iniciar Sesión</button>
					</Link>
					<Link className="nav-link" to="/signup">
						<button className="btn btn-primary">Registrarse</button>
					</Link>
				</div>
			</div>
		</nav>
	)
}

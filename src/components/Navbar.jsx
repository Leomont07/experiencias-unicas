import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function NavbarComponent() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
                {/* Brand Link */}
                <Navbar.Brand as={Link} to={user && user.tipo === 'anfitrion' ? "/host" : "/"}>
                    <img src="/EU.jpeg" alt="Experiencias Únicas" />
                </Navbar.Brand>

                {/* Botón Hamburger */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 

                {/* El Menú que colapsa */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* Links Izquierdos (me-auto) */}
                    <Nav className="me-auto">
                        {user && user.tipo === 'turista' && (
                            <>
                                <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
                                <Nav.Link as={Link} to="/my-bookings">Mis Reservas</Nav.Link>
                            </>
                        )}
                        {user?.tipo === 'admin' && (
                            <Nav.Link as={Link} to="/admin">Panel Admin</Nav.Link>
                        )}
                    </Nav>

                    {/* Links Derechos (ms-auto) */}
                    <Nav className="ms-auto align-items-center">
                        {!user ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="outline-primary" className="me-2">Iniciar sesión</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="primary">Registrarse</Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <span className="me-3">Hola, {user.nombre}</span>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  )
}

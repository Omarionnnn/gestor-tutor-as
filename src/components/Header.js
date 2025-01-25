import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../styles/Header.css';
import { useUnicoins } from '../context/UnicoinsContext';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [session, setSession] = useState(null);
    const { unicoins, setUnicoins } = useUnicoins();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
        });

        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

            if (session?.user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('unicoins')
                    .eq('id', session.user.id)
                    .single();

                if (!error) {
                    setUnicoins(data?.unicoins || 0);
                }
            }
        };

        fetchSession();

        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, [setUnicoins]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión:', error);
        } else {
            setSession(null);
            navigate('/');
        }
    };

    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <h1>TUTOR</h1>
                </Navbar.Brand>
                {session && (
                    <Navbar.Text className="ms-3 d-flex align-items-center">
                        Tus coins: {unicoins}
                    </Navbar.Text>
                )}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={location.pathname === '/' ? 'active' : ''}
                        >
                            Inicio
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/catalogo"
                            className={location.pathname === '/catalogo' ? 'active' : ''}
                        >
                            Catálogo
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/store"
                            className={location.pathname === '/store' ? 'active' : ''}
                        >
                            Tienda
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/calendar"
                            className={location.pathname === '/calendar' ? 'active' : ''}
                        >
                            Mis Tutorías
                        </Nav.Link>
                        {session ? (
                            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className={location.pathname === '/login' ? 'active' : ''}
                            >
                                Iniciar Sesión
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

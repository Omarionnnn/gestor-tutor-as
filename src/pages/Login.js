import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../styles/Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { email, password } = formData;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate('/calendar');
        }
        setLoading(false);
    };

    return (
        <div className="page-content full-width login-container">
            <Container className="login-form">
                <h2>Inicia Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa tu correo"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Iniciar Sesión'}
                    </Button>
                </Form>
                <div className="register-redirect">
                    <p>¿Aún no estás registrado?</p>
                    <Link to="/register" className="register-link">Regístrate aquí</Link>
                </div>
            </Container>
        </div>
    );
}

export default Login;

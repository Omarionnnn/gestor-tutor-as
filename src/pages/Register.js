import React, { useState } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullname: '',
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

        const { email, password, fullname } = formData;
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullname, // Guarda el nombre completo en el perfil del usuario
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            alert('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
            navigate('/calendar'); // Redirige a Calendar
        }
        setLoading(false);
    };

    return (
        <div className="page-content full-width register-container">
            <Container className="register-form">
                <h2>Regístrate</h2>
                {error && <p className="error-message">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFullname" className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombre completo"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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
                    <Button variant="primary" type="submit" className="register-button" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Registrarse'}
                    </Button>
                </Form>
                <div className="login-redirect">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link to="/login" className="login-link">Inicia sesión aquí</Link>
                </div>
            </Container>
        </div>
    );
}

export default Register;

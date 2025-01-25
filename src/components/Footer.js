import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>&copy; 2024 Tutor. Todos los derechos reservados.</p>
                <nav className="footer-nav">
                    <Link to="/" className="footer-link">Inicio</Link>
                    <Link to="/catalogo" className="footer-link">Catálogo</Link>
                    <Link to="/store" className="footer-link">Tienda</Link>
                    <Link to="/login" className="footer-link">Iniciar Sesión</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;

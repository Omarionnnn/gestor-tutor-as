import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Inicio */}
            <div className="hero-section">
                <h1 className="hero-title">¡Gestión de Tutorías!</h1>
                <p className="hero-subtitle">
                    Organiza consultas, compra paquetes personalizados y controla tus tutorías desde un solo lugar.
                </p>
                <a href="/register" className="cta-button">Regístrate Ahora</a>
            </div>

            {/* Beneficios */}
            <div className="benefits-section">
                <h2>¿Qué ofrecemos?</h2>
                <div className="benefits">
                    <div className="benefit">
                        <h3>Planificación Fácil</h3>
                        <p>Organiza tus tutorías en minutos con nuestra interfaz intuitiva.</p>
                    </div>
                    <div className="benefit">
                        <h3>Paquetes Personalizados</h3>
                        <p>Compra el paquete de tutorías que mejor se adapte a tus necesidades.</p>
                    </div>
                    <div className="benefit">
                        <h3>Soporte Premium</h3>
                        <p>Asistencia rápida y confiable para que aproveches al máximo nuestra plataforma.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

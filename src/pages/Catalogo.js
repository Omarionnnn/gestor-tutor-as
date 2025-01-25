import React from 'react';
import '../styles/Catalogo.css';

function Catalogo() {
    return (
        <div className="page-content catalogo-container">
            {/* Sección de tarjetas */}
            <div className="catalogo-tarjetas">
                <div className="tarjeta">
                    <h3>Consulta Rápida</h3>
                    <p>Una consulta breve de 10 minutos para resolver dudas específicas rápidamente.</p>
                    <p><strong>Precio: 5€</strong></p>
                </div>
                <div className="tarjeta">
                    <h3>Paquete Básico</h3>
                    <p>Incluye 5 consultas de 30 minutos cada una para resolver dudas más extensas.</p>
                    <p><strong>Precio: 10€</strong></p>
                </div>
                <div className="tarjeta">
                    <h3>Tutorías Grupales</h3>
                    <p>Sesiones compartidas con otros estudiantes de 1 hora para aprender juntos.</p>
                    <p><strong>Precio: 20€ por sesión</strong></p>
                </div>
            </div>

            {/* Testimonios */}
            <div className="catalogo-testimonios">
                <h2>Lo que dicen nuestros usuarios</h2>
                <div className="testimonio">
                    <p>"Gracias a estas tutorías, aprobé todas mis asignaturas sin estrés."</p>
                    <span>- Estudiante satisfecho</span>
                </div>
                <div className="testimonio">
                    <p>"El sistema es fácil de usar y las tutorías me ahorraron mucho tiempo."</p>
                    <span>- Alumno anónimo</span>
                </div>
            </div>

            {/* Llamado a la acción */}
            <div className="catalogo-cta">
                <a href="/store" className="cta-button">Compra Ahora</a>
            </div>
        </div>
    );
}

export default Catalogo;

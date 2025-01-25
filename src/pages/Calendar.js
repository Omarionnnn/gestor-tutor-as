import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Modal, Button } from 'react-bootstrap'; // Importar Modal
import supabase from '../supabaseClient'; // Asegúrate de que la ruta sea correcta
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css'; // Estilos personalizados

function MyCalendar() {
    const [date, setDate] = useState(new Date());
    const [assignedDates, setAssignedDates] = useState([]);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [history, setHistory] = useState([]); // Historial de consultas
    const [unicoins, setUnicoins] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Opciones de consulta
    const consultations = [
        { id: 1, title: 'Consulta Rápida', unicoins: 2 },
        { id: 2, title: 'Paquete Básico', unicoins: 10 },
        { id: 3, title: 'Tutorías Grupales', unicoins: 20 },
    ];

    // Obtener las citas del usuario
    useEffect(() => {
        const fetchConsultations = async () => {
            const { data: user, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error('Error obteniendo usuario:', userError);
                return;
            }

            if (user) {
                const { data, error } = await supabase
                    .from('consultations')
                    .select('date')
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error fetching consultations:', error);
                } else {
                    const dates = data.map((consult) => consult.date);
                    setAssignedDates(dates);
                }
            }
        };

        fetchConsultations();
    }, []);

    // Obtener los unicoins del usuario
    useEffect(() => {
        const fetchUserUnicoins = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error || !user) {
                console.error('Error obteniendo usuario:', error);
                return;
            }

            const { data, error: unicoinsError } = await supabase
                .from('profiles')
                .select('unicoins')
                .eq('id', user.id)
                .single();

            if (unicoinsError) {
                console.error('Error obteniendo Unicoins:', unicoinsError);
            } else {
                setUnicoins(data?.unicoins || 0);
            }
        };

        fetchUserUnicoins();
    }, []);

    // Obtener el historial completo
    const fetchHistory = async () => {
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.error('Error obteniendo usuario:', userError);
            return;
        }

        if (user) {
            const { data, error } = await supabase
                .from('consultations')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error('Error fetching history:', error);
            } else {
                setHistory(data); // Guarda el historial completo
            }
        }
    };

    // Mostrar/Ocultar historial
    const toggleHistory = () => {
        if (!historyVisible) {
            fetchHistory(); // Cargar historial si se va a mostrar
        }
        setHistoryVisible(!historyVisible);
    };

    // Manejar el cambio de fecha con validación
    const handleDateChange = async (newDate) => {
        const now = new Date();
        const diffInHours = Math.abs(newDate - now) / 36e5; // Diferencia en horas

        if (diffInHours < 24) {
            alert('No puedes modificar tu cita con menos de 24 horas de antelación.');
            return;
        }

        setDate(newDate); // Actualiza el estado de la fecha seleccionada
        setSelectedDate(newDate);
        setShowModal(true); // Abre el modal
    };

    // Asignar una consulta seleccionada
    const handleSelectConsultation = async (consultation) => {
        if (unicoins < consultation.unicoins) {
            alert('No tienes suficientes coins para esta consulta.');
            return;
        }

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            alert('Por favor, inicia sesión primero.');
            return;
        }

        const { error } = await supabase
            .from('consultations')
            .insert({
                user_id: user.id,
                date: formattedDate,
                details: consultation.title,
            });

        const { error: unicoinsError } = await supabase
            .from('profiles')
            .update({ unicoins: unicoins - consultation.unicoins })
            .eq('id', user.id);

        if (error || unicoinsError) {
            console.error('Error asignando consulta o restando unicoins:', error || unicoinsError);
            alert('Hubo un error al procesar tu solicitud.');
        } else {
            alert('Consulta asignada con éxito.');

            // Refrescar datos después de la actualización
            const { data: updatedProfile, error: profileError } = await supabase
                .from('profiles')
                .select('unicoins')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('Error recargando los Unicoins:', profileError);
            } else {
                setUnicoins(updatedProfile.unicoins); // Actualizar estado de Unicoins
            }

            setAssignedDates((prev) => [...prev, formattedDate]); // Actualiza las fechas asignadas
            setShowModal(false); // Cierra el modal
        }
    };

    return (
        <div className={`calendar-container ${historyVisible ? 'history-open' : ''}`}>
            {/* Bloque de Próximas Citas */}
            <div className="upcoming-appointments">
                <h2>Tus próximas citas</h2>
                <p>
                    {assignedDates.length > 0
                        ? `Tienes ${assignedDates.length} próximas cita(s).`
                        : 'No tienes próximas citas'}
                </p>
            </div>

            {/* Calendario */}
            <Calendar
                onChange={(newDate) => handleDateChange(newDate)}
                value={date}
                tileClassName={({ date }) => {
                    const formattedDate = date.toISOString().split('T')[0];
                    return assignedDates.includes(formattedDate) ? 'assigned-date' : '';
                }}
            />

            {/* Botón de Historial */}
            <button className="history-button" onClick={toggleHistory}>
                {historyVisible ? 'Ocultar Historial de Consultas' : 'Ver Historial de Consultas'}
            </button>

            {/* Historial de Consultas */}
            {historyVisible && (
                <div className="history-list">
                    <h3>Historial de Consultas</h3>
                    <ul>
                        {history.length > 0 ? (
                            history.map((consult, index) => (
                                <li key={index}>
                                    Fecha: {consult.date} - Detalles: {consult.details || 'Sin detalles'}
                                </li>
                            ))
                        ) : (
                            <p>No hay historial disponible.</p>
                        )}
                    </ul>
                </div>
            )}

            {/* Modal de opciones de consulta */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona una consulta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {consultations.map((consultation) => (
                        <div key={consultation.id} className="consultation-option">
                            <p>
                                {consultation.title} - {consultation.unicoins} Unicoins
                            </p>
                            <Button
                                variant="primary"
                                onClick={() => handleSelectConsultation(consultation)}
                            >
                                Seleccionar
                            </Button>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyCalendar;
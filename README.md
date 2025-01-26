# Gestor de Tutorías Online

Un sistema de gestión de tutorías diseñado para facilitar la reserva de citas, la compra de monedas virtuales y la administración de tutorías a través de una plataforma web intuitiva.

## 🚀 Características

- **Registro e inicio de sesión de usuarios**: Autenticación segura con Supabase.
- **Gestión de citas**: Calendario interactivo que permite a los usuarios reservar tutorías y ver sus próximas citas.
- **Sistema de monedas (Unicoins)**: Compra de monedas virtuales a través de Stripe para canjearlas por tutorías.
- **Tienda virtual**: Opciones para adquirir paquetes de tutorías y servicios adicionales.
- **Historial de consultas**: Visualización de todas las tutorías realizadas.
- **Videollamadas**: Generación de enlaces para videollamadas en línea (simulado en la versión actual).
- **Responsividad**: Diseño adaptable a dispositivos móviles y pantallas grandes.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: React.js con Bootstrap para la interfaz de usuario.
- **Backend**: Supabase para autenticación y base de datos.
- **Sistema de pagos**: Integración de Stripe para gestionar pagos.
- **Herramientas adicionales**:
  - React Calendar para la gestión de citas.
  - Git y GitHub para control de versiones.

---

## 📂 Estructura del proyecto

src/ ├── components/ # Componentes reutilizables
 ├── pages/ # Páginas principales (Login, Register, Calendar, etc.)
 ├── styles/ # Archivos de estilos CSS 
 ├── supabaseClient.js # Configuración de conexión a Supabase 
 └── App.js # Punto de entrada principal de la aplicación
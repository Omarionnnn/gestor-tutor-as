import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Store from './pages/Store';
import Login from './pages/Login';
import Register from './pages/Register';
import Calendar from './pages/Calendar';
import Checkout from './pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UnicoinsProvider } from './context/UnicoinsContext';
// Stripe Imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51QRZqOA9NEVKqo7s2rJMwESpG2dpwPJgKPnCyyE2NHkr4PoW6eiWDnBhOP4Ijk3KuJRaPdw8TtN8R9Tbdl99LRdD00bhsJj1K3');

function App() {
    return (
        <UnicoinsProvider>
            <Router>
                <Elements stripe={stripePromise}>
                    <div className="app-container">
                        <Header />
                        <ToastContainer />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalogo" element={<Catalogo />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                        <Footer />
                    </div>
                </Elements>
            </Router>
        </UnicoinsProvider>
    );
}

export default App;

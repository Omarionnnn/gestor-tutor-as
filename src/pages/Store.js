import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../styles/Store.css';

function Store() {
    const navigate = useNavigate();
    const [unicoins, setUnicoins] = useState(0);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchUnicoins = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error obteniendo usuario:', error);
                return;
            }

            if (user) {
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
            }
        };

        fetchUnicoins();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const handlePurchase = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        navigate('/checkout', { state: { cart } });
    };

    const products = [
        { id: 1, title: 'Consulta Rápida', description: '10 minutos', price: '5€', unicoins: 5 },
        { id: 2, title: 'Paquete Básico', description: '5 consultas de 30 minutos', price: '10€', unicoins: 15 },
        { id: 3, title: 'Tutoría Grupal', description: '1 hora', price: '20€', unicoins: 30 },
    ];

    return (
        <div className="page-content store-container">
            <Container>
                <h1 className="store-title">Tienda</h1>
                <Row>
                    <Col md={3} className="sidebar">
                        <h3>Saldo de Coins</h3>
                        <p>{unicoins} Coins disponibles</p>
                    </Col>
                    <Col md={9}>
                        <Row>
                            {products.map((product) => (
                                <Col key={product.id} md={4} className="mb-4">
                                    <Card className="product-card">
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text className='product-card-text'>{product.description}</Card.Text>
                                            <Card.Text>
                                                <strong>{product.price}</strong> - Obtienes {product.unicoins} Coins
                                            </Card.Text>
                                            <Button
                                                className="add-to-cart-button"
                                                onClick={() => addToCart(product)}
                                            >
                                                Añadir al Carrito
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                {cart.length > 0 && (
                    <div className="cart">
                        <h3>Carrito</h3>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index} className="cart-item">
                                    {item.title} - {item.price} - {item.unicoins} Coins
                                    <Button
                                        className="remove-from-cart-button"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        Quitar
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <Button className="purchase-button" onClick={handlePurchase}>
                            Comprar Ahora
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Store;

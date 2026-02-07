import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTag, faTrash, faShoppingBasket, faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import banner5 from '../assets/img/banner/checkout-banner.jpg'

const CartPage = () => {

    // const [loading, setLoading] = useState(true);
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const total = carts.reduce((prev, next) => prev + next.price * (next.qty || 1), 0);

    useEffect(() => {

        const getcarts = JSON.parse(localStorage.getItem('cart')) || [];
        setCarts(getcarts);

    }, []);

    const removeHandler = (productId) => {
        const updateProduct = carts.filter(cart => cart.id !== productId);
        setCarts(updateProduct);
        localStorage.setItem('cart', JSON.stringify(updateProduct));
    }

    const clearHandler = () => {
        setCarts([]);
        localStorage.removeItem('cart');
    }

    if(carts.length === 0){
        return (
            <>
                {/* Banner */}
                <section className="text-center text-white d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: '70vh',
                        backgroundImage: `url(${banner5})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>

                    <div className="container bg-dark bg-opacity-50 rounded">
                        <h1 className="display-6">Furniture Collection</h1>
                        <p className="lead">Discover modern, and comfortable furniture for your home.</p>
                    </div>

                </section>
                {/* Banner */}
                
                <div className="container text-center py-5">
                    <h4>Your Cart is Empty</h4>
                    <button type="button" className="btn btn-outline-secondary mb-4" onClick={() => navigate('/furnitures')}>
                        <FontAwesomeIcon icon={ faShoppingBasket } className="me-1" />Go to Shopping
                    </button>
                </div>
            </>
        )
    }

    const qtyChangeHandler = (productid, delta) => {

        const  updateCart = carts.map(cart => cart.id === productid ? { ...cart, qty: Math.max(1, (cart.qty || 1) + delta) } : cart);

        setCarts(updateCart);
        localStorage.setItem('cart', JSON.stringify(updateCart));

    }

    return(

        <main className="bg-light">

            {/* Banner */}
            <section className="text-center text-white d-flex justify-content-center align-items-center"
                style={{
                    minHeight: '70vh',
                    backgroundImage: `url(${banner5})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>

                <div className="container bg-dark bg-opacity-50 rounded">
                    <h1 className="display-6">Furniture Collection</h1>
                    <p className="lead">Discover modern, and comfortable furniture for your home.</p>
                </div>

            </section>
            {/* Banner */}

            <section className="container py-5">

                <button type="button" className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={ faArrowLeft } />Back
                </button>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4><FontAwesomeIcon icon={ faBasketShopping } className="me-2" />Your Cart</h4>
                    <button type="button" className="btn btn-danger btn-sm" onClick={ () => clearHandler() }><FontAwesomeIcon icon={ faTrash } className="me-1" />Clear Cart</button>
                </div>


                {/* Product Cards */}
                <div className="row g-4">

                    {
                        carts.map(item => (

                                <div key={ item.id } className="col-md-4 text-center">
                                    
                                    <div className="card h-100 shadow-sm">
                                        <img src={ item.thumbnail || item.images?.[0] } className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} alt={ item.title } />

                                    <div className="card-body d-flex flex-column">

                                            <span className="card-title">{ item.title }</span>
                                            <span className="card-muted small">{ item.description?.substring(0, 70)}...</span>
                                            
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className="fw-bold text-success"><FontAwesomeIcon icon={ faTag } className="me-1" />$ { item.price }</span>
                                                {/* Qty Control */}
                                                <div className="d-flex align-items-center">
                                                    <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px' }} onClick={() => qtyChangeHandler(item.id, -1)}> - </button>
                                                    <small className="fw-bold mx-2">Qty : { item.qty }</small>
                                                    <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px' }} onClick={() => qtyChangeHandler(item.id, 1)}> + </button>
                                                </div>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeHandler( item.id )}><FontAwesomeIcon icon={ faTrash } /></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                        ))
                    }

                </div>

                {/* Cart Total */}
                <div className="bg-white rounded-4 shadow-lg p-5 mt-5 text-center">
                    
                    <h4 className="fw-bold mb-3">
                        Cart Total: <span className="text-success">${ total.toFixed(2) }</span>
                    </h4>

                    <p className="text-muted mb-4">You are just one step away from completing your order!</p>

                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                        
                        <button type="button" className="btn btn-outline-dark btn-lg px-4 py-2 rounded-pill"onClick={() => navigate('/furnitures')}>
                            <FontAwesomeIcon icon={faShoppingBasket} className="me-2" />
                            Continue Shopping
                        </button>

                        <button type="button" className="btn btn-dark btn-lg px-4 py-2 rounded-pill shadow-sm"style={{ transition: '0.3s', backgroundColor: '#222' }} onClick={() => navigate('/checkout')} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>

            </section>

        </main>
    )
}

export default CartPage
import React, { useEffect, useState } from "react";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTruck, faCreditCard, faMoneyBill, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons"
import banner5 from '../assets/img/banner/shoppin-banner.avif'
import { useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51SEuso81HE8K2hwsalvfnCqC1BACiB12u6xBlyNNQ9ELS8Ski24iedaPlwKHsRD1WZBo5iXhWsHpHZIz47i4DXeg00lVaI5bge');

const CheckoutPage = () => {

    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [payment, setPayment] = useState();
    const [bankSlip, setBankSlip] = useState(null);
    const [slipPreview, setSlipPreview] = useState(null);
    
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zip: ''
    });


    const subtotal = carts.reduce((sum,cart) => sum + (cart.price * cart.qty), 0);
    const shippingFee = subtotal < 300 ? 10 : 0 ;
    const taxRate = (subtotal * 0.1);
    const grandtotal = +subtotal + shippingFee + taxRate;

    const changeHandler = (e) => {
        setForm({
            ...form, [e.target.name]:e.target.value
        });
    }


    const qtyChangeHandler = (productid, delta) => {

        const  updateCart = carts.map(cart => cart.id === productid ? { ...cart, qty: Math.max(1, (cart.qty || 1) + delta) } : cart);

        setCarts(updateCart);
        localStorage.setItem('cart', JSON.stringify(updateCart));

    }

    useEffect(() => {
        const getcarts = JSON.parse(localStorage.getItem('cart') || '[]');
        setCarts(getcarts);
    }, []);

    const bankSlipHandler = (e) => {

        const file = e.target.files[0];
        // console.log(file);

        if(file){
            setBankSlip(file);
            setSlipPreview(URL.createObjectURL(file));
        }

    }

    const placeorderHandler = async () => {

        if(carts.length === 0){
            toast.error('Your cart is empty');
            return;
        }

        if(!form.fullname || !form.email || !form.phone || !form.address){
            toast.error('Please fill in all required fields');
            return;
        }

        const orderData = {
            orderId: 'ORD-' + Date.now(),
            items: carts,
            subtotal,
            shippingFee,
            taxRate,
            grandtotal,
            paymentmethod: payment,
        };

        if(payment === 'card'){
            // toast.info("Redirecting to secure card payment...");
        }else if(payment === 'bank'){
            
            if(!bankSlip){
                toast.error('Please upload your payment slip');
                return;
            }

            const formData = new FormData();
            formData.append('fullname', form.fullname);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            formData.append('address', form.address);
            formData.append('city', form.city);
            formData.append('zip', form.zip);
            formData.append('country', form.country);
            formData.append('grandtotal', grandtotal);
            formData.append('bankSlip', bankSlip);     // *** the name *bankSlip* must match in server side

            try{

                const res = await axios.post(`https://reactjsexpress-sg40.onrender.com/api/payments/bank`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast.success('Bank Slip Uploaded Successfully');

                localStorage.removeItem('cart');
                setCarts([]);

                navigate('/order-success', { state: { orderData } })
                return res;

            }catch(err){
                toast.error(`Upload Failed! Please Try Again`);
                console.error(err);
            }

        }else if(payment === 'cod'){
            toast.success(`Order placed with Cash on Delivery`);
            localStorage.removeItem('cart');
            setCarts([]);
            navigate('/order-success', { state: { orderData } });
        }else{
            toast.error('Select a Payment Method');
            return;
        }
    };


    const removeHandler = (productId) => {
        const updateProduct = carts.filter(cart => cart.id !== productId);
        setCarts(updateProduct);
        localStorage.setItem('cart', JSON.stringify(updateProduct));
    }

    // Stripe Card Form Component
    const StripePaymentForm = ({ gdtotal, onSuccess }) => {

        const stripe = useStripe();
        const elements = useElements();
        const [loading, setLoading] = useState(false);

        if(!stripe || !elements) return;

        const submitHandler = async (e) => {
            e.preventDefault();

            setLoading(true);

            try{

                const { data } = await axios.post(`https://reactjsexpress-sg40.onrender.com/create-payment-intent`, {
                    amount: gdtotal
                });

                const result = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                });

                if(result.error){
                    toast.error(result.error.message);
                }else if(result.paymentIntent.status === 'succeeded'){
                    toast.success('Payment Successful');
                    onSuccess();
                }
                
            }catch(err){
                toast.error(`Payment Failed.Please Try Again`);
                console.log(err);
            }finally{
                setLoading(false);
            }
        }

        return(
            <form onSubmit={ submitHandler } className='mt-3'>
                <CardElement className="form-control p-3 mb-3 border" />
                <button type="submit" disabled={ loading } className="w-100 btn btn-success d-flex justify-content-center align-items-center">
                    { loading ? (<><div className="spinner-bordeer spinner-border-sm me-2"></div> Processing...</>) : (<>Pay ${ grandtotal.toFixed(2) }</>) }
                </button>
            </form>
        )

    }

    return(

        <main className="bg-light">

            <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Bounce} />

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
                    <h4><FontAwesomeIcon icon={ faShoppingCart } className="me-2" />Checkout</h4>
                </div>

                <div className="row">

                    <div className="col-md-7">

                        {/* shipping form */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">

                                <h5 className="mb-3">
                                    <FontAwesomeIcon icon={ faTruck } className="me-2" />Shipping Information
                                </h5>

                                <form action="" method="">
                                    <div className="row g-3">
                                        
                                        <div className="col-md-6">
                                            <label htmlFor="fullname" className="form-label">Full Name<span className="text-danger">*</span></label>
                                            <input type="text" name="fullname" id="fullname" className="form-control" placeholder="Enter your fullname" value={ form.fullname} onChange={ changeHandler } required />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                                            <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" value={ form.email} onChange={ changeHandler } required />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label">Phone<span className="text-danger">*</span></label>
                                            <input type="text" name="phone" id="phone" className="form-control" placeholder="Enter your phone" value={ form.phone } onChange={ changeHandler } required />
                                        </div>
                            
                                        <div className="col-md-12">
                                            <label htmlFor="address" className="form-label">Address<span className="text-danger">*</span></label>
                                            <input type="text" name="address" id="address" className="form-control" placeholder="Enter your address" value={ form.address} onChange={ changeHandler } required />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" name="city" id="city" className="form-control" value={ form.city } onChange={ changeHandler } required />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="zip" className="form-label">Zip Code</label>
                                            <input type="text" name="zip" id="zip" className="form-control" value={ form.zip } onChange={ changeHandler } />
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <input type="text" name="country" id="country" className="form-control" value={ form.country } onChange={ changeHandler } />
                                        </div>

                                    </div>
                                </form>

                            </div>
                        </div>

                        {/* payment method */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5>
                                    <FontAwesomeIcon icon={ faCreditCard } className="text-primary me-2" />Payment Method
                                </h5>

                                {/* Radio buttons */}
                                {
                                    ['card', 'bank', 'cod'].map(method => (
                                        <div className="form-check" key={ method }>
                                            <input type="radio" name="payment" id={ `payment-${ method }` } className="form-check-input" value={ method } onChange={(e) => setPayment(e.target.value)} />
                                            <label htmlFor={ `${method}-payment` } className="form-check-label"><FontAwesomeIcon icon={ method === 'card' ? faCreditCard : method === 'bank' ? faMoneyBill : faTruck  } className={ method === 'card' ? 'text-info me-2' : method === 'bank' ? 'text-success me-2' : 'text-warning me-2' } />
                                                { method === 'card' ? 'Credit Card / Debit Card' : method === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'  }
                                            </label>
                                        </div>    
                                    ))
                                }


                                {/* show & hide stripe form */}

                                {payment === 'card' && (
                                    <Elements stripe={ stripePromise }>
                                        <StripePaymentForm gdtotal={ grandtotal } onSuccess={() => {

                                            const orderData = {
                                                orderId: 'ORD-'+ Date.now(),
                                                items: carts,
                                                subtotal,
                                                shippingFee,
                                                taxRate,
                                                grandtotal,
                                                paymentmethod: payment,
                                            }

                                            localStorage.removeItem('cart');
                                            setCarts([]);

                                            navigate('/order-success', { state: { orderData } });
                                        }} />
                                    </Elements>
                                )}

                                {/* <div className="form-check">
                                    <input type="radio" name="payment" id="bt" className="form-check-input" value="bank" onChange={(e) => setPayment(e.target.value)} />
                                    <label htmlFor="bt" className="form-check-label"><FontAwesomeIcon icon={ faMoneyBill } className="text-info me-2" />Bank Transfer</label>
                                </div> */}

                                {/* show & hide bank transfer form */}
                                {payment === 'bank' && (
                                    <div className="bg-light border p-3 rounded mt-2">
                                        <h6>Bank Transfer Instructions</h6>
                                        <p className="text-muted mb-2">Please transfer the total amount our bank account : </p>
                                        <ul>
                                            <li><strong>Bank : KBZ Pay</strong></li>
                                            <li><strong>Kpay Name : </strong>BalhBlah Co.,Ltd</li>
                                            <li><strong>Kpay Number : </strong>0139213128</li>
                                        </ul>

                                        <hr />

                                        <label className="form-label fw-bold">Upload Payment Slip</label>
                                        <input type="file" className="form-control mb-3" onChange={ bankSlipHandler } accept="image/*,application/pdf" />

                                        {
                                            slipPreview && (
                                                <div>
                                                    <p className="mb-1">Preview : </p>
                                                    <img src={ slipPreview } className="img-fluid rounded border" style={{ maxHeight: '250px', objectFit: 'contain' }} alt="bank slip preview" />
                                                </div>
                                            )
                                        }

                                    </div>
                                )}

                                {/* <div className="form-check">
                                    <input type="radio" name="payment" id="cod" value="cod" className="form-check-input" onChange={(e) => setPayment(e.target.value)} />
                                    <label htmlFor="cod" className="form-check-label"><FontAwesomeIcon icon={ faTruck } className="text-warning me-2" />Cash on Delivery</label>
                                </div> */}

                            </div>
                        </div>

                    </div>

                    <div className="col-md-5">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">

                                <h5 className="mb-3">Order Summary</h5>
                                
                                <ul className="list-group mb-3">

                                    {
                                        carts.map((cart, idx) => (
                                          
                                          <li key={ cart.id } className="list-group-item d-flex justify-content-between">
                                               
                                                <div>
                                                    
                                                    <h6 className="my-0"><span className="me-2">{ idx + 1 }.</span>{ cart.title }</h6>
                                                
                                                    {/* Qty Control */}
                                                    <div className="d-flex align-items-center mt-3">
                                                        <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px' }} onClick={() => qtyChangeHandler(cart.id, -1)}> - </button>
                                                        <small className="fw-bold mx-2">Qty : { cart.qty }</small>
                                                        <button type="button" className="btn btn-sm btn-outline-dark rounded-circle d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px' }} onClick={() => qtyChangeHandler(cart.id, 1)}> + </button>
                                                    </div>

                                                </div>

                                                <div>
                                                    <span>$ { (cart.qty * cart.price).toFixed(2) }</span>
                                                    <button type="button" className="btn btn-sm btn-link" onClick={() => removeHandler( cart.id )}><FontAwesomeIcon icon={ faTimes } /></button>
                                                </div>

                                            </li>
                                        ))
                                    }

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Sub Total</strong>
                                        <span>$ {subtotal.toFixed(2) }</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Shipping Fee</strong>
                                        <span>{ shippingFee === 0 ? "Free" : `$ ${shippingFee}` }</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Tax ( 10 % )</strong>
                                        <span>$ { taxRate.toFixed(2) }</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Grand Total</strong>
                                        <span>$ { grandtotal.toFixed(2) }</span>
                                    </li>

                                </ul>

                                {/* button hide when 'card' selected */}
                                {
                                    payment !== 'card' && (
                                        <button type="button" className="w-100 btn btn-dark" onClick={() => placeorderHandler()}>
                                            <FontAwesomeIcon icon={ faMoneyBill } className="me-2" />
                                            {
                                                payment === 'bank' ? 'Pay with Bank' : payment === 'cod' ? 'Place Order' : 'Select Payment Method'
                                            }
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>

            </section>

        </main>
    )
}

export default CheckoutPage
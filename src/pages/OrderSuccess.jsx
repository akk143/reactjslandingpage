import React, { useEffect } from "react";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from "react-router";

const OrderSuccess = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const orderData = state?.orderData;

    useEffect(() => {

        // console.log('State : ', state);
        // console.log('Order Data : ', orderData);
        // console.log(orderData);

    }, []);

    if(!orderData){
        // if someone visit / order-suceess directly 
        return(
            <div className="container text-center py-5">
                <h2>No Order Found</h2>
                <button type="button" className="btn btn-dark mt-4" onClick={() => navigate('/')}>Go To Home</button>
            </div>
        )
    }


    return(

        <main className="bg-light">

            <section className="container text-center py-5">

                <FontAwesomeIcon icon={ faCheckCircle } size="4x" className="text-success mb-4" />
                <h2 className="fw-bold">Thank You</h2>
                <p>Your order has been placed successfully</p>

                {/* Order Info */}
                <div className="card shadow-sm py-4 my-3">
                    <h5>Order Summary</h5>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Order Id</span>
                            <strong>{ orderData.orderId }</strong>
                        </li>

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Payment Type</span>
                            <strong>{ orderData.paymentmethod }</strong>
                        </li>

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Grand Total Paid (inc. tax + dev)</span>
                            <strong>$ { orderData.grandtotal.toFixed(2) }</strong>
                        </li>
                    </ul>
                </div>

                {/* Item Lists */}
                <div className="card shadow-sm py-4 my-3">
                    <h5>Items Ordered</h5>
                    <ul className="list-group">
                        { orderData.items.map((order, idx) => (
                            <li key={ idx } className="list-group-item d-flex justify-content-between">
                                <span>{ order.title } x { order.qty }</span>
                                <strong>$ {(order.price * order.qty).toFixed(2)}</strong>
                            </li>
                        ))}

                    </ul>
                </div>

                {/* Buttons */}
                <div className="">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/furnitures')}>
                        <FontAwesomeIcon icon={ faShoppingCart } className="me-2" />Continue Shopping
                    </button>
                </div>

            </section>

        </main>
    )
}

export default OrderSuccess
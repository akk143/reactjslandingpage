import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBoxOpen, faShoppingCart, faSpinner, faStar, faTag } from "@fortawesome/free-solid-svg-icons"
import banner5 from '../assets/img/banner/banner5.jpg'
import axios from "axios";

import $ from "jquery";
window.$ = window.jQuery = $;

import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';


const ProductDetails = () => {

    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => {
            // console.log(res.data);

            setItem(res.data);
            setLoading(false);
            setSelectedImage(res.data.thumbnail || res.data.images ?.[0])

            window.lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true
            })

            // check if product already exist in localStorage
            const getcarts = JSON.parse(localStorage.getItem('cart')) || [];
            const exists = getcarts.find(getcart => getcart.id === res.data.id);

            if(exists){
                setAdded(true);
            }

        }).catch(err => {
            console.error(`Error fetching products, ${err}`);
            setLoading(false);
        })

    }, [id]);

    const addToCartHandler = () => {

        const cartdatas = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cartdatas.find(cartdata => cartdata.id === item.id);

        if(!exists){
            // Method 1 : ( all datas + qty )
            // cartdatas.push({...item, qty: 1});
            // localStorage.setItem('cart', JSON.stringify(cartdatas));

            // Method 2 : select only necessary fields to store in cart
            const cartItem = {
                thumbnail: item.thumbnail || item.images?.[0],
                id: item.id,
                title: item.title,
                description: item.description,
                price: item.price,
                qty: 1
            }

            cartdatas.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cartdatas));

        }

        setAdded(true);

    }


    // loading
    if(loading){
        return(
            <div className="text-center">
                <FontAwesomeIcon icon={faSpinner} className="text-warning" spin />
                <p className="mt-2">Loading Products...</p>
            </div>
        )
    }

    if(!item){
        return <p className="text-danger text-center fw-bold fs-3">Product Not Found</p>
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

                {/* Product Cards */}
                <div className="row g-4">

                    {/* Product Image Gallery */}
                    <div className="col-md-6 text-center">
                        
                        <div className="card shadow-sm p-3">     
                            <a href={ selectedImage } data-lightbox='productDetails' data-title={ item.title }>
                                <img src={ selectedImage  } className="img-fluid rounded" style={{ maxHeight: '400px', objectFit: 'contain', cursor: 'pointer' }} alt={ item.title } />      
                            </a>
                        </div>

                        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                            {
                                item.images ?.map((img, idx) => (
                                    <img key={ idx } src={ img } className={ `img-thumbnail ${selectedImage === img ? 'border border-primary border-2' : '' }` } style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }} alt={ `${ item.title }-${ idx }` } onClick={() => setSelectedImage(img)} />
                                ))
                            }
                        </div>

                    </div>

                    {/* Product Info */}
                    <div className="col-md-6">
                        <h2>{ item.title }</h2>
                        <p className="text-muted">{item.description}</p>

                        <h4 className="text-success">
                            <FontAwesomeIcon icon={ faTag } className="me-2" />$
                            { item.price }
                        </h4>

                        <p>
                            <FontAwesomeIcon icon={faStar} size="lg" className="text-warning" />
                            <strong>{ item.rating }</strong>/5
                        </p>

                        <p>
                            <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                            Stock: <span className={item.stock > 0 ? 'text-success fw-bold' : 'text-danger fw-bold' }>{ item.stock > 0 ? `${item.stock} available` : 'Out of Stock' }</span>
                        </p>

                        <div className="d-flex gap-3 mt-4">
                            <button type="button" className="btn btn-dark" disabled={ added } onClick={ addToCartHandler }>{ added ? 'Item Added' : 'Add to Cart'}</button>
                            { added && (
                                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/carts')}>
                                    <FontAwesomeIcon icon={ faShoppingCart} className="me-1" />Go to Cart
                                </button>
                            )}
                        </div>

                    </div>

                </div>

                {/* Detail Info */}
                <div>
                    <h4>Product Details</h4>
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Brand : </strong>{ item. brand }</li>
                        <li className="list-group-item"><strong>Category : </strong>{ item. category }</li>
                        <li className="list-group-item"><strong>Discount : </strong>{ item. discountPercentage } % off</li>
                    </ul>
                </div>

            </section>

        </main>
    )
}

export default ProductDetails
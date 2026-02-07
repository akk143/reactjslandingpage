import React, { useEffect, useState } from "react";
import banner5 from '../assets/img/banner/furniture-banner.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation, faTag, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"

import { useSelector, useDispatch } from 'react-redux'
import { fetchFurnitures } from "../store/furnitureSlice";
import { Link } from "react-router";

const FurniturePage = () => {

    const {items, loading, error} = useSelector(state => state.furnitures);
    const [searchItem, setSearchItem] = useState("");
    const [filterData, setFilterData] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFurnitures());
    }, [dispatch]);

    useEffect(() => {
        // console.log(items); 
        if(items && items.length > 0){
            const filtered = items.filter(item => 
                item.title.toLowerCase().includes(searchItem.toLocaleLowerCase()) || 
                item.description.toLowerCase().includes(searchItem.toLocaleLowerCase()) ||
                item.category.toLowerCase().includes(searchItem.toLocaleLowerCase())
            );

            setFilterData(filtered);
        }

    }, [searchItem, items]);

    const searchHandler = (e) => {
        setSearchItem(e.target.value);
    }

    const clearHandler = () => {
        setSearchItem("");
    }

    const displayDatas = searchItem ? filterData : items;

    return(

        <main className="bg-dark text-white">

            {/* Banner */}
            <section className="text-center d-flex justify-content-center align-items-center"
                style={{
                    minHeight: '70vh',
                    backgroundImage: `url(${banner5})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>

                <div className="container bg-dark bg-opacity-50 rounded p-4">
                    <h1 className="display-6">Furniture Collection</h1>
                    <p className="lead">Discover modern, stylish, and comfortable furniture for your home</p>
                </div>

            </section>
            {/* Banner */}

            <section className="container py-3">

                    <div className="text-center mb-5">
                        <h3 className="fw-bold mb-4">Available Products</h3>
                    </div>

                    {/* Search Box */}
                    <div className="row justify-content-end mb-3">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                                <input type="text" className="form-control" placeholder="Search furniture by name, description or category..." style={{ outline: 'none', boxShadow: 'none' }} value={ searchItem } onChange={ searchHandler } />
                                {
                                    searchItem && (                                 <button type="button" className="input-group-text" onClick={ clearHandler }><FontAwesomeIcon icon={faTimes} /></button> )
                                }
                            </div>

                            {/* Search Result Counts */}
                            {
                                searchItem && (
                                    <div className="text-light mt-2">Found { filterData.length } product{ filterData.length !== 1 ? 's' : '' } { searchItem  && `for ${ searchItem }` }</div>
                                )
                            }

                        </div>
                    </div>

                    {/* loading */}
                    {loading && (
                        <div className="text-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-warning" spin />
                            <p className="mt-2">Loading Furnitures...</p>
                        </div>
                    )}

                    {/* error */}
                    {error && (
                        <div className="alert alert-danger text-center">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            {error}
                        </div>
                    )}

                    {/* Product Cards */}
                    <div className="row g-4">
                        {
                            !loading && !error &&
                                displayDatas.map((item) => (
                                    <div className="col-lg-3 col-md-4" key={ item.id }>
                                        <div className="card h-100">

                                            <img src={ item.thumbnail || item.images?.[0] } className="card-img-top p-3" alt={ item.title } style={{ height: '200px', objectFit: 'contain' }} />

                                            <div className="card-body">
                                                <h5>{ item.title }</h5>
                                                <p className="card-text text-muted small">
                                                    { item.description.substring(0, 80)}...
                                                </p>

                                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                                    <span className="text-success fw-bold">
                                                        <FontAwesomeIcon icon={faTag} className="me-1" />${ item.price }
                                                    </span>
                                                    <button className="btn btn-sm btn-dark">
                                                        <Link to={`/furnitures/${item.id}`} className="text-decoration-none text-white">View</Link>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                        }
                    </div>

            </section>
        </main>
    )

}

export default FurniturePage;
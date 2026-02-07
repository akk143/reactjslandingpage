import { useEffect, useMemo, useState } from "react";
import banner5 from '../assets/img/banner/banner5.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation, faStar, faCircleCheck, faMapMarkerAlt, faBed, faBathtub, faRulerCombined } from "@fortawesome/free-solid-svg-icons"

import { useSelector, useDispatch } from 'react-redux'
import { fetchProperties, setFilters, clearFilters } from "../store/propertySlice";

const pageSize = 8;

const PropertyPage = () => {

    const {items, filters, loading, error} = useSelector(state => state.properties);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProperties({limit: 60}));
        setPage(1);
    }, [dispatch, filters]);

    // Method 1
    // const cities = ['All', 'Yangon', 'Mandalay', 'Pyin Oo Lwin', 'Taungyi', 'Bago', 'Mawlamyine'];
    // const statuses = ['All', 'For Sale', 'For Rent', 'Sold Out'];


    // method 2
    const cities = ['All', ...Array.from(new Set(items.map(item => item.city)))];
    const statuses = ['All', ...Array.from(new Set(items.map(item => item.status)))];

    const formatUSD = (price) => 
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price || 0);

    // Method 1
    // const getFilteredCustomers = () => {

    //     const getQText = query.trim().toLocaleLowerCase();

    //     if(!getQText) return items;

    //     return items.filter(item => 
    //         item.name.toLowerCase().includes(getQText) || 
    //         item.company.toLowerCase().includes(getQText) ||
    //         item.city.toLowerCase().includes(getQText)
    //     );

    // }

    // const filtered = getFilteredCustomers();  // 30 / 6 = 5 pages


    // Method 2 ( for speedup ui, useMemo() )
    const filtered = useMemo(() => {
        
        const getQText = filters.query.trim().toLocaleLowerCase();
        const getMin = filters.minPrice ? parseFloat(filters.minPrice) : null;
        const getMax = filters.maxPrice ? parseFloat(filters.maxPrice) : null;

        // console.log(!getQText); // true
        // console.log(getQText);
        // console.log(!getQText); // false

        return items.filter((item) => {

            const matchQuery = !getQText || item.name.toLowerCase().includes(getQText) || item.title.toLowerCase().includes(getQText);
            const matchCity = filters.city === 'all' || item.city === filters.city;
            const matchStatus = filters.status === 'all' || item.status === filters.status;
            // const matchMinPrice = getMin === null || item.price >= getMin;
            // const matchMaxPrice = !getMax || item.price <= getMax;

            const matchPrice =
            (getMin === null || item.price >= getMin) &&
            (getMax === null || item.price <= getMax);

            return matchCity && matchStatus && matchQuery && matchPrice;

        });

    }, [items, filters]);

    const onChangeHandler = (e) => {
        dispatch(setFilters({
            [e.target.name]: e.target.value
        }));
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)); // show at least 1 page 
    const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

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

                <div className="container bg-dark bg-opacity-50 rounded p-3">
                    
                    <h1 className="display-6">Find Your Next Home</h1>
                    <p className="lead">Real feedback from real people. We're proud to earn their trusts</p>

                    {/* Search Box */}
                    <div className="mx-auto" style={{ maxWidth: 880 }}>
                        <div className="row g-2">

                            <div className="col-md-5">
                                <input type="text" name="query" className="form-control form-control-lg" placeholder="Search furniture by title, city or description..." style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={ filters.query } onChange={ onChangeHandler } />
                            </div>

                            <div className="col-md-2">
                                <select name="city" className="form-select form-select-lg" value={ filters.city } onChange={ onChangeHandler }>
                                    {
                                        cities.map((city, idx) => (
                                            <option key={ idx } value={ city }>{ city === 'All' ? 'All Cities' : city }</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-md-2">
                                <select name="status" className="form-select form-select-lg"  value={ filters.status } onChange={ onChangeHandler }>
                                    {
                                        statuses.map((status, idx) => (
                                            <option key={ idx } value={ status }>{ status === 'All' ? 'All Statuses' : status }</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-md-3 d-flex g-2">
                                <input type="number" name="minPrice" className="form-control form-control-lg" min="0" placeholder="Min 0" value={ filters.minPrice } onChange={ onChangeHandler } />
                                <input type="number" name="maxPrice" className="form-control form-control-lg" max="5" placeholder="Max 5" value={ filters.maxPrice } onChange={ onChangeHandler } />
                            </div>

                            <div className="text-end mt-2">
                                <button className="btn btn-outline-light btn-sm" onClick={() => dispatch(clearFilters())}>Reset</button>
                            </div>

                        </div>
                    </div>

                </div>

            </section>
            {/* Banner */}

            <section className="container py-5">

                    {/* loading */}
                    {loading && (
                        <div className="text-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-warning" spin />
                            <p className="mt-2">Loading Properties...</p>
                        </div>
                    )}

                    {/* error */}
                    {error && (
                        <div className="alert alert-danger text-center">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            {error}
                        </div>
                    )}

                    {
                        !loading && !error && (
                            <>
                                {/* status cards */}
                                <div className="row g-3 mb-3">

                                    <div className="col-md-4">
                                        <div className="h-100 text-center bg-secondary p-3">
                                            <h6 className="opacity-75 mb-1">Matching Properties</h6>
                                            <div className="display-6 fw-bold">
                                                { filtered.length }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="h-100 text-center bg-secondary p-3">
                                            <h6 className="opacity-75 mb-1">Average Rating</h6>
                                            <div className="display-6 fw-bold">
                                                { filtered.length ? (filtered.reduce((start, end) => start+end.rating, 0) / filtered.length).toFixed(1) : 0 }
                                                <FontAwesomeIcon icon={ faStar } className="text-warning ms-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="h-100 text-center bg-secondary p-3">
                                            <h6 className="opacity-75 mb-1">Cities Covered</h6>
                                            <div className="display-6 fw-bold">
                                                <FontAwesomeIcon icon={ faCircleCheck } className="text-info me-1" />
                                                { new Set(filtered.map((filter) => filter.city)).size }+
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Property Cards */}
                                <div className="row g-4">

                                    {
                                        pageItems.map((pageItem) => (
                                            
                                            <div className="col-md-3 col-sm-6" key={ pageItem.id }>
                                                <div className="card h-100 border-0">

                                                    <div className="position-relative">
                                                        <img src={ pageItem.thumbnail } className="card-image-top" style={{ height: 150, objectFit: 'cover' }} alt={ pageItem.title } />
                                                        <span className={`badge ${ pageItem.status === 'Sold Out' ? 'bg-danger' : pageItem.status === 'For Rent' ? 'bg-info' : 'bg-success'  } position-absolute top-0 start-0 mb-2`}>{ pageItem.status }</span>
                                                        <span className="badge bg-dark position-absolute bottom-0 end-0 mb-2">{ formatUSD(pageItem.price) }</span>
                                                    </div>
                                                    
                                                    <div className="card-body">

                                                        <h6 className="text-dark mb-0">{ pageItem.name }</h6>
                                                        <div>
                                                            <small className="text-muted mb-2">
                                                                <FontAwesomeIcon icon={ faMapMarkerAlt } className="me-1" />
                                                                { pageItem.city }
                                                            </small>
                                                        </div>

                                                        <div className="d-flex g-3 small text-muted">
                                                            <span><FontAwesomeIcon icon={ faBed } className="me-1" />{ pageItem.beds } bd</span>
                                                            <span><FontAwesomeIcon icon={ faBathtub } className="mx-1" />{ pageItem.baths } ba</span>
                                                            <span><FontAwesomeIcon icon={ faRulerCombined } className="me-1" />{ pageItem.area } sqft</span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }

                                    {
                                        !pageItems.length && (
                                            <div className="text-center py-5">
                                                No Property Found
                                            </div>
                                        )
                                    }

                                    {/* pagination */}
                                    {/* 
                                        {
                                            totalPages > 1 && (
                                                
                                                <nav className="mt-4">
                                                    <ul className="pagination justify-content-center">
                                                        <li className={`page-item ${page === 1 ? "disabled" : "" }`}>
                                                            <button className="page-link" onClick={() => setPage((curPage) => Math.max(1, curPage - 1))}>Prev</button>
                                                        </li>

                                                        {
                                                            Array.from({ length: totalPages }).map((_, idx) => (
                                                                <li className={`page-item ${page === idx + 1 ? "active" : ""}`} key={ idx }>
                                                                    <button className="page-link" onClick={() => setPage(idx + 1)}>{idx + 1}</button>
                                                                </li>
                                                            ))
                                                        }

                                                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                                            <button className="page-link" onClick={() => setPage((curPage) => Math.min(totalPages, curPage + 1))}>Next</button>
                                                        </li>
                                                    </ul>
                                                </nav>

                                            )
                                        } 
                                    */}

                                    {/* pagination */}

                                       {
                                            filtered.length > 0 && (
                                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 py-2 border-top small mt-4">

                                                    {/* left side info */}
                                                    <div className="mb-2 mb-md-0">
                                                        Page <strong>{ page }</strong> of <strong>{ filtered.length }</strong> Total <strong>60</strong> properties
                                                    </div>

                                                    {/* pagination btn */}
                                                    <nav>
                                                        <ul className="pagination pagination-sm mb-0">
                                                        
                                                            <li className={`page-item ${page === 1 ? "disabled" : "" }`}>
                                                                <button className="page-link" onClick={() => setPage((curPage) => Math.max(1, curPage - 1))}>Prev</button>
                                                            </li>

                                                            {/* page indicator */}
                                                            <li className="page-item disabled">
                                                                <span className="page-link">
                                                                    { page } / { totalPages }
                                                                </span>
                                                            </li>

                                                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                                                <button className="page-link" onClick={() => setPage((curPage) => Math.min(totalPages, curPage + 1))}>Next</button>
                                                            </li>

                                                        </ul>
                                                    </nav>

                                                </div>
                                            )
                                        } 

                                </div>
                            </>
                        )
                    }

            </section>
        </main>
    )

}

export default PropertyPage;
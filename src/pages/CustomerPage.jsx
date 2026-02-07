import { useEffect, useMemo, useState } from "react";
import banner5 from '../assets/img/banner/customer-banner.webp'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTriangleExclamation, faStar, faCircleCheck, faHeart } from "@fortawesome/free-solid-svg-icons"

import { useSelector, useDispatch } from 'react-redux'
import { fetchCustomers, toggleFavourite } from "../store/customerSlice";


const pageSize = 6;

const CustomerPage = () => {

    const {items, loading, error} = useSelector(state => state.customers);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCustomers({limit: 30}));
    }, [dispatch]);

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
        
        const getQText = query.trim().toLocaleLowerCase();

        if(!getQText) return items;

        return items.filter(item => 
            item.name.toLowerCase().includes(getQText) || 
            item.company.toLowerCase().includes(getQText) ||
            item.city.toLowerCase().includes(getQText)
        );

    }, [items, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize)); // show at least 1 page 
    const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

    // [a, b, c, d, e, f, g, h, i, j, k, l]
    //  0  1  2  3  4  5  6  7  8  9  10 11

    // page 1 = 0 to 5   a to f
    // page 2 = 6 to 12  g to l

    // slice(0, 6) = 0, 1, 2, 3, 4, 5
    // slice(0, 6) = 6, 7, 8, 9, 10, 11, 12

    // 1 - 1 * 6, 1 * 6
    //   0          6

    // 2 - 1 * 6, 2 * 6
    //   1          12

    const searchHandler = (e) => {
        setQuery(e.target.value);
        if(page > totalPages) setPage(1);
    }

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
                    
                    <h1 className="display-6">Our Customers</h1>
                    <p className="lead">Real feedback from real people. We're proud to earn their trusts</p>

                    {/* Search Box */}
                    <div className="mx-auto" style={{ maxWidth: '560px' }}>
                        <input type="text" className="form-control form-control-lg" placeholder="Search furniture by name, description or category..." style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={ query } onChange={ searchHandler } />
                    </div>

                </div>

            </section>
            {/* Banner */}

            <section className="container py-5">

                    {/* loading */}
                    {loading && (
                        <div className="text-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-warning" spin />
                            <p className="mt-2">Loading Customers...</p>
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
                                            <h6 className="opacity-75 mb-1">Total Customers</h6>
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
                                            <h6 className="opacity-75 mb-1">Verified</h6>
                                            <div className="display-6 fw-bold">
                                                <FontAwesomeIcon icon={ faCircleCheck } className="text-info me-1" />
                                                { Math.round(filtered.length * 0.8) }+
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Customer Cards */}
                                <div className="row g-4">

                                    {
                                        pageItems.map((pageItem) => (
                                            
                                            <div className="col-md-4 col-sm-6" key={pageItem.id}>
                                                <div className="card h-100 border-0">
                                                    <div className="card-body">
                                                    
                                                        <div className="d-flex align-items-center">
                                                            
                                                            <img src={ pageItem.avatar } className="rounded-circle border me-3" width='55' height='55' style={{ objectFit: 'cover' }} alt="" />
                                                        
                                                            <div>
                                                                <h6 className="text-dark mb-0">{ pageItem.name }</h6>
                                                                <small className="text-muted">
                                                                    { pageItem.title } @ { pageItem.company }
                                                                </small>
                                                                <div className="small text-muted">{ pageItem.city }</div>
                                                            </div>

                                                            <button className={`btn btn-sm ms-auto ${pageItem.favourite ? "btn-danger" : "btn-outline-danger"}`} title={ pageItem.favourite ? "Unfavourite" : "Favourite" } onClick={() => dispatch(toggleFavourite(pageItem.id))}>
                                                                <FontAwesomeIcon icon={ faHeart } />
                                                            </button>

                                                        </div>

                                                        <p className="text-muted mt-2 mb-2" style={{ minHeight: 60 }}>
                                                            { pageItem.review }
                                                        </p>

                                                        <div className="mt-auto">
                                                            {
                                                                // Method 1
                                                                // Array.from({ length: 5 }).map((_, idx) => (
                                                                //     <FontAwesomeIcon icon={ faStar } className={ idx < pageItem.rating ? 'text-warning me-1' : 'text-secondary me-1' } />
                                                                // ))

                                                                // Method 2
                                                                [...Array(5)].map((_, idx) => (
                                                                    <FontAwesomeIcon icon={ faStar } className={ idx < pageItem.rating ? 'text-warning me-1' : 'text-secondary me-1' } key={ idx } />
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }

                                    {
                                        !pageItems.length && (
                                            <div className="text-center py-5">
                                                No Customer Found
                                            </div>
                                        )
                                    }

                                    {/* pagination */}

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

                                </div>
                            </>
                        )
                    }

            </section>
        </main>
    )

}

export default CustomerPage;
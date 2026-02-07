import { useEffect, useMemo, useState } from "react";
import banner5 from '../assets/img/banner/service-banner.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCogs, faSearch, faFilter, faRocket, faShieldAlt, faHeadset, faMoneyBillWave, faCode, faPalette, faChartLine, faCloud, faDiamond, faCalendarCheck, faStar, faClock, faUser, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

import { useSelector, useDispatch } from 'react-redux'
import { clearFilters, fetchBookServices, fetchServices, setFilters } from "../store/serviceSlice";

const ServicePage = () => {

    const {items, loading, error, bookingLoading, filters} = useSelector(state => state.services);
    const [query, setQuery] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        company: '',
        timeline: '',
        budget: '',
        requirements: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const ServiceCards = ({ service }) => (

        <div className="col-md-4 col-sm-6 mb-3" key={ service.id }>
            <div className="card h-100">

                <div className="position-relative">
                    <img
                        src={service.image}
                        className="card-img-top"
                        style={{ height: 150, objectFit: "cover" }}
                        alt={service.name}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-warning text-dark">
                            <FontAwesomeIcon icon={ faStar } className="me-1" />
                            { service.rating }
                        </span>
                    </div>

                    <div className="position-absolute top-0 start-0 mb-3">
                        <span className="badge bg-primary">{ service.category }</span>
                    </div>
                </div>
                
                <div className="card-body">

                    <h6 className="card-title text-dark mb-0">{ service.name }</h6>
                    <p className="card-text text-muted">{ service.description }</p>

                    <div className="">
                        <div className="d-flex flex-wrap gap-1 mb-1">
                            <span className="badge bg-light text-dark small"></span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row text-center small text-muted">

                            <div className="col-md-4">
                                <FontAwesomeIcon icon={ faClock } className="d-block mb-1" />
                                { service.duration }
                            </div>

                            <div className="col-md-4">
                                <FontAwesomeIcon icon={ faUser } className="d-block mb-1" />
                                { service.review }
                            </div>

                            <div className="col-md-4">
                                <FontAwesomeIcon icon={ faCheckCircle} className="d-block mb-1" />
                                { service.support }
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <h4>${ service.price.toLocaleString() }</h4>
                                <button type="submit" className="btn btn-primary" onClick={() => bookingServiceHandler(service) }>Book Now</button>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

    const bookingServiceHandler = (service) => {
        setShowBookingModal(true);
        setSelectedService(service);
    }

    const bookingSubmitHandler = (e) => {

        e.preventDefault();

        dispatch(fetchBookServices({
            serviceID: selectedService.id,
            bookingData: bookingForm
        }))
        .then((result) => {

            console.log(result);
           
            if(result.meta.requestStatus === 'fulfilled'){
                setShowBookingModal(false);
                setBookingForm({
                    name: '',
                    email: '',
                    company: '',
                    timeline: '',
                    budget: '',
                    requirements: ''
                });
                alert('Booking Confirmed! We will contact you soon.')
            }

        })

    }

    // const filteredServices = items.filter(item => {
        
    //     if(filters.category !== 'All' && filters.category !== item.category) return false;
    //     if(item.price < filters.priceRange.min || item.price > filters.priceRange.max) return false;
        
    //     if(filters.rating > item.rating) return false;

    //     if(query && !item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) && !item.description.toLocaleLowerCase().includes(query.toLocaleLowerCase())) return false;

    //     return true;
        
    // });

    const filteredServices = useMemo(() => {

        const q = query.trim().toLocaleLowerCase();
        const category = filters.category || 'all';
        const min = Number.isFinite(filters.priceRange?.min) ? filters.priceRange.min : 0; // safe numbers(avoid NaN, Number.isFinite(vlaue) return true or false)
        const max = Number.isFinite(filters.priceRange?.max) ? filters.priceRange.max : 10000; 
        const minRating = Number.isFinite(filters.rating) ? filters.rating : 0; 

        return items.filter((item) => {

            const name = item.name.toLocaleLowerCase();
            const desc = item.description.toLocaleLowerCase();
            const matchCategory = category === 'All' || item.category === category;
            const matchPrice = (item.price ?? 0) >= min && (item.price ?? 0) <= max;
            const matchRating = (item.rating ?? 0) >= minRating;
            const matchQuery = !q || name.includes(q) || desc.includes(q);

            return matchQuery && matchCategory && matchPrice && matchRating;

        });

    }, [items, filters, query]);


    const FilterSideBar = () => (
        <div className="card mb-4">

          <div className="card-header bg-primary text-white">
              <FontAwesomeIcon icon={ faFilter } className="me-3" />Filter Services
          </div>

          <div className="card-body">
             
              <div className="mb-3">
                  <label htmlFor="" className="from-label">Category</label>
                    <select className="form-select" value={filters.category} onChange={(e) =>dispatch(setFilters({ category: e.target.value }))} >
                        <option value="All">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                    </select>
              </div>

              <div className="mb-3">
                  <label className="form-label">Price Range</label>

                  <div className="row">

                      <div className="col-md-6">
                          <input type="number" className="form-control" placeholder="Min" value={ filters.priceRange.min } onChange={(e) =>dispatch(setFilters({ priceRange: { ...filters.priceRange, min: parseInt(e.target.value) }}))} />
                      </div>

                      <div className="col-md-6">
                          <input type="number" className="form-control" placeholder="Max" value={ filters.priceRange.max } onChange={(e) =>dispatch(setFilters({ priceRange: { ...filters.priceRange, max: parseInt(e.target.value) }}))} />
                      </div>

                  </div>

              </div>

              <div className="mb-3">
                  <label className="from-label">Mininum Rating</label>
                  <select className="form-select" value={ filters.rating } onChange={(e) => dispatch(setFilters({ rating: parseFloat(e.target.value) }))}>
                      <option value="0">All Rating</option>
                      <option value="4.5">4.5+ stars</option>
                      <option value="4.0">4.0+ stars</option>
                      <option value="3.5">3.5+ stars</option>
                  </select>
              </div>

              <button className="w-100 btn btn-outline-secondary" onClick={() => dispatch(clearFilters())}>Clear Filters</button>

          </div>

        </div>
    );

    const ServiceCategories = () => (
        <div className="row text-center text-dark mb-3">
            
            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faCode } size="2x" className="text-primary mb-2" />
                <h6>Development</h6>
            </div>
                        
            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faPalette } size="2x" className="text-primary mb-2" />
                <h6>Design</h6>
            </div>
                        
            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faChartLine } size="2x" className="text-primary mb-2" />
                <h6>Marketing</h6>
            </div>

            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faCloud } size="2x" className="text-primary mb-2" />
                <h6>Cloud</h6>
            </div>

            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faDiamond } size="2x" className="text-primary mb-2" />
                <h6>Branding</h6>
            </div>

            <div className="col-md-2 col-4 mb-4">
                <FontAwesomeIcon icon={ faRocket } size="2x" className="text-primary mb-2" />
                <h6>Consulting</h6>
            </div>

        </div>
    );

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
                    
                    <h1 className="display-6">
                      <FontAwesomeIcon icon={ faCogs } />Our Professional Services
                    </h1>
                    <p className="lead">Real feedback from real people. We're proud to earn their trusts</p>

                    {/* Search Box */}
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                          <form onSubmit={(e) => e.preventDefault()}>                         
                              <div className="input-group input-group-lg">
                                    <input type="text" name="query" className="form-control form-control-lg" placeholder="Search Services..." style={{ border: 'none', outline: 'none', boxShadow: 'none' }} value={ query } onChange={(e) => setQuery(e.target.value) } />
                                    <button className="btn btn-primary btn-sm" type="submit">
                                        <FontAwesomeIcon icon={ faSearch } className="me-2" />Search
                                    </button>
                              </div>
                          </form>
                        </div>
                    </div>

                </div>
            </section>
            {/* Banner */}

            <section className="container py-5">
                <div className="row">

                    {/* sidebar with filters */}
                    <div className="col-md-3">
                        <FilterSideBar />
                    </div>

                    {/* service card */}
                    <div className="col-md-9">
                        
                        {/* Result Header */}
                        <div>
                            <h3 className="mb-3">Available Services</h3>
                            <p className="mb-2">{ filteredServices.length } Services Found.</p>
                        </div>

                        {/* Loading State */}
                        {
                            loading && (
                                <div className="text-center py-5">
                                    <FontAwesomeIcon icon={ faSpinner } spin size="3x" className="text-light mb-3" />
                                    <p>Loading Services...</p>
                                </div>
                            )
                        }

                        {/* Error State */}
                        {
                            error && (
                                <div className="alert alert-danger text-center">
                                    <FontAwesomeIcon icon={ faExclamationCircle } spin size="3x" className="me-2" />
                                    <p>Loading Services...</p>
                                </div>
                            )
                        }

                        {/* Services Grid */}
                        <div className="row">
                            {
                                !loading && !error && filteredServices.map((service) => (
                                    <ServiceCards key={ service.id } service={ service } />
                                ))
                            }
                        </div>


                        {/* Empty State */}
                        {
                            !loading && !error && filteredServices.length === 0 && (
                                <div className="text-center py-5">
                                    <FontAwesomeIcon icon={ faCogs } className="text-muted mb-3" />
                                    <h4>No Services Found.</h4>
                                    <p>Try adjusting your filters and search criteria</p>
                                    <button className="btn btn-primary" onClick={() => dispatch(clearFilters())}>Clear Al Filters</button>
                                </div>
                            )
                        }

                    </div>

                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-primary py-5">
                <div className="container">
                   
                    <div className="text-center mb-5">
                        <h4 className="mb=3">Why Choose Our Services?</h4>
                    </div>

                    <div className="row text-center">
                        
                        <div className="col-md-3 mb-3">
                            <FontAwesomeIcon icon={ faRocket } className="mb-3 fa-2x" />
                            <h5>Fast Delivery</h5>
                            <p>Real feedback from real people. We're proud to earn their trusts</p>
                        </div>
                                                
                        <div className="col-md-3 mb-3">
                            <FontAwesomeIcon icon={ faShieldAlt } className="mb-3 fa-2x" />
                            <h5>Quality Gurantee</h5>
                            <p>Real feedback from real people. We're proud to earn their trusts</p>
                        </div>    

                        <div className="col-md-3 mb-3">
                            <FontAwesomeIcon icon={ faHeadset } className="mb-3 fa-2x" />
                            <h5>24/7 Support</h5>
                            <p>Real feedback from real people. We're proud to earn their trusts</p>
                        </div>  

                        <div className="col-md-3 mb-3">
                            <FontAwesomeIcon icon={ faMoneyBillWave } className="mb-3 fa-2x" />
                            <h5>Competitive Pricing</h5>
                            <p>Real feedback from real people. We're proud to earn their trusts</p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Service Categories */}
            <section className="bg-light py-5">
                <div className="container">
                    
                    <div className="text-center mb-5"> 
                        <h4 className="mb-3 text-dark">Service Categories</h4>
                        <p className="text-muted">Real feedback from real people. We're proud to earn their trusts</p>
                    </div>

                    <ServiceCategories />

                </div>
            </section>

            {/* Booking Modal */}
            {
                showBookingModal && selectedService && (
                    <div className="modal show d-block">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                
                                <div className="modal-header">
                                    <h6 className="modal-title">Book Service : { selectedService.name }</h6>
                                    <button type="button" className="btn-close" onClick={() => setShowBookingModal(false)}></button>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ bookingSubmitHandler }>
                                        
                                        <div className="row g-3">
                                            
                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="fullname">Full Name *</label>
                                                <input type="text" name="fullname" className="form-control" value={ bookingForm.name } onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} required />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="email">Email *</label>
                                                <input type="text" name="email" className="form-control" value={ bookingForm.email } onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} required />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label" htmlFor="company">Company</label>
                                                <input type="text" name="company" className="form-control" value={ bookingForm.company } onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })} required />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Timeline</label>
                                                <select className="form-select" value={ bookingForm.timeline } onChange={(e) => setBookingForm({ ...bookingForm, timeline: e.target.value })}>
                                                    <option value="">Select Timeline</option>
                                                    <option value="urgent">Urgent (1-2 weeks)</option>
                                                    <option value="standard">Standard (3-4 weeks)</option>
                                                    <option value="flexible">Flexible (1-2 months)</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label">Budget Range</label>
                                                <select className="form-select" value={ bookingForm.budget } onChange={(e) => setBookingForm({ ...bookingForm, budget: e.target.value })}>
                                                    <option value="">Select Budget</option>
                                                    <option value="1000-5000">$1000 - $5000</option>
                                                    <option value="5000-10000">$5000 - $10000</option>
                                                    <option value="10000-25000">$10000 - $25000</option>
                                                    <option value="25000+">$25000+</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label">Project Requirements</label>
                                                <textarea className="form-control" rows="4" placeholder="Describe your project requirements in details..." value={ bookingForm.requirements } onChange={(e) => setBookingForm({ ...bookingForm, requirements: e.target.value })}></textarea>
                                            </div>

                                            <div className="mt-4">
                                                <h6>Service Summary : </h6>
                                                <div className="card bg-light">
                                                    <div className="row">

                                                        <div className="col-6">
                                                            <strong>Service : </strong> { selectedService.name }
                                                        </div>

                                                        <div className="col-6">
                                                            <strong>Duration : </strong> { selectedService.duration }
                                                        </div>

                                                        <div className="col-6">
                                                            <strong>Support : </strong> { selectedService.support }
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="modal-footer mt-3">
                                            <button type="button" className="btn btn-secondary me-2" onClick={() => setShowBookingModal(false)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary" disabled={ bookingLoading }>
                                                {
                                                    bookingLoading ? (
                                                        <>
                                                            <FontAwesomeIcon icon={ faSpinner } spin className="me-2" />
                                                        </>
                                                    ) : 
                                                    (
                                                        <>
                                                            <FontAwesomeIcon icon={ faCalendarCheck } className="me-2" />
                                                            Confirm Booking
                                                        </>
                                                    )
                                                }
                                            </button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

        </main>
    )

}

export default ServicePage;
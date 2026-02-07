import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import contactbanner from '../assets/img/banner/contact-banner.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestimonials } from "../store/testimonialSlice";
import { submitContactForm, resetFormState } from "../store/contactFormSlice";

const ContactPage = () => {

    const { datas, loading:testimonialLoading, error:testimonialError } = useSelector(state => state.testimonials);
    const { formLoading, formError, success } = useSelector(state => state.contactforms);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {

        dispatch(fetchTestimonials());

        if(success){
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => dispatch(resetFormState()), 5000)
        }

    }, [success, dispatch]);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(submitContactForm(formData));
    }

    return(
        <main className="bg-dark text-white">

            {/* Banner */}
            <section className="text-center d-flex justify-center align-items-center" style={{ minHeight: '70vh', backgroundImage: `url(${ contactbanner })`, backgroundSize:'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="container bg-dark opacity-50 rounded">
                    <h1 className="display-6">Contact Now!</h1>
                    <p className="lead">Have a question? Our team is here to help</p>
                </div>
            </section>
            {/* Banner */}

            <section className="bg-black text-light py-5">
                <div className="container">

                    <div className="text-center mb-5">
                        <h3 className="fw-bold mb-4">What Our Clients Say</h3>
                        <p className="lead">Trusted by thousands of customers worldwide</p>
                    </div>

                    { testimonialLoading && <p className="text-light text-center">Loading...</p> }
                    { testimonialError && <p className="text-danger text-center">Error : { testimonialError }</p> }

                    <div className="row g-4">
                        { datas.map((data, idx) => (
                            <div key={ idx } className="col-lg-4">
                                <div className="card h-100 bg-dark border-light border-1 rounded-3">
                                    <div className="card-body p-4">
                                        
                                        <div className="d-flex align-items-center mb-4">
                                            <img src={`https://randomuser.me/api/portraits/${ data.gender === 'male' ? 'men' : 'women' }/${ data.avatarId }.jpg`} className="rounded-circle me-3" width='60' height='60' alt={ data.name } />
                                            <div className="d-flex align-items-center mb-4">
                                                <h5 className="text-light mb-0">{ data.name }</h5>
                                                <p className="text-light mb-0">{ data.role }</p>
                                            </div>
                                        </div>

                                        <p className="text-light">"{ data.feedback }"</p>
                                        <div className="text-warning">
                                            {
                                                Array.from({ length: Math.floor(data.rating) }, (_, index) => (
                                                    <FontAwesomeIcon key={ index } icon="fa-solid fa-star" />
                                                ))
                                            }

                                            {
                                                data.rating % 1 !== 0 && <FontAwesomeIcon icon="fa-solid fa-star-half-stroke" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>

                </div>
            </section>

            <section className="bg-light text-dark py-5">
                <div className="container">
                   
                    <h3>Send a Message</h3>

                    <div className="row justify-content-center">
                        <div className="col-md-8">

                            <form action="" onSubmit={ submitHandler }>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" name="name" id="name" className="form-control form-control-sm" value={ formData.name } onChange={ changeHandler } placeholder="Enter your name" autoFocus required />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" name="email" id="email" className="form-control form-control-sm" value={ formData.email } onChange={ changeHandler } placeholder="Enter your email" required />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Your Message</label>
                                        <textarea name="message" id="message" className="form-control form-control-sm" rows='5' value={ formData.message } onChange={ changeHandler } placeholder="Leave your message here..." required></textarea>
                                    </div>

                                    { formLoading && <p className="text-primary">Sending...</p>}
                                    { formError && <p className="text-danger">Error : { formError }</p>}
                                    { success && <p className="text-success">{ success}</p>}

                                    <div className="text-end d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary px-4">
                                            <span className="me-2">Send</span>
                                            <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>


                </div>
            </section>

            <section>
                <div className="container-fluid p-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2814299070997!2d106.8005928752883!3d10.866186289288082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175275bc75f790d%3A0xeff189fa708d0e16!2sSuoi%20Tien%20Theme%20Park!5e0!3m2!1sen!2s!4v1758189756552!5m2!1sen!2s"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>

        </main>
    )

}

export default ContactPage;
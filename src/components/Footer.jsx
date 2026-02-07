import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import footericon from '../assets/img/fav/favicon.png'
import { Link } from "react-router";
const Footer = () => {

    return(
        <>
            {/* Start Footer Section */}
            <footer className="bg-dark px-5">
                <div className="container-fluid">

                    <div className="row text-white py-4">
                        <div className="col-md-3 col-sm-6">
                            <h5 className="mb-3"><img src={ footericon } width="70" alt="footericon" />About Planco</h5>
                            <p className="small">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        
                        <div className="col-md-3 col-sm-6">
                            <h5 className="mb-3">Visit Us</h5>
                            <ul className="list-unstyled">
                                <li><Link to='/' className="footerlinks">Home</Link></li>
                                <li><Link to='/abouts' className="footerlinks">About</Link></li>
                                <li><Link to='/properties' className="footerlinks">Properties</Link></li>
                                <li><Link to='/services' className="footerlinks">Services</Link></li>
                                <li><Link to='/customers' className="footerlinks">Customers</Link></li>
                                <li><Link to='/furnitures' className="footerlinks">Furniture</Link></li>
                                <li><Link to='/contacts' className="footerlinks">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h5 className="mb-3">Need Help?</h5>
                            <ul className="list-unstyled">
                                <li><a href="javascript:void(0)" className="footerlinks">Customer Services</a></li>
                                <li><a href="javascript:void(0)" className="footerlinks">Online Chat</a></li>
                                <li><a href="javascript:void(0)" className="footerlinks">Support</a></li>
                                <li><a href="javascript:void(0)" className="footerlinks">info@gmail.com</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h5 className="mb-3">Contact Us</h5>
                            <ul className="list-unstyled">
                                <li><a href="javascript:void(0)" className="nav-link">1-9/19(A)60 Street, Between Theik Pan Street And, Aung San St, Mandalay.</a></li>
                                <li><a href="javascript:void(0)" className="nav-link">Phone: +95 9 946438315 / + 95 9 4220 42242</a></li>
                            </ul>
                        </div>

                        <div className="text-light d-flex justify-content-between border-top pt-4">
                            <p>&copy; <span id="getyear">2000</span> Copyright. Inc, All rights reserved.</p>
                            <ul className="list-unstyled d-flex">
                                <li><a href="javascript:void(0)" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-facebook" /></a></li>
                                <li className="ms-3"><a href="javascript:void(0)" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-instagram" /></a></li>
                                <li className="ms-3"><a href="javascript:void(0)" className="nav-link"><FontAwesomeIcon icon="fa-brands fa-twitter" /></a></li>
                            </ul>
                        </div>

                    </div>

                </div>
            </footer>
            {/* End Footer Section */}
        </>
    )

}

export default Footer;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import phoneicon from '../assets/img/icon/phoneicon.png'

const Quote = () => {

    return(
        <>
            <section>
                <div className="container">

                    <div className="quotes">

                        <div className="infos"> 
                            <div className="me-5">
                                <img src={ phoneicon } className="phoneicons" alt="phoneicon" />
                            </div>

                            <div className="text-white">
                                <h2 className="fw-bold text-uppercase">Request A Free Quote</h2>
                                <p className="lead">Get answer and advice from people you want it from.</p>
                            </div>

                        </div>

                        <div>
                            <a href="tel:09946438315" className="btn btn-calls">Call Now <FontAwesomeIcon icon='fa-solid fa-phone-flip' className="ms-2" /></a>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )

}

export default Quote
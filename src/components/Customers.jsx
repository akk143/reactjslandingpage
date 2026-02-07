import React from "react";
import user1 from '../assets/img/users/user1.jpg'
import user2 from '../assets/img/users/user2.jpg'
import user3 from '../assets/img/users/user3.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Customers = () => {

    return(
        <>
            {/* Start Customer Section */}
            <section className="py-3 customers">
                <div className="container-fluid">

                    {/* start title  */}
                    <div className="text-center mb-3">
                        <div className="col">
                            <h3 className="titles text-light">What Customers Says?</h3>
                        </div>
                    </div>
                    {/* end title */}

                    <div className="row">

                        <div className="col-md-6 mx-auto">  { /*<div className="col-md-3"></div> <div className="col-md-6"></div> <div className="col-md-3"></div> */ }
                            
                            <div id="customercarousels" className="carousel slide" data-bs-ride="carousel">  { /*slide for different browser */ }

                                <ol className="carousel-indicators">
                                    <li className="active" data-bs-target="#customercarousels" data-bs-slide-to="0">1</li>
                                    <li data-bs-target="#customercarousels" data-bs-slide-to="1">2</li>
                                    <li data-bs-target="#customercarousels" data-bs-slide-to="2">3</li>
                                </ol>
            
                                <div className="carousel-inner">
            
                                    <div className="carousel-item text-center active">
                                        <img src={ user1 } className="rounded-pill" alt="user1" />
                                        <blockquote>
                                            <p className="text-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </blockquote>
            
                                        <h5 className="text-uppercase fw-bold mb-3 text-light">Ms.July</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(3)].map((_, x) => (
                                                    <li key={ x } className="list-inline-item">
                                                        <FontAwesomeIcon icon='fa-solid fa-star' className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>


                                    <div className="carousel-item text-center">
                                        <img src={ user2 } className="rounded-circle" alt="user2" />
                                        <blockquote>
                                            <p className="text-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </blockquote>
            
                                        <h5 className="text-uppercase fw-bold mb-3 text-light">Mr.Anton</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(5)].map((_, x) => (
                                                    <li key={ x } className="list-inline-item">
                                                        <FontAwesomeIcon icon='fa-solid fa-star' className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>


                                    <div className="carousel-item text-center">
                                        <img src={ user3 } className="rounded-pill" alt="user3" />
                                        <blockquote>
                                            <p className="text-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </blockquote>
            
                                        <h5 className="text-uppercase fw-bold mb-3 text-light">Ms.Yoon</h5>
                                        <ul className="list-inline mb-5">
                                            {
                                                [...Array(4)].map((_, x) => (
                                                    <li key={ x } className="list-inline-item">
                                                        <FontAwesomeIcon icon='fa-solid fa-star' className="text-warning" />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
            
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
            {/* End Customer Section */}
        </>
    )

}

export default Customers;
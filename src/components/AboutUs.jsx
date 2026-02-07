import React from "react";
import staffgirl from '../assets/img/users/staffgirl1.png'

const AboutUs = () => {

    return(
        <>
            {/* Start About Us Section */}
            <section className="py-5 aboutuss">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src={ staffgirl } alt="staffgirl1" />
                        </div>

                        <div className="col-md-6 text-white">
                            
                            <div className="col-md-12">
                                <h2 className="text-uppercase">Who are we!!!</h2>
                                <div className="lines"></div>
                                <div className="lines"></div>
                                <div className="lines"></div>
                            </div>

                            <h5><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam harum molestias blanditiis accusamus, obcaecati tempore nisi aliquid sed, asperiores sapiente repellendus, fuga sit itaque praesentium qui voluptatem maiores voluptates. Placeat!</i></h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus totam, eligendi dolore deleniti dignissimos, ullam sed, dolorem ipsum earum iste aliquam iusto? Quibusdam facere officia sunt provident obcaecati repellat doloribus.</p>
                            <a href="javascript:void(0)" className="btn btn-danger rounded-0">Read Me</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* End About Us  Section  */}
        </>
    )

}

export default AboutUs;
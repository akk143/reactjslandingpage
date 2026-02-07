import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner3 from '../assets/img/banner/banner3.jpg'

const AboutPage = () => {

    const [whyChooseUs, setWhyChooseUs] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const fetchAbouts = async () => {

            try{
                const res = await fetch('http://localhost:5002/api/aboutus');
                // console.log(res);

                if(!res.ok){
                    throw new Error("No Response")
                }

                const data = await res.json();
                // console.log(data);

                setWhyChooseUs(data.whyChooseUs);
                setCoreValues(data.coreValues);

            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }

        }

        fetchAbouts();

    }, []);

    if(loading) return <p className="text-center text-light py-5">Loading...</p>
    if(error) return <p className="text-center text-light py-5">Error : { error }</p>


    return(
        <main className="bg-dark text-white">
            {/* Banner */}
            <section className="text-center d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', backgroundImage: `url(${banner3})`, backgroundSize:'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="container bg-dark opacity-50 rounded">
                    <h1 className="display-6">About Our Company</h1>
                    <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                </div>
            </section>
            {/* Banner */}

            <section className="p-5">
                <div className="container text-center">
                    <h3>Why Choose Us?</h3>
                    <div className="row">

                        {
                            whyChooseUs.map((item, idx) => (
                                <div key={ idx } className="col-md-4 mb-4">
                                    <div className="display-4 mb-3">
                                    <FontAwesomeIcon icon={ item.icon } className="text-warning" />
                                    </div>
                                    <h5>{ item.title }</h5>
                                    <p>{ item.desc }</p>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>

            <div className="bg-secondary py-5">
                <div className="container text-center">
                   
                    <h3>Our Core Values</h3>

                    <div className="row">
                        {
                            coreValues.map((core, idx) => (
                            <div key={ idx } className="col-md-3 mb-4">
                                <div className="bg-dark rounded shadow h-100 p3">
                                    <h5>{ core.title }</h5>
                                    <p>{ core.desc }</p>
                                </div>
                            </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </main>
    )

}

export default AboutPage;
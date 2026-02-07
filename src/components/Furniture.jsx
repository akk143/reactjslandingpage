import React from "react";

import service1 from '../assets/img/icon/services1.png'
import service2 from '../assets/img/icon/services1.png'
import service3 from '../assets/img/icon/services1.png'
import service4 from '../assets/img/icon/services1.png'
import service5 from '../assets/img/icon/services1.png'
import service6 from '../assets/img/icon/services1.png'

const Furniture = () => {

    const services = [
        {
            id: 1, 
            image: service1,
            title: 'Fast Service',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 2, 
            image: service2,
            title: 'Secure Payments',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 3, 
            image: service3,
            title: 'Expert Team',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 4, 
            image: service4,
            title: 'Affordable Services',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
    {
            id: 5, 
            image: service5,
            title: '90 Days Warranty',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            id: 6, 
            image: service6,
            title: 'Award Winning',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        
    ];

    return(
        <>
            {/* Start Furniture Section */}
            <section className="bg-light text-center py-3">
                <div className="container">
                    {/* start title */}
                    <div className="text-center">
                        <div className="col">
                            <h3 className="titles">Furniture Services</h3>
                            <p className="lead mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus perspiciatis hic libero facilis impedit nostrum eligendi numquam dolorem excepturi, iure adipisci! Aspernatur dignissimos possimus beatae doloribus asperiores magnam praesentium cumque.</p>
                        </div>
                    </div>
                    {/* end title */}

                    <div className="row furicons">

                        {
                            services.map(service => (
                                <div key={ service.id } className="col-md-4">
                                    <img src={ service.image } alt={ service.title } />
                                    <h4>{ service.title }</h4>
                                    <p>{ service.description }</p>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </section>
            {/* End Furniture Section */}
        </>
    )

}

export default Furniture;
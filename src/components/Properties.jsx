import React, { useState } from "react";
import { Link } from "react-router";
// import $ from 'jquery'

import 'lightbox2/dist/css/lightbox.min.css'
import 'lightbox2/dist/js/lightbox.min.js'

// import all imgaes
import image1 from '../assets/img/gallery/image1.jpg'
import image2 from '../assets/img/gallery/image2.jpg'
import image3 from '../assets/img/gallery/image3.jpg'
import image4 from '../assets/img/gallery/image4.jpg'
import image5 from '../assets/img/gallery/image5.jpg'
import image6 from '../assets/img/gallery/image6.jpg'
import image7 from '../assets/img/gallery/image7.jpg'
import image8 from '../assets/img/gallery/image8.jpg'
import image9 from '../assets/img/gallery/image9.jpg'

const Properties = () => {

    const properties = [
        { id: 1, image: image1, category:'house', title:"Modern House" },
        { id: 2, image: image2, category:'house', title:"Country House" },
        { id: 3, image: image3, category:'house', title:"Modern House" },
        { id: 4, image: image4, category:'decoration', title:"Living Room" },
        { id: 5, image: image5, category:'decoration', title:"Bedroom" },
        { id: 6, image: image6, category:'decoration', title:"Kitchen" },
        { id: 7, image: image7, category:'furniture', title:"Sofa Set" },
        { id: 8, image: image8, category:'furniture', title:"Dining Table" },
        { id: 9, image: image9, category:'furniture', title:"Bed Frame" },
        { id: 10, image: image1, category:'office', title:"Workspace" },
        { id: 11, image: image3, category:'office', title:"Conference Room" },
        { id: 12, image: image5, category:'office', title:"Executive Office" },
        { id: 13, image: image7, category:'decoration', title:"Bedroom" },
        { id: 14, image: image9, category:'decoration', title:"Living Room" },
        { id: 15, image: image2, category:'house', title:"Country House" },
        { id: 16, image: image4, category:'furniture', title:"Bed Frame" }
    ];

    const listfilters = ['all', 'house', 'decoration', 'furniture', 'office'];
    
    // Filter properties based on active or filter 
    const [activeFilter, setActiveFilter] = useState('all');
    
    const filterproperties = activeFilter === 'all' ? properties : properties.filter(property => property.category === activeFilter);

    // useEffect(() => {
    //     $('.titles').css('color', 'red');
    // }, []);

    return(
        <>
            <section className="py-5">
                <div className="container-fluid">

                    {/* start title */}
                    <div className="text-center mb-4">
                        <div className="col">
                            <h3 className="titles">Properties</h3>
                        </div>
                    </div>
                    {/* end title */}
                    
                    <ul className="list-inline text-center text-uppercase fw-bold">
                        { listfilters.map((listfilter, idx) => (
                            <li key={ idx } className={`list-inline-item propertylists ${ activeFilter === listfilter ? 'activeitems' : '' }`} data-filter="all" onClick={ () => setActiveFilter(listfilter) }>
                                { listfilter }
                                { listfilter !== 'office' && <span className="mx-3 mx-md-5 text-muted">/</span> }
                            </li>
                        )) }
                    </ul>

                    <div className="container-fluid">
                        <div className="d-flex flex-wrap justify-content-center">

                            { filterproperties.map(property => (
                                <div key={ property.id } className={ `filters${property.category}` }> 
                                    <a href={property.image } data-lightbox="property" data-title={ property.title }>
                                        <img src={ property.image } width="200" alt={ property.title } />
                                    </a>
                                </div>
                            )) }

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Properties;
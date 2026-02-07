import React, { useEffect, useState } from "react";
import advimg from '../assets/img/etc/building4.png'

const Advertise = () => {

    const [advAnimation, seAdvAnimation] = useState({
        image: false,
        text: false
    });

    useEffect(() => {

        const scrollHandler = () => {

            const getscrolltop = window.scrollY || document.documentElement.scrollTop;
            // console.log(getscrolltop);

            seAdvAnimation({
                image: getscrolltop >= 900,
                text: getscrolltop>= 900
            });

        }

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);

    }, [advAnimation]);

    return(
        <>
            {/* Start Adv Section */}
            <section>
                <div className="py-5 missions">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <img src={ advimg } className={ `homeimgs advimages ${ advAnimation.image ? 'fromlefts' : ''}` } alt="building4" />
                            </div>
                            <div className={ `col-lg-7 text-white text-center text-lg-end advtexts ${ advAnimation.text ? 'fromrights' : ''}` }>
                                <h1>What is Planco & how we started our business in Myanmar</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Adv Section */}
        </>
    )

}

export default Advertise;
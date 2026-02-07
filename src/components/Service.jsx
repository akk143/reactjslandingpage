import React, { useEffect, useState } from "react";

const Service = () => {

    const [images, setImages] = useState({});
    
    useEffect(() => {

        const importimages = async () => {

            try{
                const imageModules = await Promise.all([
                    import('../assets/img/gallery/image1.jpg'),
                    import('../assets/img/gallery/image2.jpg'),
                    import('../assets/img/gallery/image3.jpg'),
                    import('../assets/img/gallery/image4.jpg'),
                    import('../assets/img/gallery/image5.jpg'),
                    import('../assets/img/gallery/image6.jpg')
                ]);

                // console.log(imageModules);             // (6) [Module, Module, Module, Module, Module, Module];
                // console.log(imageModules[0].default);  // (6) /src/assets/img/gallery/image1.jpg

                setImages({
                    image1: imageModules[0].default,
                    image2: imageModules[1].default,
                    image3: imageModules[2].default,
                    image4: imageModules[3].default,
                    image5: imageModules[4].default,
                    image6: imageModules[5].default
                });

                // console.log(images);

            }catch(err){
                console.error('Error loading images : ', err);
            }

        }

        importimages();

    }, []);

    const rooms = [
        {
            imgname: 'image1',
            roomname: 'Living Room',
        },
        {
            imgname: 'image2',
            roomname: 'Mini Bar',
        },
        {
            imgname: 'image3',
            roomname: 'Dining Room',
        },
        {
            imgname: 'image4',
            roomname: 'Meeting Room',
        },
        {
            imgname: 'image5',
            roomname: 'Bedroom',
        },
        {
            imgname: 'image6',
            roomname: 'Pantry Room',
        },
    ];

    if(Object.keys(images).length == 0){
        return <div className="text-center text-danger py-5">Loading images...</div>
    }

    return(
        <>
            {/* Start Services Section */}
            <section className="p-4 services">

                <div className="container-fluid">
                {/* start title */}
                    <div className="text-center mb-3">
                        <div className="col">
                            <h3 className="titles text-white">Our Services</h3>
                            <p className="text-light lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>

                {/* end title */}

                <div className="row">

                    {
                        rooms.map((room, idx) => (
                            <div key={ idx } className="col-lg-4 col-sm-12 mb-3">
                                <div className="card servicecards border-0">
                                    <img src={ images[room.imgname] } alt="image1" />
                                    <h5 className="text-white fw-bold p-2 headings">{ room.roomname }</h5>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </section>
            {/* End Services Section */}
        </>
    )

}

export default Service;
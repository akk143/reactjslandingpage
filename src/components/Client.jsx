import React, { useEffect, useState } from "react";

const Client = () => {

    const [clientImages, setClientImages] = useState({});
    
    useEffect(() => {

        const importimages = async () => {

            try{
                const imageModules = await Promise.all([
                    import('../assets/img/clients/client1.png'),
                    import('../assets/img/clients/client2.png'),
                    import('../assets/img/clients/client3.png'),
                    import('../assets/img/clients/client4.png'),
                    import('../assets/img/clients/client5.png')
                ]);

                // console.log(imageModules);             // (5) [Module, Module, Module, Module, Module];
                // console.log(imageModules[0].default);  // (5) /src/assets/img/clients/client1.jpg

                setClientImages({
                    client1: imageModules[0].default,
                    client2: imageModules[1].default,
                    client3: imageModules[2].default,
                    client4: imageModules[3].default,
                    client5: imageModules[4].default,
                });

                // console.log(images);

            }catch(err){
                console.error('Error loading images : ', err);
            }

        }

        importimages();

    }, []);

    // console.log(Object.entries(clientImages));   // (5) [Array(2), Array(2), Array(2), Array(2), Array(2)]

    if(Object.keys(clientImages).length == 0){
        return <div className="text-center text-danger py-5">Loading Client Images...</div>
    }

    return(
        <>
            {/* Start Client Section  */}
            <section>

                <div className="p3">

                    <div className="container-fluid">
                        {/* start title */}
                        <div className="text-center my-3">
                            <div className="col">
                                <h3 className="titles">Satisfied Clients</h3>
                                <p className="text-dark lead mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        {/* end title */}

                        <div className="row">
                            <div className="col-md-12">
                                <ul className="clientlists">
                                    {/* {
                                        Object.keys(clientImages).map((key, idx) => (
                                            <li key={ idx }>
                                                <img src={ clientImages[key] } alt={ key } />
                                            </li>
                                        ))
                                    } */}

                                    {
                                        Object.entries(clientImages).map(([key, src]) => (
                                            <li key={ key }>
                                                <img src={ src } alt={ key } />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            {/* End Client Section */}
        </>
    )

}

export default Client;
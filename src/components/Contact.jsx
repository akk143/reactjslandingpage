import { useState } from "react";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        accept: false
    });

    const changeHandler = (e) => {
        // console.log(e.target);
        const { type, name, value, checked } = e.target; 
        // console.log(type, name, value, checked)  

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkebox'? checked : value
        }))

    }

    const submitHandler = (e) => {

        e.preventDefault();
        console.log('form submitted', formData);

        setFormData({
            name: '',
            email: '',
            accept: false
        })
    }

    return(
        <>
            {/* Start Contact Section */}
            <section className="p-5 contacts">

                <div className="container-fluid">
                    <div className="col-md-5">

                        <h5 className="display-4 mb-3">Get New Letter</h5>

                        <form action="" method="" onSubmit={ submitHandler }>
                            
                            <div className="form-group py-4">
                                <input type="text" name="name" id="name" className="form-control p-3 inputs" placeholder="Enter your name" autoComplete="off" value={ formData.name } onChange={ changeHandler } required />
                                <label htmlFor="name" className="labels">Name</label>                { /* material form design label at bottom */ }
                            </div>

                            <div className="form-group py-4">
                                <input type="email" name="email" id="email" className="form-control p-3 inputs" placeholder="Enter your email" autoComplete="off" value={ formData.email } onChange={ changeHandler } required />
                                <label htmlFor="email" className="labels">Email</label>                { /* material form design label at bottom */ }
                            </div>

                            <div className="my-5">
                                <div className="form-chceck form-switch">
                                    <input type="checkbox" name="accept" id="accept" className="form-check-input" checked={ formData.accept } onChange={ changeHandler } required />
                                    <label htmlFor="accept" className="text-white">I agree to get push notify.</label>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn text-uppercase fw-bold rounded-0 submit-btns">Subscribe</button>
                            </div>

                        </form>

                    </div>

                </div>

            </section>
            {/* End Contact Section */}
        </>
    )

}

export default Contact;
import React from "react";
import NavBar from "./NavBar";

const Header = () => {

    return(
        <>
            {/*  Start Back to Top  */}

            {/*  End Back to Top  */}

            {/*  Start Stick Note  */}
            <div className="sticknotes">
                {/* <Link to='/abouts' className='about'>About</Link>
                <Link to='/blogs' className='about'>Blog</Link>
                <Link to='/news' className='about'>News</Link>
                <Link to='/contact' className='about'>Contact</Link> */}
                <a href="javascript:void(0);" className="about">About</a>
                <a href="javascript:void(0);" className="blog">Blog</a>
                <a href="javascript:void(0);" className="news">News</a>
                <a href="javascript:void(0);" className="contact">Contact</a>
            </div>
            {/*  End Stick Note  */}

            {/*  Start Header Section  */}
            <header id="header">
                {/* Start Banner  */}
                <div className="text-light text-center text-md-end banners">
                    <h1 className="display-4 bannerheaders">Welcome to <span className="display-2 text-uppercase">Planco</span> Home Decoration Co.,Ltd</h1>
                    <p className="lead bannerparagraphs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque modi architecto eveniet ipsum perspiciatis id est nemo sed quisquam ea?</p>
                </div>
                {/* End Banner Bar  */}
            </header>
            {/* End Header Section  */}
        </>
    )

}

export default Header;
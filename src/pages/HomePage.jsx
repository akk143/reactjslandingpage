import AboutUs from "../components/AboutUs";
import Contact from '../components/Contact'
import Customers from '../components/Customers'
import Furniture from '../components/Furniture'
import Header from '../components/Header'
import Properties from '../components/Properties'
import Service from '../components/Service'
import Client from "../components/Client";
import Advertise from "../components/Advertise";
import Quote from "../components/Quote";

const HomePage = () => {

    return(
        <>
            <Header />
            <AboutUs />
            <Properties />
            <Advertise />
            <Service />
            <Client />
            <Customers />
            
            <Quote />
            <Furniture />
            < Contact />
        </>
    )

}

export default HomePage;
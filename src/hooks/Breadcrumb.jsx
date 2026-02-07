import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {

    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(value => value);   // return value
  
    // console.log("Location : ", location);
    // console.log("Path Name : ", pathNames);

    const routeNameMap = {
        aboutus: "About Us",
        properties: "Properties",
        services: "Services",
        customers: "Customers",
        furniture: "Furnitures",
        carts: "Carts",
        checkout: "Checkout",
        constcts: "Contacts",
        "order-success": "Order Success"
    }

    return(
        <nav className="bg-dark pt-3">
            <ol className="container breadcrumb mb-0 text-white breadcrumb-dark">
                
                <li className="breadcrumb-item">
                    <Link to='/' className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={ faHome } /> Home
                    </Link>
                </li>

                {
                    pathNames.map((value, idx) => {
                       
                        const to = '/'+pathNames.slice(0, idx + 1).join('/');
                        const isLast = idx === pathNames.length - 1;
                        const label = routeNameMap[value] || value.replace('-', '');

                        return isLast ? (
                            <li key={ idx } className="text-white breadcrumb-item active">
                                { label }
                            </li>
                        ) : (
                            <li key={ idx } className="breadcrumb-item">
                                <Link to={ to } className="text-white text-decoration-none">
                                    { label }
                                </Link>
                            </li>
                        );

                    })
                }

            </ol>
        </nav>
    )

}

export default Breadcrumb;
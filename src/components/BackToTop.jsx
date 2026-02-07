import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const toggleVisible = () => {
            setVisible(window.scrollY > 300);
        }

        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible);

    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (!visible) return null;

    return(
        <div className="fixed-bottom">
            <a className="btn-backtotops" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faArrowUp} />
            </a>
        </div>
    );
}

export default BackToTop;
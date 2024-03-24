import React from 'react'
import '../styles/footerr.css'
import { Link } from 'react-scroll';

const Footerr = () => {
    return (
        <footer className="custom-footer">
            <div className="custom-wave"></div>
            <ul className="custom-social-icon">
                <li className="custom-social-icon__item">
                    <Link to="aboutus" smooth={true} duration={100}>
                        <a className="custom-social-icon__link" href="aboutus">
                            About us
                        </a>
                    </Link>
                </li>
                {/* Add more social icons as needed */}
            </ul>
            <ul className="custom-menu">
                <li className="custom-menu__item">
                    <Link to="howtocreate" smooth={true} duration={100}>
                        <a className="custom-menu__link" href="functionality">
                            Funcionality
                        </a>
                    </Link>
                </li>
                <li className="custom-menu__item">
                    <Link to="ourteam" smooth={true} duration={100}>
                        <a className="custom-menu__link" href="#">
                            Our Team
                        </a>
                    </Link>
                </li>
                {/* Add more menu items as needed */}
            </ul>
            <p>&copy;2024 EasyBill | All Rights Reserved</p>
        </footer>
    );

}

export default Footerr
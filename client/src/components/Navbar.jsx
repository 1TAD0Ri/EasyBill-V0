import React from 'react'
import myLogo from '../assets/logoCompany.png'
import '../styles/navbar.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()
    const goRegister = () => {
        navigate('/register')
    }
    const goLogin = () => {
        navigate('/login')
    }
    const token = Cookies.get("token");
    return (
        <nav>
            <div className='Navbar'>
            <div className='spinnav'>
                    <div class="spinnerr">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="waviyy">
                        <span style={{ '--i': 1 }}>E</span>
                        <span style={{ '--i': 2 }}>a</span>
                        <span style={{ '--i': 3 }}>s</span>
                        <span style={{ '--i': 4 }}>y</span>
                        <span style={{ '--i': 5 }}>B</span>
                        <span style={{ '--i': 6 }}>i</span>
                        <span style={{ '--i': 7 }}>l</span>
                        <span style={{ '--i': 8 }}>l</span>
                    </div>
                </div>
                <div className='dropdowntwo'>
                    {token ?<button className="btn-dash"  onClick={()=>navigate('/dash')}>Dashboard</button>:<DropdownButton id="dropdown-basic-button" title='Connect'>
                        <Dropdown.Item onClick={goRegister} >Register </Dropdown.Item>
                        <Dropdown.Item onClick={goLogin}>Login</Dropdown.Item>
                    </DropdownButton>}
                    <DropdownButton id="dropdown-basic-button" title='EasyBill'>
                        <Link to="aboutus" smooth={true} duration={100}>
                            <Dropdown.Item  >About us</Dropdown.Item>
                        </Link>
                        <Link to="advan" smooth={true} duration={100}>
                            <Dropdown.Item >Why us ? </Dropdown.Item>
                        </Link>
                        {/* <Link to="ourservices" smooth={true} duration={100}>
                            <Dropdown.Item >Our Services</Dropdown.Item>
                        </Link> */}
                        <Link to="howtocreate" smooth={true} duration={100}>
                            <Dropdown.Item >Funcionality</Dropdown.Item>
                        </Link>
                        <Link to="ourteam" smooth={true} duration={100}>
                            <Dropdown.Item>Our Team</Dropdown.Item>
                        </Link>
                    </DropdownButton>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
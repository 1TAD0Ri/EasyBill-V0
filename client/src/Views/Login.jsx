import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logoCompany.png';
import axios from 'axios'
import { User } from '../App';

const Login = ({ setUserId }) => {
    // const { setUserId } = useContext(User);
    const [user, setUser] = useState({ email: "", pw: "" });
    const navigate = useNavigate();

    const handle = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            .then(response => {
                console.log('aahahahahaha')
                // const { user, token } = response.data;
                // console.log(user, token);
                setUserId(response.data.user._id);
                navigate('/dash');
            })
            .catch(error => {
                console.log(error);
            });
    }
    // const toggleDarkMode = () => {
    //     setDarkMode(!darkMode);
    // }

    return (
        <div>
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
                <Button onClick={() => navigate('/')} variant="primary">
                    EasyBill
                </Button>{' '}
            </div>
            <section
                className="vh-100"
                style={{
                    backgroundColor: '#2779e2',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                }}
            >
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body">
                                    <form onSubmit={handle}>
                                        <div className="row align-items-center pt-4 pb-3">
                                            <div className="col-md-3 ps-5">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={user.email}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-3 ps-5">
                                                <h6 className="mb-0">Password</h6>
                                            </div>
                                            <div className="col-md-9 pe-5">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    value={user.pw}
                                                    onChange={(e) => setUser({ ...user, pw: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <hr className="mx-n3" />
                                        <div className="px-5 py-4">
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;

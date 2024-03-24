import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '../App';
// import '../assets/register.css'; // Import your stylesheet
import myLogo from '../assets/logoCompany.png';
import Button from 'react-bootstrap/Button';
const Register = () => {
    // const { setUserId } = useContext(User);
    const navigate = useNavigate();
    const [data, setData] = useState({name:"",pw:"",phone:0,email:"",adress:"",companyname:""});
    const [user,setUser] = useState({name:"",pw:"",phone:0,email:"",adress:"",companyname:""})
    const handleForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/new', data,{withCredentials:true})
            .then(response => {
                console.log("the data has been stored", response.data.user);
                // setUserId(response.data.user._id);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
            });
    }

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
            <Button onClick={()=>navigate('/')} variant='primary'>
                EasyBell
            </Button>{' '}
        </div>
        <section className='vh-100' style={{ backgroundColor: '#2779e2' }}>
            <div className='container h-100'>
                <div className='row d-flex justify-content-center align-items-center h-100'>
                    <div className='col-xl-9'>
                        <div className='card' style={{ borderRadius: '15px' }}>
                            <div className='card-body'>
                                <form onSubmit={handleForm}>
                                    <div className='row align-items-center pt-4 pb-3'>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Full Name</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg'
                                                name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                                            />
                                        </div>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Phone</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg'
                                                name="phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Adresse</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg'
                                                name="phone" value={data.adresse} onChange={(e) => setData({ ...data, adresse: e.target.value })}
                                            />
                                        </div>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Company name</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg'
                                                name="phone" value={data.companyname} onChange={(e) => setData({ ...data, companyname: e.target.value })}
                                            />
                                        </div>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Email</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='text'
                                                className='form-control form-control-lg'
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData({ ...data, email: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className='col-md-3 ps-5'>
                                            <h6 className='mb-0'>Password</h6>
                                        </div>
                                        <div className='col-md-9 pe-5'>
                                            <input
                                                type='password'
                                                className='form-control form-control-lg'
                                                value={data.pw}
                                                onChange={(e) =>
                                                    setData({ ...data, pw: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <hr className='mx-n3' />
                                    <div className='px-5 py-4'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary btn-lg'
                                        >
                                            Register
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
}

export default Register;

{/* <div className="register-container">
            <div className="register-form-container">
                <h2>Register</h2>
                <form onSubmit={handleForm} className="register-form">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" id="phone" name="phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

                    <label htmlFor="pw">Password</label>
                    <input type="password" id="pw" name="pw" value={data.pw} onChange={(e) => setData({ ...data, pw: e.target.value })} />

                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
            </div>
        </div> */}





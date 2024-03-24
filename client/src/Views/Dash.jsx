import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User } from '../App';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/dash.css'
import Button from 'react-bootstrap/Button';
import myLogo from '../assets/logoCompany.png';


const Dash = () => {
    // const { userId: contextUserId, setUserId } = useContext(User);
    // const { id } = useParams();
    const token = Cookies.get('token');
    const [user, setUser] = useState({});
    const [saleslist, setSales] = useState([]);
    const [purchaselist, setPurchase] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/dash`, {withCredentials:true})
        .then(response => {
            console.log(response.data);
            // const name = response.data.name;
            setUser(response.data)
            // console.log(name);
            // setName(name);
        }).catch(error => {
            console.log(error.response.status);
            if(error.response.status == 401){
                navigate('/')
            }
        })
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/purchase`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response.data);
            setPurchase(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
      useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/sales`,{
                    headers:{Authorization:`Bearer ${token}`} })
                console.log(response.data);
                setSales(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
        console.log("Sales List:", saleslist );
    },[]);

    const handleLogout = () => {
        // Clear cookies and local storage
        Cookies.remove('token'); // Replace 'yourCookieName' with your actual cookie name
        localStorage.removeItem('userId'); // Replace 'yourTokenKey' with your actual token key
        navigate('/');
    }
    // Calculate total sales and purchases
    const totalSales = saleslist.reduce((acc, sale) => {
        return acc + Math.round(sale.total * ((sale.tax / 100) + 1));
    }, 0);

    const totalPurchases = purchaselist.reduce((acc, purchase) => {
        return acc + Math.round(purchase.total * ((purchase.tax / 100) + 1));
    }, 0);
    return (
        <div>
            {/* <div className='Navbar'>
                <img className='navimg' src={myLogo} alt="EasyBill" />
                <Button onClick={() => navigate('/')} variant="primary">
                    EasyBill
                </Button>{' '}
                <Button onClick={handleLogout} variant="primary">Logout</Button>
            </div> */}
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
                </div>                <div>
                    <Button onClick={() => navigate('/')} variant="primary">EasyBill</Button>{' '}
                    <Button onClick={handleLogout} variant="primary">Logout</Button>
                </div>
            </div>
            <div className=''>
                <div className='d-flex justify-content-center gap-5 m-3'>
                <Link to={'/allinvpurch'}>
                    <a className="fancy" href="#" data-msg="Here you can view all the purchase invoices for your buys, providing a comprehensive record of your transactions. ">
                        <span className="top-key"></span>
                        <span className="text">Buying</span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </a>
                    </Link>
                    <Link to={'/allinvsales'}>
                    <a className="fancy" href="#" data-msg="Here you can access all the sales invoices, offering a complete overview of your selling transactions.">
                        <span className="top-key"></span>
                        <span className="text">Sells</span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </a>
                    </Link>
                    <Link to={"/allContacts"} >
                    <a className="fancy" href="#" data-msg="Feel free to use this platform to get in touch with your clients or suppliers, facilitating seamless communication for efficient business relationships">
                        <span className="top-key"></span>
                        <span className="text">Contact </span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </a>
                    </Link>
                    <Link to={"/factures/create"}>
                    <a className="fancy" href="#" data-msg="Effortlessly create, manage, and access your invoices, sales, purchases, and contacts in one place.">
                        <span className="top-key"></span>
                        <span className="text">Create </span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </a>
                    </Link>
                    <Link to={'/allinv'}><a className="fancy"  data-msg="Click here to view all invoices.">
                        <span className="top-key"></span>
                        <span className="text">All Invoices </span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </a></Link>
                </div>
                <div className="row mt-5">
                    <div className="col-2"></div>
                    <div className="col text-center"><h3>Welcome in EasyBill {user&&<span style={{color:'blue',fontWeight:'bold'}}>{user.name} </span>} </h3>
                        <h3>Hope that <span className='text-uppercase' style={{color:'blue',fontWeight:'bold'}}> {user.companyname} </span>  is doing well!</h3></div>
                    <div className="col-2"></div>
                </div>
                <div className='row m-3 p-5'>
                    <div className="col"></div>
                    <div className="col card text-center bg-success text-white">
                        <p className='card-header'>Total Sales:</p>
                        <h1 className='text-white'>{totalSales} TND</h1>
                    </div>
                    <div className="col"></div>
                    <div className="col card text-center bg-danger text-white">
                        <p className='card-header'>Total Purchases:</p>
                        <h1 className='text-white'>{totalPurchases} TND</h1>
                    </div> 
                    <div className="col"></div> 
                </div>
        </div>
        </div>
    );
}

export default Dash;
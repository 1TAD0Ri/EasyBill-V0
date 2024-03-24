import React from 'react'
import axios from 'axios'
import { format } from 'date-fns';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
const Home = () => {
    const [invoices, setInvoices] = useState([])
    const token = Cookies.get('token');
    const navigate = useNavigate()
    const [upload,setUpload]=useState()

    // this for getting the invoices that had the same token as the user 
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/invoices`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                console.log(response.data);
                setInvoices(response.data);
            }catch(error){
                console.log(error);
            }
        }
        setUpload(true);
        fetchData();
    },[upload]);

    const deleteRedirect = (id) => {
        axios
          .delete(`http://localhost:8000/api/invoices/${id}`)
          .then((res) => {
            // Attendre la confirmation avant de naviguer
            if (res.status === 200) {
              setUpload(false);
              navigate('/allInvHome');
            }
          })
          .catch((error) => console.log(error));
      };
    return (
        <div className="container">
            
            <div className='border shadow p-4 m-5'>
                <h1 className='text-center m-3'>All Invoices</h1>
                <button className='btn btn-secondary m-5' onClick={() => navigate('/invoices')}>Create Invoice</button>
                <table className="table table-striped table-dark text-center">
              <thead>
                <tr>
                  <th scope="col">Invoice #</th>
                  <th scope="col">Client</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <Link to={`/invoices/${c._id}`} className="text-decoration-none text-light">
                        {c.invoiceNumber}
                      </Link>
                    </td>
                    <td>{c.client}</td>
                    <td>
                    {Math.round(c.total * ((c.tax / 100) + 1))} {'TND '}
                    </td>
                    <td>{format(new Date(c.createdAt), 'MMMM dd, yyyy')}</td>
                    <td><button className='btn btn-unstyled' onClick={() => deleteRedirect(c._id)}>⛔</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>

    )
}

export default Home
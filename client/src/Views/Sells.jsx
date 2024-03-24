import React from 'react'
import axios from 'axios'
import { format } from 'date-fns';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
const Sells = () => {
    const [invoices, setInvoices] = useState([])
    const token = Cookies.get('token');
    const navigate = useNavigate()


    // this for getting the invoices that had the same token as the user 
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/sales`,{
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
        fetchData();
    },[token]);
    console.log(invoices);
    return (
        <div className="container text-center">
            <div className='border shadow p-4 m-5'>
                <h1 className='text-center m-3'>Sales Invoices</h1>
                <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Invoice #</th>
                  <th scope="col">Client</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>

    )
}


export default Sells
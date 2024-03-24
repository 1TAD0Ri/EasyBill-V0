import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import Cookies from 'js-cookie';

const Purchases = () => {
  const [invoices, setInvoices] = useState([]);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/purchase`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setInvoices(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="border shadow p-4 m-3">
        <h1 className="text-center m-3">Purchase Invoices</h1>
        {invoices.length === 0 ? (
          <p className="text-center text-muted">No invoices available.</p>
        ) : (
          <div className="table-responsive">
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
        )}
      </div>
    </div>
  );
};

export default Purchases;

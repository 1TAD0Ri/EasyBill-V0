import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import companyLogo from '../assets/react.svg'
import { format } from 'date-fns';
import html2pdf from 'html2pdf.js';
import Cookies from 'js-cookie';
import '../styles/oneinvoice.css'
const OneInvoice = () => {
    const { id } = useParams()
    const [invoice, setInvoice] = useState({})
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const token = Cookies.get("token");
    const [creator, setCreator] = useState({ name: "", telephone: 0, adress: "", email: "" });
    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoices/${id}`)
            .then((res) => {
                setInvoice(res.data);
                setArticles(res.data.items);
                setLoading(false);
                console.log(res.data.client);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]); // Add id to the dependency array if needed
    console.log(invoice.client);
    useEffect(() => {
        if (invoice.client) { // Ensure that invoice.client is not undefined or null
            axios.get(`http://localhost:8000/api/clients/get/${invoice.client}`)
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [invoice.client]);

 
    // this for retrieving the log In User data:
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getusertoken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Update the state with the latest data
                setCreator({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    adresse: response.data.adresse
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        // Log the updated 'creator' state after it has been applied
        console.log(creator);
    }, [creator]);
    const handleDownload = () => {
        const content = document.getElementById('invoice-content'); 
        if (content) {
            html2pdf(content);
        }
    };

    return (
        <div className='container row'>
            <div id='invoice-content' className="border">
                <div className='row d-flex justify-content-between p-5'>
                    <div className='col-5 d-flex flex-column'>
                        <h1>{invoice.type} Invoice </h1>
                        <h5>N°: {invoice.invoiceNumber}</h5>
                        {invoice.createdAt && (
                            <h5>Date: {format(new Date(invoice.createdAt), 'dd/MM/yyyy')}</h5>
                        )}
                        {invoice.dueDate && (
                            <h5>Due Date: {format(new Date(invoice.dueDate), 'dd/MM/yyyy')}</h5>
                        )}
                    </div>
                    <img className="col-3" src={companyLogo} alt="Logo" />
                </div>
                <div className="d-flex  justify-content-around p-5">
                    <div className="col-5 card ">
                        <div className="card-header">
                            Bill From: <span className='text-uppercase fw-bold'>{invoice.creator}</span> 
                        </div>
                        <div className='card-body'>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Email:{creator.email}</li>
                                <li className="list-group-item">Phone:{creator.phone}</li>
                                <li className="list-group-item">Adresse:{creator.adresse}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-1'></div>
                    <div className="col-5 card">
                        <div className="card-header">
                            Bill To:<span className='text-uppercase fw-bold'> {invoice.client}</span> 
                        </div>
                        <div className='card-body'>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Email:{data.adresse}</li>
                                <li className="list-group-item">Phone:{data.telephone}</li>
                                <li className="list-group-item">Adresse:{data.adresse}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row p-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((c, i) => (
                                <tr key={i}>
                                    <td>{c.title}</td>
                                    <td>{c.price} DT</td>
                                    <td>{c.quantity}</td>
                                    <td>{c.quantity * c.price} DT</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Tax</td>
                                <td>{invoice.tax}%</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className='fw-bold'>Total</td>
                                <td className='fw-bold'>{invoice.total * (1 + (invoice.tax / 100))}DT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex justify-content-between d-print-none'>
                <button type="button" className="col-4 btn btn-lg btn-dark mt-3 mb-3 d-print-none"
                    onClick={() => window.print()}>
                    Print </button>
                <button type="button" className="col-4 btn btn-lg btn-success mt-3 mb-3 d-print-none" onClick={() => handleDownload()}>
                    Download </button>
            </div>
        </div>
    )
}

export default OneInvoice
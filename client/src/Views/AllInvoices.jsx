import React from 'react'
import InvoicePhoto from '../assets/invoice.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AllInvoices = () => {
    // state
    const [invoice, setInvoice] = useState([])
    // fetch
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/Invoices")
            .then((allFactures) => { setInvoice(allFactures.data) })
            .catch((err) => { console.log(err) })
    }, []);
    // go to edit
    const deleteOneFacture = (id) => {
        axios.delete(`http://localhost:8000/api/Invoices/${id}`)
            .then((res) => {
                console.log(res)
                const filtered = invoice.filter((eachfacture) => {
                    return eachfacture._id !== id;
                });
                setInvoice(filtered);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className='allfac'>
            <h1>This all your invoices </h1>
            <div className='facs' >
                {invoice.map((element, idx) => (
                    <section id="card1" className="cardfac" key={idx} onClick={()=>navigate(`/invoices/${element._id}`)}>
                        <svg
                            viewBox="0 0 16 16"
                            className="bi bi-image-fill"
                            fill="currentColor"
                            height="40"
                            width="40"
                            xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                        <img src={InvoicePhoto} alt="invoice" />
                        <div className="card__content">
                            <p className="card__title">{element.invoiceNumber}</p>
                            <p className="card__description">
                                <table>
                                    <thead>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </thead>
                                    {element.items.map((element, idx) => (
                                    <tbody>
                                        <tr>{element.title}</tr>
                                        <tr>{element.price}</tr>
                                        <tr>{element.quantity}</tr>
                                    </tbody>
                        ))}
                                </table>
                            </p>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default AllInvoices
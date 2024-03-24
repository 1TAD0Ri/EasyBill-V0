import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie';

export const NewInvoice = () => {
    const generateUniqueInvoiceNumber = () => {
        const timestamp = new Date().getTime();
        const randomPart = Math.floor(Math.random() * 1000); // Adjust the range based on your preference
        return `${timestamp}-${randomPart}`;
    };
    const [invoiceNumber, setInvoiceNumber] = useState(generateUniqueInvoiceNumber());

    // const [allItems,setAllItems]=useState([])
    const [allClient, setAllClient] = useState([]);
    const [creator, setCreator] = useState("");
    const [client, setClient] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState([]);
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(19);
    const [quantity, setQuantity] = useState(0);
    const [notes, setNotes] = useState("");
    const [type, setType] = useState("purchase");
    const [updated, setUpdated] = useState(false);
    const [creatorUser,setcreatorUser] = useState('');
    const token = Cookies.get("token");
    const [userToken, setUserToken] = useState([]);
    // console.log(client);
    // console.log(userToken);
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/invoices', {
            creator, client, total, invoiceNumber, dueDate,
            items, tax, notes, type,creatorUser
        })
            .then((res) => { console.log(res); navigate('/allInvHome') })
            .catch((error) => { console.log(error) })
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/getClientByUser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                setAllClient(response.data);
                // console.log(allClient);
            }).catch((error) => {
                // console.log(error);
            })
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getusertoken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Update the state with the latest data
                setCreator(response.data.name);
                setcreatorUser(response.data.name);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function
    }, [token]);
    const submitItemHandler = (e) => {
        e.preventDefault()
        const newItem = { title, price, quantity };
        setItems([...items, { title, price, quantity }])
        setTotal((prevTotal) => prevTotal + newItem.price * newItem.quantity);

        // Reset the input fields after submission
        setTitle("");
        setPrice(0);
        setQuantity(0);
        // axios.post('http://localhost:8000/api/Items',{title,price,quantity})
        // .then((res)=>{console.log(res);setUpdated(!updated)})
        // .catch((error)=>{console.log(error)})
    }
    const deleteItem = (i) => {
        setItems(items.filter((_, idx) => idx !== i));
        // axios.delete(`http://localhost:8000/api/items/${id}`)
        // .then(res=>{console.log(res);setUpdated(!updated)})
        // .catch(error=>console.log(error))
    }
    console.log(creatorUser);
    console.log(type);
    return (
        <div className="container">
            <div className="row p-5">
                <form className='col-7 m-2 border shadow p-3' onSubmit={submitHandler}>
                    <h1 className='text-center m-3'>Invoice</h1>
                    <div className="form-group">
                        <label htmlFor="InputCreator">Creator:</label>
                        <input type="text" className="form-control" id="InputCreator" value={creator} readOnly />
                        <input type="hidden" value={creatorUser} />
                        {/* <input type="text" className="form-control" id="InputCreator" value={creator} onChange={(e) => setCreator(e.target.value)} /> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputClient">Client:</label>
                        {/* <input type="text" className="form-control" id="InputClient" value={client} onChange={(e) => setClient(e.target.value)} /> */}
                        <select className="form-control" onChange={(e) => setClient(e.target.value)}>
                            <option value={""}>Select Your Client</option>
                            {allClient.map((element, idx) => (
                                <option key={idx} value={element.reference}>{element.reference}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputType">Type:</label>
                        <select className="form-control" id="InputType" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="purchase">Purchase</option>
                            <option value="sales">Sales</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputInvoiceNumber">Invoice Number:</label>
                        <input type="number" className="form-control" id="InputInvoiceNumber" placeholder={invoiceNumber} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputDueDate">Due Date:</label>
                        <input type="date" className="form-control" id="InputDueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputNotes">Notes:</label>
                        <input type="text" className="form-control" id="InputNotes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputItems">Items:</label>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((c, i) => (
                                    <tr>
                                        <td>{c.title}</td>
                                        <td>{c.price} DT</td>
                                        <td>{c.quantity}</td>
                                        <td>{c.quantity * c.price} DT</td>
                                        <td><button type="button" className='btn btn-danger' onClick={() => deleteItem(i)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputTax">Tax:</label>
                        <input type="number" className="form-control" id="InputTax" value={tax} onChange={(e) => setTax(e.target.value)} />
                    </div>
                    <button type="submit" className="col-4 btn btn-lg btn-info mt-3 mb-3">Submit</button>
                </form>
                <form className='col-4 border shadow p-5 m-2' onSubmit={submitItemHandler}>
                    <h1 className='text-center m-3' >Items</h1>
                    <div className="form-group">
                        <label htmlFor="InputItemName">title:</label>
                        <input type="text" className="form-control" id="InputItemName" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPrice">Price:</label>
                        <input type="number" className="form-control" id="InputPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputDescription">Quantity:</label>
                        <input type="text" className="form-control" id="InputDescription" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <button type="submit" className="col-11 btn btn-lg btn-info m-3">Add item</button>
                </form>
            </div>
        </div>
    )
}

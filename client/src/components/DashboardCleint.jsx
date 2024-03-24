import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import '../styles/allcontacts.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const navigate = useNavigate();
    // state
    const [invoice, setInvoice] = useState([])
    const [user, setUser] = useState([]);
    const token = Cookies.get("token");
    const [creatorUser, setcreatorUser] = useState('');
    // fetch

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/api/clients")
    //         .then((allFactures) => { setInvoice(allFactures.data) })
    //         .catch((err) => { console.log(err) })
    // }, []);
    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api/')
    // })
    // go to edit
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =await axios.get('http://localhost:8000/api/getClientByUser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setcreatorUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [token]);
    const deleteOneFacture = (id) => {
        axios.delete(`http://localhost:8000/api/clients/${id}`)
            .then((res) => {
                console.log(res)
                const filtered = invoice.filter((eachfacture) => {
                    return eachfacture._id !== id;
                });
                setInvoice(filtered);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getusertoken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Update the state with the latest data
                setUser(response.data.name);
                // setcreatorUser(response.data.name);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the fetchData function
    }, [token]);
    return (
        <div className="container p-5">
            <div className="d-flex flex-column ">
                <div className='d-flex justify-content-between p-5' style={{ }}>
                    <h1 className="p-3">Contacts:</h1>
                    <button className="custom-button" onClick={() => navigate('/clients/create')}>Add Client</button>
                </div>
                <div className="contcardclients d-flex justify-content-center align-items-center border shadow bg-dark p-5" style={{ }}>
                    {creatorUser?creatorUser.map((client) => (
                        <div key={client._id} className="contcardclients">
                            <div className="custom-card-client">
                                <div className="custom-card-content">
                                    <p className="custom-card-heading text-secondary">Client Details</p>
                                    <p className="custom-card-description-client">
                                        Title<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.titre}</span>
                                    </p>
                                    <p className="custom-card-description-client">
                                        Prenom<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.prenom}</span>
                                    </p>
                                    <p className="custom-card-description-client">
                                        Telephone<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.telephone}</span>
                                    </p>
                                    <p className="custom-card-description-client">
                                        NumFiscale<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.numérofiscale}</span>
                                    </p>
                                    <p className="custom-card-description-client">
                                        Adresse<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.adresse}</span>
                                    </p>
                                    <p className="custom-card-description-client">
                                        Reference<span style={{ color: 'black', fontWeight: 'bold' }}>: {client.reference}</span>
                                    </p>
                                </div>
                                <div className="custom-card-button-wrapper">
                                    <button className="custom-card-button btn btn-dark" onClick={() => navigate(`/clients/${client._id}`)}>
                                        View
                                    </button>
                                    <button className="custom-card-button btn btn-danger" onClick={() => deleteOneFacture(client._id)}>
                                        Delete
                                    </button>
                                </div>
                                <button className="custom-exit-button"></button>
                            </div>
                        </div>
                    )):""}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
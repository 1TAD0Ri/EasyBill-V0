import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Create = () => {
  const [titre, setTitre] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [numérofiscale, setNumeroFiscale] = useState("");
  const [adresse, setAdresse] = useState("");
  const [reference, setReference] = useState("");
  const [creatorUser, setcreatorUser] = useState('');
  //Create an array to store errors from the API
  const [errors, setErrors] = useState([]);
  const token = Cookies.get("token");
  // navigate
  const nav = useNavigate()
  // handle
  // useEffect(()=>{
  //   const fetchData = async()=>{
  //     try{
  //       const response =axios.get('http://localhost:8000/api/getClientByUser',{
  //         headers:{
  //           Authorization:`Bearer ${token}`
  //         }
  //       });
  //       setcreatorUser(response.data.name);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // },[])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/getusertoken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the state with the latest data
            setcreatorUser(response.data.name);
            // setcreatorUser(response.data.name);
        } catch (error) {
            console.log(error);
        }
    };

    fetchData(); // Call the fetchData function
}, [token]);
  const submitHandler = (e) => {
    e.preventDefault()
    const tempNote = {
      titre,
      prenom,
      telephone,
      numérofiscale,
      adresse,
      reference,
      creatorUser
    };
    // Save
    axios
      .post("http://localhost:8000/api/clients", tempNote)
      .then((res) => {
        console.log(res.data)
        nav(`/clients/${res.data._id}`)
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
      })
  }
  return (
    <div className="container mt-5">
      <div className="border rounded shadow p-3">
        <h1>Add A New Contact</h1>
        <form onSubmit={submitHandler}>
          {errors.map((err, index) => (
            <p style={{ color: "red" }} key={index}>
              {err}
            </p>
          ))}
          <div className="mb-3">
            <label htmlFor="titre" className="form-label" >Titre:</label>
            <input type="text"
              className="form-control"
              id="titre" onChange={(e) => setTitre(e.target.value)} value={titre} />
            <input type='hidden' value={creatorUser} readOnly/>
          </div>
          <div className="mb-3">
            <label htmlFor="prenom" className="form-label">
              Prenom:
            </label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              onChange={(e) => setPrenom(e.target.value)}
              value={prenom}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telephone" className="form-label">
              Telephone:
            </label>
            <input
              type="tel"
              className="form-control"
              id="telephone"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="numérofiscale" className="form-label">
              Numéro Fiscale:
            </label>
            <input
              type="text"
              className="form-control"
              id="numérofiscale"
              onChange={(e) => setNumeroFiscale(e.target.value)}
              value={numérofiscale}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adresse" className="form-label">
              Adresse:
            </label>
            <input
              type="text"
              className="form-control"
              id="adresse"
              onChange={(e) => setAdresse(e.target.value)}
              value={adresse}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="reference" className="form-label">
              Reference:
            </label>
            <input
              type="text"
              className="form-control"
              id="reference"
              onChange={(e) => setReference(e.target.value)}
              value={reference}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ADD Client
          </button>
        </form>
      </div>

    </div>
  );
};

export default Create
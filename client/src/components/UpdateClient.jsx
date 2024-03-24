import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [ titre,setTitre]= useState("");
  const [ prenom,setPrenom]= useState("");
  const [ telephone,setTelephone]= useState("");
  const [ numérofiscale,setNumeroFiscale]= useState("");
  const [ adresse,setAdresse]= useState("");
  const [ reference,setReference]= useState("");

  const {id}=useParams()

  useEffect (()=>{
    axios
    .get(`http://localhost:8000/api/clients/${id}`)
    .then((res)=>{ 
      setTitre(res.data.titre)
      setPrenom(res.data.prenom)
      setTelephone(res.data.telephone)
      setNumeroFiscale(res.data.numérofiscale)
      setAdresse(res.data.adresse)
      setReference(res.data.reference)
  
  
  })
    .catch((err)=>console.log(err))
  },[id]);

   // usenavigate
  const nav = useNavigate()
   //Create an array to store errors from the API
  const [errors, setErrors] = useState([]); 
  // / handle
  const submitHandler =(e)=>{
    e.preventDefault()
    const tempNote = {
      titre,
      prenom,
      telephone,
      numérofiscale,
      adresse,
      reference,
      
    };
    // Save
    axios
    .patch(`http://localhost:8000/api/clients/${id}`,tempNote)
    .then((res)=>{
      console.log(res.data);
      nav (`/clients/${id}`);
    })
    .catch((err)=>{
      console.log(err.message);
      const errorResponse = err.message;

      // const errorArr = []; // Define a temp error array to push the messages in

      // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages

      //     errorArr.push(errorResponse[key].message)

        
      //   }

      //   setErrors(errorArr);
        })

  }

  return (
    // <div>
    //   <form onSubmit={submitHandler}>
    // {errors.map((err, index) => <p style={{ color:"red" }} key={index}>{err}</p>)}
    // <div>
    //     <label >Titre:</label>
    //     <input type='select' onChange={(e)=> setTitre(e.target.value)}  value={titre}/>
    //   </div>
    //   <div>
    //     <label >prenom:</label>
    //     <input type='text' onChange={(e)=> setPrenom(e.target.value)}  value={prenom}/>
    //   </div>
    //   <div>
    //     <label >telephone:</label>
    //     <input onChange={(e)=> setTelephone(e.target.value)}  value={telephone} />
    //   </div>
    //   <div>
    //     <label >numérofiscale:</label>
    //     <input onChange={(e)=> setNumeroFiscale(e.target.value)}  value={numérofiscale} />
    //   </div>
    //   <div>
    //     <label >adresse:</label>
    //     <input onChange={(e)=> setAdresse(e.target.value)}  value={adresse} />
    //   </div>
    //   <div>
    //     <label >reference:</label>
    //     <input onChange={(e)=> setReference(e.target.value)}  value={reference} />
    //   </div>
    //   <button type='submit'> Update Invoice</button>
    // </form></div>
    <div className="container mt-5">
      <div className="border rounded shadow p-3">
        <h1>Update Contact Details</h1>
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
            Update Client
          </button>
        </form>
      </div>

    </div>
  )
}

export default Update;
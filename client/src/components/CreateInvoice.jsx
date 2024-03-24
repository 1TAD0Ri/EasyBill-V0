import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateInvoice = () => {
  const [ titre,setTitre]= useState("");
  const [ prenom,setPrenom]= useState("");
  const [ telephone,setTelephone]= useState("");
  const [ numérofiscale,setNumeroFiscale]= useState("");
  const [ adresse,setAdresse]= useState("");
  const [ reference,setReference]= useState("");
  const [creatorUser,setcreatorUser] = useState('');
  //Create an array to store errors from the API
  const [errors, setErrors] = useState([]); 
  // navigate
  const nav = useNavigate()
  // handle
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
    .post("http://localhost:8001/api/factures",tempNote)
    .then((res)=>{
      console.log(res.data)
      nav (`/factures/${res.data._id}`)
    })
    .catch((err)=>{
      const errorResponse = err.response.data.errors;

      const errorArr = []; // Define a temp error array to push the messages in

      for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages

          errorArr.push(errorResponse[key].message)

        
        }

        setErrors(errorArr);
        })

  }

  return (
    <div>

<form onSubmit={submitHandler}>
    {errors.map((err, index) => <p style={{ color:"red" }} key={index}>{err}</p>)}
  
  
      <div>
        <label >Titre:</label>
        <input type='select' onChange={(e)=> setTitre(e.target.value)}  value={titre}/>
      </div>
      <div>
        <label >prenom:</label>
        <input type='text' onChange={(e)=> setPrenom(e.target.value)}  value={prenom}/>
      </div>
      <div>
        <label >telephone:</label>
        <input onChange={(e)=> setTelephone(e.target.value)}  value={telephone} />
      </div>
      <div>
        <label >numérofiscale:</label>
        <input onChange={(e)=> setNumeroFiscale(e.target.value)}  value={numérofiscale} />
      </div>
      <div>
        <label >adresse:</label>
        <input onChange={(e)=> setAdresse(e.target.value)}  value={adresse} />
      </div>
      <div>
        <label >reference:</label>
        <input onChange={(e)=> setReference(e.target.value)}  value={reference} />
      </div>
    
      
      <button> ADD Invoice</button>
    </form>

    </div>
  )
}

export default CreateInvoice
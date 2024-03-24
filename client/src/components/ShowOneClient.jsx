import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ShowOne = () => {
  const [invoice, setInvoice] = useState(null);
  const { id } = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8000/api/clients/${id}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => console.log(err))
  }, [id]);

  // usenavigate
  const nav = useNavigate()

  const goToEditPage = (id) => {
    nav(`/clients/${id}/edit`);

  }


  return (
    <div className='container'>
      <div className=' col  m-3 border rounded shadow'>
        <h1 className='m-3'>Client Details:</h1>
        {invoice ? <div className='p-5'>
          <h2>{invoice.titre} {invoice.prenom} </h2>
          <p>Téléphone n°: {invoice.telephone}</p>
          <p>Numéro Fiscal{invoice.numérofiscale}</p>
          <p>Adresse: {invoice.adresse}</p>
          <p>Ref: {invoice.reference}</p>
        </div> : "loading"}
        <div className="col-4 d-flex justify-content-between p-5">
          <button className='btn btn-lg btn-dark' onClick={() => navigate('/allContacts')}>All Contacts</button>
          <button className='btn btn-lg btn-dark' onClick={() => goToEditPage(invoice._id)}>Update</button>
        </div>
        
      </div>
    </div>
  )
}

export default ShowOne
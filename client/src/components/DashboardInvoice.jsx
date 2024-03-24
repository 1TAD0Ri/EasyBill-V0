import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";

const Dashboard = () => {
    // state
    const [invoice,setInvoice]=useState([])
    // fetch
    
    useEffect(()=>{
        axios
        .get("http://localhost:8001/api/factures")
        .then((allFactures)=>{setInvoice(allFactures.data)})
        .catch((err)=>{console.log(err)})
    },[]);

    // go to edit
    
    const deleteOneFacture=(id)=>{
        axios.delete(`http://localhost:8001/api/factures/${id}`)
        .then((res)=>{console.log(res)
            const filtered= invoice.filter((eachfacture)=>{
                return eachfacture._id !==	id;
            });
            setInvoice(filtered);
        })
            .catch((err)=>console.log(err));
        
    }

return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>titre</th>
                    <th>prenom</th>
                    <th>telephone</th>
                    <th> numérofiscale</th>
                    <th>adresse</th>
                    <th>reference</th>
                
                </tr>
            </thead>
            <tbody>
            {invoice.map((OneFacture)=>( 
                <tr key={OneFacture._id}>
                    <td>
                        <Link to={`/factures/${OneFacture._id}`}>
                            {OneFacture.titre}
                            </Link>
                        </td>
                
                    <td>{OneFacture.prenom}</td>
                    <td>{OneFacture.telephone}</td>
                    <td>{OneFacture.numérofiscale}</td>
                    <td>{OneFacture.adresse}</td>
                    <td>{OneFacture.reference}</td>
                    <td><button onClick={()=> deleteOneFacture(OneFacture._id)}>delete</button></td>
                </tr>))}
            </tbody>
            
        
        </table>


    </div>
)
}

export default Dashboard
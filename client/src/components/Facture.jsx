import React from 'react'
import '../styles/facture.css'

const Facture = () => {
    return (
        <div>
            <div>
                <span>Date : 01/11/2024</span>
                <span>Objet Client</span>
                <button>Ajouter des articles en masse</button>
            </div>
            <div>
                <form>
                    <input type="text" placeholder="Titre" />
                    <input type="text" placeholder="Description" />
                    <input type="text" placeholder="Ajouter Un Article" />
                    <input type="number" placeholder="Qte" />
                    <select>
                        <option value="payable_a_reception">Payable à réception</option>
                    </select>
                    <input type="number" placeholder="P.U." />
                    <input type="number" placeholder="Remise" />
                    <input type="text" placeholder="N'De Reference" />
                    <input type="number" placeholder="Taxe" />
                    <input type="date" placeholder="Échéance" />
                    <button type="submit">Ajouter</button>
                </form>
            </div>
            <div className='priceartbtn'>
                <div>
                <span>Les prix des articles sont en</span>
                <span>RELIÉ AU JOURNAL COMPTABLE</span>
                <span>01/11/2024</span>*

                </div>
                <div className='btnadddelinv'>
                <button>INV</button>
                <button>Ajouter</button>
                <button>Supprimer</button>

                </div>
            </div>
            <div>
                <span>Prix Hors Taxes</span>
                <span>0.000</span>
                <span>-705-Études Et Prestations De Services</span>
            </div>
            <div>
                <span>Facture N ° 00001</span>
                <span>0</span>
                <span>T</span>
            </div>
        </div>
    )
}

export default Facture
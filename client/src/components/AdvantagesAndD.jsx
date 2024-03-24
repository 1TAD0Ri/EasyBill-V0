import React from 'react'
import '../styles/advantages.css'

const AdvantagesAndD = () => {
    return (
        <div className="business-management-tool" id='advan'>
            <h1>Easy, Fast and Complete.</h1>
            <h4>A single tool to effectively manage one or more businesses</h4>
            <div className="features">
                <div className="feature">
                    <h2 className='titleadvan'>Fast Billing</h2>
                    <h4 className='contadvan'>Create and send PDF invoices in 60 seconds flat and automate their recurrences.</h4>
                </div>
                <div className="feature">
                    <h2 className='titleadvan'>Detailed Dashboard</h2>
                    <h4 className='contadvan'>Focus on the essentials, we take care of the complicated numbers for you.</h4>
                </div>
                <div className="feature">
                    <h2 className='titleadvan'>Easy Quotes</h2>
                    <h4 className='contadvan'>Generate a personalized quote in a few clicks and download it in PDF instantlyt</h4>
                </div>
                <div className="feature">
                    <h2 className='titleadvan'>Up-to-date Customer Base</h2>
                    <h4 className='contadvan'>Create your customer, view their sales history and automate payment reminders.</h4>
                </div>
            </div>
        </div>
    )
}

export default AdvantagesAndD
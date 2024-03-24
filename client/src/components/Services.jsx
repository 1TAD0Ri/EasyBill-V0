import React from 'react'
import '../styles/services.css'
import HeadPhone from '../assets/headphones.png'

const Services = () => {
    return (
        <div className='containerserv'>

        <div className='container' id='ourservices'>
            <div className='ourserv'>
                <h1>Our Services</h1>
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,</h3>
            </div>
            <div className='containerofserv'>
                <div className='boxofserv '>
                    <img className='headphones' src={HeadPhone} alt="" />
                    <h2>24/7 Support</h2>
                    <h3>Sample text. Click to select the text box.<br />
                        Click again or double click to start editing the text. <br />
                        Excepteur sint occaecat cupidatat non proident. <br /></h3>
                </div>
                <div className='boxofserv '>
                    <img className='headphones' src={HeadPhone} alt="" />
                    <h2>24/7 Support</h2>
                    <h3>Sample text. Click to select the text box.<br />
                        Click again or double click to start editing the text. <br />
                        Excepteur sint occaecat cupidatat non proident. <br /></h3>
                </div>
                <div className='boxofserv '>
                    <img className='headphones' src={HeadPhone} alt="" />
                    <h2>24/7 Support</h2>
                    <h3>Sample text. Click to select the text box.<br />
                        Click again or double click to start editing the text. <br />
                        Excepteur sint occaecat cupidatat non proident. <br /></h3>
                </div>
                <div className='boxofserv '>
                    <img className='headphones' src={HeadPhone} alt="" />
                    <h2>24/7 Support</h2>
                    <h3>Sample text. Click to select the text box.<br />
                        Click again or double click to start editing the text. <br />
                        Excepteur sint occaecat cupidatat non proident. <br /></h3>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Services
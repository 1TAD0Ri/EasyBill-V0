import React from 'react';
import '../styles/howtocreate.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import imgFunc from '../assets/imgfunc1.jpg'
import imgFun from '../assets/imgfun2.jpg'

const HowToCreate = () => {
    return (
        <div className='containercreate' id='howtocreate'>
            <div className='cont'>
            <div className="waviy">
                    <span style={{ '--i': 1 }}>F</span>
                    <span style={{ '--i': 2 }}>u</span>
                    <span style={{ '--i': 3 }}>n</span>
                    <span style={{ '--i': 4 }}>c</span>
                    <span style={{ '--i': 5 }}>i</span>
                    <span style={{ '--i': 6 }}>o</span>
                    <span style={{ '--i': 7 }}>n</span>
                    <span style={{ '--i': 8 }}>a</span>
                    <span style={{ '--i': 9 }}>l</span>
                    <span style={{ '--i': 10 }}>i</span>
                    <span style={{ '--i': 11 }}>t</span>
                    <span style={{ '--i': 12 }}>y</span>
                </div>
                <div>
                <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="How To Create INVOICES">
                            
                                <img src={imgFunc} alt="" />
                            
                
                        </Tab>
                        <Tab eventKey="profile" title="How To Add CLIENTS">
                    <img src={imgFun} alt=""  />
                        </Tab>
                
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default HowToCreate;

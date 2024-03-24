import React from 'react'
import '../styles/team.css'
import ano from '../assets/ano.jpg'


const OurTeam = () => {
    return (
        <div className='teamcont' id='ourteam'>
            <div className='titleteam'>
            <div class="spinnerr">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                <div className="waviy">
                    <span style={{ '--i': 1 }}>O</span>
                    <span style={{ '--i': 2 }}>u</span>
                    <span style={{ '--i': 3 }}>r</span>
                    <span style={{ '--i': 4 }}>T</span>
                    <span style={{ '--i': 5 }}>e</span>
                    <span style={{ '--i': 6 }}>a</span>
                    <span style={{ '--i': 7 }}>m</span>
                    <span style={{ '--i': 8 }}>.</span>
                </div>
            </div>
            <div className="new-responsive-container-block new-container" >
                <div className="new-responsive-container-block">
                    <div className="new-responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 new-card-container">
                        <div className="new-card">
                            <div className="new-team-image-wrapper">
                                <img className="new-team-member-image" src={ano} alt="Team Member" />
                            </div>
                            <p className="new-text-blk new-name">
                                Aladdin
                            </p>
                            <p className="new-text-blk new-position">
                                Full Stack Developer
                            </p>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other team members */}
                </div>
                <div className="new-responsive-container-block">
                    <div className="new-responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 new-card-container">
                        <div className="new-card">
                            <div className="new-team-image-wrapper">
                                <img className="new-team-member-image" src={ano} alt="Team Member" />
                            </div>
                            <p className="new-text-blk new-name">
                                Anis 
                            </p>
                            <p className="new-text-blk new-position">
                                Scrum Master
                            </p>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other team members */}
                </div>
                <div className="new-responsive-container-block">
                    <div className="new-responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 new-card-container">
                        <div className="new-card">
                            <div className="new-team-image-wrapper">
                                <img className="new-team-member-image" src={ano} alt="Team Member" />
                            </div>
                            <p className="new-text-blk new-name">
                                Ilyes  
                            </p>
                            <p className="new-text-blk new-position">
                                Product Owner
                            </p>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other team members */}
                </div>
                <div className="new-responsive-container-block">
                    <div className="new-responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 new-card-container">
                        <div className="new-card">
                            <div className="new-team-image-wrapper">
                                <img className="new-team-member-image" src={ano} alt="Team Member" />
                            </div>
                            <p className="new-text-blk new-name">
                                Jesser 
                            </p>
                            <p className="new-text-blk new-position">
                                Back-End Developer
                            </p>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other team members */}
                </div>
                <div className="new-responsive-container-block">
                    <div className="new-responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 new-card-container">
                        <div className="new-card">
                            <div className="new-team-image-wrapper">
                                <img className="new-team-member-image" src={ano} alt="Team Member" />
                            </div>
                            <p className="new-text-blk new-name">
                                Gaith                             </p>
                            <p className="new-text-blk new-position">
                                Full Stack Developer
                            </p>
                        </div>
                    </div>
                    {/* Repeat similar blocks for other team members */}
                </div>
            </div>
        </div>
    );
}
export default OurTeam
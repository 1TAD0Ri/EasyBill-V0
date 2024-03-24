import React from 'react'
import Navbar from '../components/Navbar'
import CompanyPresentation from '../components/CompanyPresentation';
import Services from '../components/Services';
import OurTeam from '../components/OurTeam';
import HowToCreate from '../components/HowToCreate';
import ProductOwner from '../components/ProductOwner';
import Footer from '../components/Footerr';
import AdvantagesAndD from '../components/AdvantagesAndD';

const HomePage = () => {
    return (
        <div>

            <Navbar />
            <CompanyPresentation />
            <ProductOwner />
            <AdvantagesAndD />
            {/* <Services /> */}
            <HowToCreate />
            <OurTeam />
            <Footer />
        </div>

    )
}

export default HomePage
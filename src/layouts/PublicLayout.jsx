import React from 'react';
import { Outlet } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Gallery from '../components/Gallery/Gallery';
import ICT from '../components/ICT/ICT';
import Shop from '../components/Shop/Shop';
import Footer from '../components/Footer/Footer';

const PublicLayout = () => {
    return (
        <div className="App">
            <Hero />
            <About />
            <Gallery />
            <ICT />
            <Shop />
            <Footer />
        </div>
    );
};

export default PublicLayout;

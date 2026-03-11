import React from 'react';
import './Hero.css';
import heroBg from '../../assets/images/4.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-image-container">
        <img src={heroBg} alt="Hero Background" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <h1 className="hero-title fade-in">CALI MAHDI</h1>
        <h2 className="hero-subtitle fade-in" style={{ animationDelay: '0.2s' }}>
          Multimedia Architect | ICT Specialist | Educator
        </h2>
        <p className="hero-description fade-in" style={{ animationDelay: '0.4s' }}>
          Waxaan ahay hal-abuure isku dhafay farshaxanka muuqaalka iyo cilmiga tignoolajiyada.
          In ka badan 7 sano, waxaan soo agaasimay Documentaries, xayeysiisyo ganacsi, iyo Vlogs tayo sare leh.
          Waxaan hadda aqoonteydii u beddelay jiil-dhis, anigoo bixiya koorsooyin heer sare ah oo ku saabsan Camera-ga iyo Multimedia-ga.
          Wax kasta oo aan qabto waxay ka turjumayaan hal-ku-dhigga <strong>@CALI-MAHDI</strong>.
        </p>
        <div className="hero-ctas fade-in" style={{ animationDelay: '0.6s' }}>
          <a href="#work" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-outline">Hire Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

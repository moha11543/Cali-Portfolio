import React from 'react';
import './About.css';
import profileImg from '../../assets/images/cover.jpg';

const About = () => {
    const expertise = [
        { title: '7+ Years Experience', detail: 'Worked with top Photo Agencies & Companies.' },
        { title: 'Education', detail: "Bachelor of ICT (Abaarso University, Class of 2025)." },
        { title: 'Specialties', detail: 'Documentary Filmmaking, Corporate Adverts, Vlogs, and Video Editing.' },
        { title: 'Teaching', detail: 'Professional Camera Training & Multimedia Courses.' }
    ];

    return (
        <section id="about" className="about section">
            <div className="container about-grid">
                <div className="about-image-container fade-in">
                    <div className="image-wrapper">
                        {/* Placeholder headshot of a professional photographer */}
                        <img
                            src={profileImg}
                            alt="Cali Mahdi Osman"
                            className="about-image"
                        />
                        <div className="image-accent"></div>
                    </div>
                </div>

                <div className="about-content fade-in" style={{ animationDelay: '0.2s' }}>
                    <h2 className="section-title">About <span className="text-gradient">Cali Mahdi</span></h2>
                    <p className="about-bio">
                        I am a dedicated Multimedia Architect and ICT Specialist with over 7 years of industry experience.
                        My work sits at the intersection of cinematic storytelling and technical innovation.
                        Currently pursuing a Bachelor of ICT at Abaarso University, I specialize in creating high-impact
                        visual content that resonates with global audiences.
                    </p>

                    <div className="expertise-list">
                        {expertise.map((item, index) => (
                            <div key={index} className="expertise-item glass-card">
                                <h3 className="expertise-title">{item.title}</h3>
                                <p className="expertise-detail">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

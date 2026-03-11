import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">CALI <span className="text-gradient">MAHDI</span></h2>
                        <p className="footer-tagline">Multimedia Architect | ICT Specialist</p>
                    </div>

                    <div className="footer-socials">
                        <a href="https://wa.me/252634281065" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
                        <a href="mailto:contact@calimahdi.com" className="social-link">Email</a>
                        <a href="https://www.facebook.com/mahdi.xikmaawi" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
                        <a href="https://www.tiktok.com/@cali_mahdi1?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-link">TikTok</a>
                        <a href="https://instagram.com/cali-mahdi" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; 2026 CALI MAHDI. All rights reserved.</p>
                    <p className="developer-credit">
                        Developed by <a href="https://www.facebook.com/mohamet.saed.hussein/" target="_blank" rel="noopener noreferrer" className="highlight">@Mohamet Saet</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

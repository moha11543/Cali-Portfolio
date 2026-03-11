import React, { useState } from 'react';
import './Gallery.css';

// Import local assets
import img1 from '../../assets/images/1.jpg';
import img2 from '../../assets/images/2.jpg';
import img3 from '../../assets/images/3.jpg';
import img4 from '../../assets/images/4.jpg';
import img5 from '../../assets/images/5.jpg';
import img6 from '../../assets/images/6.jpg';
import img7 from '../../assets/images/7.jpg';
import img8 from '../../assets/images/8.jpg';
import img9 from '../../assets/images/9.jpg';
import img11 from '../../assets/images/11.jpg';
import img15 from '../../assets/images/15.jpeg';
import img99 from '../../assets/images/99.jpg';
import aboutImg from '../../assets/images/about.jpg';

import vid1 from '../../assets/videos/1.mp4';
import vid2 from '../../assets/videos/2.mp4';

const MOBILE_LIMIT = 6;

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAllMobile, setShowAllMobile] = useState(false);

    const categories = ['All', 'Documentaries', 'Commercial Ads', 'Vlogs', 'Photography'];

    const projects = [
        {
            id: 1,
            title: 'Cinematic Documentary',
            category: 'Documentaries',
            image: img1
        },
        {
            id: 2,
            title: 'Commercial Production',
            category: 'Commercial Ads',
            image: img2
        },
        {
            id: 3,
            title: 'Life in Vlogs (Part 1)',
            category: 'Vlogs',
            image: img3,
            video: vid1,
            isVideo: true
        },
        {
            id: 4,
            title: 'Street Photography',
            category: 'Photography',
            image: img4
        },
        {
            id: 5,
            title: 'Digital Branding',
            category: 'Commercial Ads',
            image: img5
        },
        {
            id: 6,
            title: 'Stories of Change',
            category: 'Documentaries',
            image: img6
        },
        {
            id: 7,
            title: 'Urban Exploration',
            category: 'Photography',
            image: img7
        },
        {
            id: 8,
            title: 'Behind the Scenes (Part 2)',
            category: 'Vlogs',
            image: img8,
            video: vid2,
            isVideo: true
        },
        {
            id: 9,
            title: 'Technical Precision',
            category: 'Documentaries',
            image: aboutImg
        },
        {
            id: 10,
            title: 'Modern Vision',
            category: 'Photography',
            image: img11
        },
        {
            id: 11,
            title: 'Frame of Mind',
            category: 'Photography',
            image: img15
        },
        {
            id: 12,
            title: 'Timeless Capture',
            category: 'Photography',
            image: img99
        }
    ];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    // On mobile, limit to MOBILE_LIMIT unless expanded
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const visibleProjects = (!showAllMobile && isMobile)
        ? filteredProjects.slice(0, MOBILE_LIMIT)
        : filteredProjects;

    const hasMoreMobile = filteredProjects.length > MOBILE_LIMIT;

    return (
        <section id="work" className="gallery section">
            <div className="container">
                <h2 className="section-title text-center">My <span className="text-gradient">Showcase</span></h2>

                <div className="filter-buttons">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => { setFilter(cat); setShowAllMobile(false); }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="masonry-grid">
                    {visibleProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="gallery-item fade-in"
                            onClick={() => project.video && setSelectedProject(project)}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="gallery-img"
                                loading={index < 4 ? 'eager' : 'lazy'}
                            />
                            <div className="gallery-hover">
                                {project.isVideo && (
                                    <div className="play-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="project-category">{project.category}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <span className="project-branding">@CALI-MAHDI</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: View Gallery / Show Less button */}
                {hasMoreMobile && (
                    <div className="gallery-view-more">
                        <button
                            className="btn gallery-expand-btn"
                            onClick={() => setShowAllMobile(!showAllMobile)}
                        >
                            {showAllMobile ? (
                                <><span className="gallery-expand-icon">↑</span> Show Less</>
                            ) : (
                                <><span className="gallery-expand-icon">🖼</span> View Full Gallery</>
                            )}
                        </button>
                    </div>
                )}

                {selectedProject && selectedProject.video && (
                    <div className="lightbox" onClick={() => setSelectedProject(null)}>
                        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
                            <video key={selectedProject.video} autoPlay playsInline controls className="lightbox-video" poster={selectedProject.image}>
                                <source src={selectedProject.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;

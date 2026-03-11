import React, { useState, useEffect } from 'react';
import './CourseDetail.css';

// Import Assets - Camera Basics
import step100Img from '../../assets/images/100.png';
import step101Img from '../../assets/images/101.png';
import step102Img from '../../assets/images/102.png';

// Import Assets - Advanced Editing
import step200Img from '../../assets/images/200.png';
import step201Img from '../../assets/images/201.png';
import step202Img from '../../assets/images/202.png';

// Import Assets - Multimedia Workflow
import step300Img from '../../assets/images/300.png';
import step301Img from '../../assets/images/301.png';
import step302Img from '../../assets/images/302.png';

const CourseDetail = ({ course, onClose }) => {
    const [selectedStep, setSelectedStep] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!course) return null;

    // Somali Content Mapping
    const content = {
        'Camera Basics': {
            intro: 'Maqaamka koorsada "Camera Basics" waa mid ardayda u sahlaysa inay bartaan aasaaska sawir-qaadista heerka caalamiga ah. Hadii aad tahay bilaabe raba inuu fahmo kaamirada, kani waa bilawgaaga.',
            useVisualGrid: true,
            roadmap: [
                {
                    id: '01',
                    title: 'Aasaaska & Qalabka',
                    desc: 'Barashada qaybaha kaamirada iyo muraayadaha (Lenses).',
                    image: step100Img,
                    details: [
                        "Fahamka sida dhabta ah ee ay u shaqeyso kaamiradaada.",
                        "Barashada lenses-ka kala duwan (Wide, Portrait, iyo Zoom) iyo goorta la isticmaalo.",
                        "Sida loo habeeyo Settings-ka aasaasiga ah ka hor intaanad bilaabin duubista."
                    ]
                },
                {
                    id: '02',
                    title: 'Exposure Triangle',
                    desc: 'Fahamka ISO, Aperture, iyo Shutter Speed.',
                    image: step101Img,
                    details: [
                        "Shutter Speed: Sida loo xakameeyo dhaqdhaqaaqa (Motion Blur).",
                        "Aperture (F-Stop): Sida loo sameeyo gadaal-madowga (Bokeh) ee quruxda badan.",
                        "ISO: Sida loo helo iftiin saafi ah xitaa meelaha mugdiga ah."
                    ]
                },
                {
                    id: '03',
                    title: 'Composition & Light',
                    desc: 'Sida loo qaado sawir professional ah.',
                    image: step102Img,
                    details: [
                        "Rule of Thirds: Sida loo meeliyo qofka aad sawirayso si indhaha u soo jiito.",
                        "Natural vs Artificial Light: Sida looga faa'iideysto iftiinka qorraxda iyo kan studio-ga.",
                        "Framing techniques: Sida loo abuuro sawir leh sheeko iyo dareen."
                    ]
                }
            ],
            skills: ['Exposure Triangle Mastery', 'Lens Selection', 'Portrait & Landscape Composition', 'Natural Lighting Management']
        },
        'Advanced Editing': {
            intro: 'Deep dive into professional post-production. Koorsadan waxaan ku baran doonaa habka sawirrada iyo muuqaalada loo qaabeeyo si ay u yeeshaan tayo sare iyo xamaasad cinematic ah.',
            useVisualGrid: true,
            roadmap: [
                {
                    id: '01',
                    title: 'Professional Software Mastery',
                    desc: 'Barashada Adobe Premiere Pro iyo DaVinci Resolve.',
                    image: step200Img,
                    details: [
                        "Barashada qoto dheer ee Adobe Premiere Pro iyo DaVinci Resolve.",
                        "Habaynta Timeline-ka iyo isticmaalka Shortcuts-ka xawaaraha kordhiya.",
                        "Maamulista faylasha waaweyn (Proxy Workflow) si barnaamijku uusan u gaabin."
                    ]
                },
                {
                    id: '02',
                    title: 'Cinematic Color Grading',
                    desc: 'Fahamka midabaynta iyo samaynta Cinematic Looks.',
                    image: step201Img,
                    details: [
                        "Fahamka LOG footage iyo sida loogu beddelo midabyo dabiici ah (Rec.709).",
                        "Color Correction vs Color Grading: Sida loo abuuro dareen gaar ah (Mood).",
                        "Isticmaalka Masks iyo Tracking si loo iftiimiyo wajiga qofka ama walax gooni ah."
                    ]
                },
                {
                    id: '03',
                    title: 'Sound Design & Final Polish',
                    desc: 'Habaynta maqalka filimka iyo Sound Effects.',
                    image: step202Img,
                    details: [
                        "Sida loo nadiifiyo sawaxanka (Noise reduction) iyo habaynta codka macaan.",
                        "Kudarista Sound Effects (SFX) si filimku u yeesho dareen dhab ah.",
                        "Settings-ka u dambeeya ee dhoofinta (Export) si tayada ugu sarreysa loogu helo YouTube iyo Instagram."
                    ]
                }
            ],
            skills: ['Speed Ramping & Transitions', 'Professional Color Wheels', 'Noise Reduction', 'Audio Mixing']
        },
        'Multimedia Workflow': {
            intro: 'Koorsadan waxay kaa caawinaysaa inaad shaqada u qabato sidii studio weyn. Waxaa lagu bari doonaa nidaamka socodka shaqada ee saxda ah (Concept to Export).',
            useVisualGrid: true,
            roadmap: [
                {
                    id: '01',
                    title: 'Pre-Production Planning',
                    desc: 'Sida loo qorsheeyo filim ka hor intaan la duubin.',
                    image: step300Img,
                    details: [
                        "Sida loo qoro Script-ka iyo sameynta Storyboard ka hor duubista.",
                        "Qorshaynta goobta (Location scouting) iyo diyaarinta qalabka saxda ah.",
                        "Maamulista waqtiga iyo miisaaniyadda mashruuca."
                    ]
                },
                {
                    id: '02',
                    title: 'Production & Data Management',
                    desc: 'Maamulista xogta iyo kaydinta faylasha waaweyn.',
                    image: step301Img,
                    details: [
                        "Farsamooyinka duubista tooska ah iyo xiriirka kooxda shaqada.",
                        "Sida loo habeeyo xogta (Data Offloading) si aysan u lumaan faylashu.",
                        "Isticmaalka nidaamka 'Digital Asset Management' ee xirfadleyda."
                    ]
                },
                {
                    id: '03',
                    title: 'Distribution & Marketing',
                    desc: 'U dhoofinta filimka baraha bulshada (Reels, YT, FB).',
                    image: step302Img,
                    details: [
                        "Sida loo dhoofiyo (Export) tayo kala duwan oo loogu talagalay TV, Cinema, iyo Social Media.",
                        "Barashada xuquuqda daabacaadda iyo ilaalinta shaqadaada.",
                        "Sida loogu suuq-geeyo shaqadaada macaamiisha caalamiga ah."
                    ]
                }
            ],
            skills: ['Storyboarding', 'Project Organization', 'Multi-camera Syncing', 'Social Media Algorithms']
        }
    };

    const courseInfo = content[course.title] || {
        intro: course.description,
        roadmap: [],
        skills: []
    };

    return (
        <div className="course-modal-overlay" onClick={onClose}>
            <div className="course-modal-content fade-in" onClick={(e) => e.stopPropagation()}>
                <button className="course-modal-close" onClick={onClose}>&times;</button>

                {selectedStep ? (
                    /* Expanded Step View */
                    <div className="expanded-step-view fade-in">
                        <button className="back-btn" onClick={() => setSelectedStep(null)}>
                            ← Back to Roadmap
                        </button>

                        <div className="expanded-grid">
                            <div className="expanded-image-container">
                                <img src={selectedStep.image} alt={selectedStep.title} className="expanded-image" />
                            </div>
                            <div className="expanded-content">
                                <span className="step-id">{selectedStep.id}</span>
                                <h2 className="text-gradient">{selectedStep.title}</h2>
                                <div className="detail-points">
                                    {selectedStep.details.map((point, idx) => (
                                        <div key={idx} className="detail-point-item">
                                            <span className="point-icon">▹</span>
                                            <p>{point}</p>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-primary booking-btn-sm" onClick={() => setSelectedStep(null)}>
                                    Arkay, ku noqo Roadmap-ka
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Main Course Detail View */
                    <div className="course-detail-grid">
                        {/* Left Column: Intro & Roadmap */}
                        <div className="course-main-info">
                            <div className="course-intro">
                                <span className="step-level">Master Class</span>
                                <h2 className="text-gradient">{course.title}</h2>
                                <p>{courseInfo.intro}</p>
                            </div>

                            <div className="roadmap-section">
                                <div className="roadmap-header">
                                    <h3>Course Roadmap</h3>
                                    {courseInfo.useVisualGrid && <span className="helper-text">(Click cards for details)</span>}
                                </div>

                                {courseInfo.useVisualGrid ? (
                                    <div className="roadmap-visual-grid">
                                        {courseInfo.roadmap.map((step) => (
                                            <div
                                                key={step.id}
                                                className="step-card clickable"
                                                onClick={() => setSelectedStep(step)}
                                            >
                                                <div className="step-card-image">
                                                    <img src={step.image} alt={step.title} />
                                                    <div className="card-overlay">
                                                        <span>View Details</span>
                                                    </div>
                                                </div>
                                                <div className="step-card-content">
                                                    <span className="step-id">{step.id}</span>
                                                    <h4 className="step-title">{step.title}</h4>
                                                    <p className="step-desc">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="roadmap-stepper">
                                        {courseInfo.roadmap.map((step, idx) => (
                                            <div key={idx} className="step-item">
                                                <div className="step-dot"></div>
                                                <span className="step-level">{step.level}</span>
                                                <h4 className="step-title">{step.title}</h4>
                                                <p className="step-desc">{step.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Skills & Status */}
                        <div className="course-side-info">
                            <div className="skills-section">
                                <h4><span className="course-icon">{course.icon}</span> Skills You Will Gain</h4>
                                <ul className="skills-list">
                                    {courseInfo.skills.map((skill, idx) => (
                                        <li key={idx} className="skill-item">
                                            <span className="skill-check">✓</span> {skill}
                                        </li>
                                    ))}
                                </ul>

                                <div className="course-info-box">
                                    <div className="info-item">
                                        <span className="info-label">Where to join?</span>
                                        <span className="info-value">📍 British Academy, Erigavo-Somaliland</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Method</span>
                                        <span className="info-value">🎥 Live Sessions</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary booking-btn" onClick={() => window.location.href = `https://wa.me/252634281065?text=Hi%20Cali%20Mahdi%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(course.title)}%20course.`}>
                                Book Your Seat Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;

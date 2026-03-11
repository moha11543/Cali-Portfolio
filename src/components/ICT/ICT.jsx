import React, { useState } from 'react';
import CourseDetail from './CourseDetail';
import './ICT.css';

const ICT = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const courses = [
        {
            id: 1,
            title: 'Camera Basics',
            description: 'Master the fundamentals of composition, lighting, and camera settings.',
            icon: '📷'
        },
        {
            id: 2,
            title: 'Advanced Editing',
            description: 'Deep dive into professional post-production workflows and techniques.',
            icon: '🎬'
        },
        {
            id: 3,
            title: 'Multimedia Workflow',
            description: 'Streamline your production process from concept to final delivery.',
            icon: '💻'
        }
    ];

    return (
        <section id="training" className="ict section">
            <div className="container">
                <div className="ict-header text-center fade-in">
                    <h2 className="section-title">Master Multimedia Course <span className="text-gradient">with Cali Mahdi</span></h2>
                    <p className="ict-subtitle">"Training-ka iyo koorsooyinka aan bixino waxay u qaybsamaan saddex marxaladood. Dooro qaybta ku qancisa, ka dibna soo 'Booking' gareey si aad uga mid noqoto xirfadlayda mustaqbalka."</p>
                </div>

                <div className="courses-grid">
                    {courses.map((course, index) => (
                        <div key={course.id} className="course-card glass-card fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="course-icon">{course.icon}</div>
                            <h3 className="course-title">{course.title}</h3>
                            <p className="course-description">{course.description}</p>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setSelectedCourse(course)}
                            >
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCourse && (
                <CourseDetail
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </section>
    );
};

export default ICT;

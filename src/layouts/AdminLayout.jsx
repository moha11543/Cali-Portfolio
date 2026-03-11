import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, LogOut, Settings, PlaySquare, ShoppingBag } from 'lucide-react';

import './AdminLayout.css';

const AdminLayout = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) console.error("Session error:", error.message);
            setSession(session);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to check session:", err);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>Loading Admin...</div>;
    }

    // If not logged in and trying to access an admin route (not login)
    if (!session && !location.pathname.includes('/admin/login')) {
        return <Navigate to="/admin/login" replace />;
    }

    // If logged in and trying to access login page
    if (session && location.pathname.includes('/admin/login')) {
        return <Navigate to="/admin" replace />;
    }

    // If on login page (and not logged in based on above checks), just render the Outlet (Login component)
    if (location.pathname.includes('/admin/login')) {
        return <Outlet />;
    }

    return (
        <div className="admin-shell">
            {/* Mobile Hamburger Button */}
            <button
                className={`admin-hamburger ${sidebarOpen ? 'is-open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle Menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Mobile Overlay */}
            <div
                className={`admin-overlay ${sidebarOpen ? 'overlay-visible' : ''}`}
                onClick={closeSidebar}
            ></div>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-logo">
                    <h2>Cali Admin</h2>
                </div>

                <nav className="sidebar-nav">
                    <Link
                        to="/admin"
                        className={`sidebar-link ${location.pathname === '/admin' ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link
                        to="/admin/presets"
                        className={`sidebar-link ${location.pathname === '/admin/presets' ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <PlaySquare size={20} /> Presets
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`sidebar-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <ShoppingBag size={20} /> Orders
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sidebar-logout-btn">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

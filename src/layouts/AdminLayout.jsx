import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, LogOut, Settings, PlaySquare, ShoppingBag } from 'lucide-react';

const AdminLayout = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
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
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: '#121212', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>Cali Admin</h2>
                </div>

                <nav style={{ flex: 1, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link to="/admin" style={navLinkStyle(location.pathname === '/admin')}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/presets" style={navLinkStyle(location.pathname === '/admin/presets')}>
                        <PlaySquare size={20} /> Presets
                    </Link>
                    <Link to="/admin/orders" style={navLinkStyle(location.pathname === '/admin/orders')}>
                        <ShoppingBag size={20} /> Orders
                    </Link>
                </nav>

                <div style={{ padding: '2rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={handleLogout} style={{ ...navLinkStyle(false), width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#ff4d4d' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

const navLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: isActive ? '#fff' : '#a0a0a0',
    background: isActive ? 'rgba(0, 112, 243, 0.1)' : 'transparent',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontWeight: isActive ? '600' : '400'
});

export default AdminLayout;

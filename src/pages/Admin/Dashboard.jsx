import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { PlaySquare, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ presets: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Mock stats for now, will replace with real counts later
            const { count: presetCount } = await supabase.from('presets').select('*', { count: 'exact', head: true });
            const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

            setStats({
                presets: presetCount || 0,
                orders: orderCount || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Stat Card 1 */}
                <div style={{ background: '#121212', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>Total Presets</h3>
                        <div style={{ background: 'rgba(0, 112, 243, 0.1)', padding: '0.5rem', borderRadius: '8px', color: '#0070f3' }}>
                            <PlaySquare size={24} />
                        </div>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{loading ? '...' : stats.presets}</p>
                    <Link to="/admin/presets" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#0070f3', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Manage Presets <ArrowUpRight size={16} />
                    </Link>
                </div>

                {/* Stat Card 2 */}
                <div style={{ background: '#121212', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>Total Orders</h3>
                        <div style={{ background: 'rgba(0, 164, 94, 0.1)', padding: '0.5rem', borderRadius: '8px', color: '#00a45e' }}>
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{loading ? '...' : stats.orders}</p>
                    <Link to="/admin/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#00a45e', textDecoration: 'none', fontSize: '0.9rem' }}>
                        View Orders <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

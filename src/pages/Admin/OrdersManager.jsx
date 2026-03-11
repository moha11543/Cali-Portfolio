import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, Clock } from 'lucide-react';

const OrdersManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        // Join with presets table to get preset title instead of just ID
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching orders:', error);
        else setOrders(data || []);
        setLoading(false);
    };

    const updateOrderStatus = async (id, newStatus) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            alert(error.message);
        } else {
            fetchOrders();
        }
    };

    // Helper to format Date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Orders Viewer</h1>

            <div style={{ background: '#121212', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <tr>
                            <th style={thStyle}>Date & Time</th>
                            <th style={thStyle}>Customer</th>
                            <th style={thStyle}>Preset / Amount</th>
                            <th style={thStyle}>Contact</th>
                            <th style={thStyle}>Method</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0' }}>No orders found yet.</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', color: '#a0a0a0', fontSize: '0.9rem' }}>{formatDate(order.created_at)}</td>

                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{order.full_name}</td>

                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500', marginBottom: '0.2rem' }}>{order.preset_name || 'Unknown Preset'}</div>
                                        <div style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 'bold' }}>${order.amount}</div>
                                    </td>

                                    <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                                        <div>WhatsApp: <span style={{ color: '#00a45e' }}>{order.whatsapp_number}</span></div>
                                        <div style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>{order.email}</div>
                                    </td>

                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem'
                                        }}>
                                            {order.payment_method}
                                        </span>
                                    </td>

                                    <td style={{ padding: '1rem' }}>
                                        {order.status === 'pending' ? (
                                            <span style={{ color: '#ffcc00', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                                                <Clock size={14} /> Pending
                                            </span>
                                        ) : (
                                            <span style={{ color: '#00a45e', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                                                <CheckCircle size={14} /> Verified
                                            </span>
                                        )}
                                    </td>

                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'verified')}
                                                style={{ background: 'rgba(0,164,94,0.1)', color: '#00a45e', border: '1px solid rgba(0,164,94,0.3)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                                            >
                                                Mark Verified
                                            </button>
                                        )}
                                        {order.status === 'verified' && (
                                            <span style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>Sent on WhatsApp</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle = { padding: '1.2rem 1rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem' };

export default OrdersManager;

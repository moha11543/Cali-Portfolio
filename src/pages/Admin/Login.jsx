import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ background: '#121212', padding: '3rem', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: '#0070f3' }}>Admin Login</h2>

                {error && (
                    <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.9rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '1rem', borderRadius: '4px', background: '#0070f3', color: '#fff', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

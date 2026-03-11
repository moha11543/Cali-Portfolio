import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './Shop.css';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
const INITIAL_COUNT = 3;

const Shop = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchPresets = async () => {
            const { data, error } = await supabase
                .from('presets')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (data && !error) {
                const formattedPresets = data.map(preset => ({
                    id: preset.id,
                    title: preset.title,
                    description: preset.description,
                    coverImage: preset.cover_image_url,
                    videoSample: preset.video_sample_url,
                    price: `$${preset.price_num}`,
                    price_num: preset.price_num
                }));
                setPresets(formattedPresets);
            }
            setLoading(false);
        };

        fetchPresets();
    }, []);

    // Stop body scroll when modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedProduct]);

    const visiblePresets = showAll ? presets : presets.slice(0, INITIAL_COUNT);
    const hasMore = presets.length > INITIAL_COUNT;

    return (
        <section id="shop" className="shop section">
            <div className="container">
                <div className="section-header">
                    <h2 className="text-gradient">Cinematic Presets</h2>
                    <p className="section-subtitle">Elevate your footage with my exclusive professional color grading LUTs.</p>
                </div>

                <div className="shop-grid">
                    {loading ? (
                        <p style={{ textAlign: 'center', width: '100%' }}>Loading presets...</p>
                    ) : presets.length === 0 ? (
                        <p style={{ textAlign: 'center', width: '100%' }}>No presets available right now.</p>
                    ) : (
                        visiblePresets.map((preset, index) => (
                            <div
                                key={preset.id}
                                className={`preset-animate ${index >= INITIAL_COUNT ? 'preset-reveal' : ''}`}
                            >
                                <ProductCard
                                    product={preset}
                                    onClick={() => setSelectedProduct(preset)}
                                />
                            </div>
                        ))
                    )}
                </div>

                {!loading && hasMore && (
                    <div className="view-more-container">
                        <button
                            className="btn btn-view-more"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? (
                                <><span className="view-more-icon">↑</span> Show Less</>
                            ) : (
                                <><span className="view-more-icon">↓</span> View More Presets</>
                            )}
                        </button>
                    </div>
                )}

                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default Shop;

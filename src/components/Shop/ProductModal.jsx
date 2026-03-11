import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const STEPS = {
    DETAILS: 'DETAILS',
    PAYMENT_METHOD: 'PAYMENT_METHOD',
    CUSTOMER_INFO: 'CUSTOMER_INFO',
    SUCCESS: 'SUCCESS'
};

const ProductModal = ({ product, onClose }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.DETAILS);
    const [paymentMethod, setPaymentMethod] = useState(''); // 'ZAAD' or 'eDahab'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const handleBuyNow = () => setCurrentStep(STEPS.PAYMENT_METHOD);

    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        setCurrentStep(STEPS.CUSTOMER_INFO);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const amountNum = typeof product.price_num !== 'undefined' ?
            parseFloat(product.price_num) :
            parseFloat((product.price || '0').replace(/[^0-9.]/g, ''));

        try {
            const orderPayload = {
                full_name: formData.name,
                email: formData.email,
                whatsapp_number: formData.whatsapp,
                amount: amountNum,
                preset_name: product.title,
                payment_method: paymentMethod,
                status: 'pending'
            };

            console.log('Submitting order:', orderPayload);

            const { data, error } = await supabase.from('orders').insert([orderPayload]);

            if (error) {
                console.error('Supabase order error:', error);
                alert(`Order failed: ${error.message}`);
                setIsSubmitting(false);
                return;
            }

            console.log('Order saved successfully:', data);
        } catch (err) {
            console.error('Unexpected error:', err);
            alert(`Unexpected error: ${err.message}`);
            setIsSubmitting(false);
            return;
        }

        // Generate USSD tel link
        let ussdCode = '';
        if (paymentMethod === 'ZAAD') {
            ussdCode = `tel:*880*0634281065*${amountNum}%23`;
        } else if (paymentMethod === 'eDahab') {
            ussdCode = `tel:*110*654281065*${amountNum}%23`;
        }

        if (ussdCode) window.location.href = ussdCode;

        setIsSubmitting(false);
        setCurrentStep(STEPS.SUCCESS);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card fade-in" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                {currentStep === STEPS.DETAILS && (
                    <div className="modal-details">
                        <div className="modal-media-container">
                            {showVideo && product.videoSample ? (
                                <video src={product.videoSample} autoPlay loop controls className="modal-media"></video>
                            ) : (
                                <img src={product.coverImage} alt={product.title} className="modal-media" />
                            )}

                            {product.videoSample && (
                                <button
                                    className="media-toggle-btn"
                                    onClick={() => setShowVideo(!showVideo)}
                                >
                                    {showVideo ? 'Show Image' : 'Watch Video'}
                                </button>
                            )}
                        </div>
                        <div className="modal-info">
                            <h2 className="text-gradient">{product.title}</h2>
                            <p className="modal-desc">{product.description}</p>
                            <div className="modal-price">Price: <span>{product.price}</span></div>
                            <button className="btn btn-primary buy-btn" onClick={handleBuyNow}>Buy Now</button>
                        </div>
                    </div>
                )}

                {currentStep === STEPS.PAYMENT_METHOD && (
                    <div className="modal-payment fade-in">
                        <h3>Select Payment Method</h3>
                        <div className="payment-options">
                            <button className="payment-btn zaad-btn" onClick={() => handleSelectMethod('ZAAD')}>
                                <span className="payment-name">ZAAD Service</span>
                            </button>
                            <button className="payment-btn edahab-btn" onClick={() => handleSelectMethod('eDahab')}>
                                <span className="payment-name">eDahab Service</span>
                            </button>
                        </div>
                        <button className="back-btn" onClick={() => setCurrentStep(STEPS.DETAILS)}>Back</button>
                    </div>
                )}

                {currentStep === STEPS.CUSTOMER_INFO && (
                    <div className="modal-form-view fade-in">
                        <h3>Customer Information</h3>
                        <p className="form-subtitle">Payment via {paymentMethod}</p>
                        <form onSubmit={handleSubmit} className="customer-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ali Abdi" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="ali@example.com" />
                            </div>
                            <div className="form-group">
                                <label>WhatsApp Number</label>
                                <input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleChange} placeholder="+252 63 XXXXXXX" />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(STEPS.PAYMENT_METHOD)}>Back</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Processing...' : 'Send & Proceed to Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {currentStep === STEPS.SUCCESS && (
                    <div className="modal-success fade-in">
                        <div className="success-icon">✓</div>
                        <h3>Mahadsanid!</h3>
                        <p className="success-msg">Lacag bixintaada waa nala soo gaartay. Fadlan sug ilaa 30 daqiiqo inta aan xaqiijinayno.</p>
                        <p className="delivery-msg">Xirmadaada (Preset-ka) waxaa si toos ah loogu soo diri doonaa WhatsApp-kaaga markii la xaqiijiyo.</p>
                        <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>Done</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductModal;

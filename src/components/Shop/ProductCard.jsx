import React from 'react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div className="product-card glass-card fade-in" onClick={onClick}>
            <div className="product-image-container">
                <img src={product.coverImage} alt={product.title} className="product-image" />
                <div className="product-overlay">
                    <span className="btn btn-primary preview-btn">View Details</span>
                </div>
            </div>
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;

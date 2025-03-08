import React from 'react';
import { useParams } from 'react-router-dom';


function ProductPage() {
    const { productId } = useParams();

    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Product ID: {productId}</p>
            {/* Anothe content */}
        </div>
    );
}


export default ProductPage;
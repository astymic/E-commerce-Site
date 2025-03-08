import React from 'react';
import { useParams } from 'react-router-dom';


function CategoryPage() {
    const { categoryId } = useParams();

    return (
        <div>
            <h1>Category Page</h1>
            <p>Category ID: {categoryId}</p>
            {/* Anothe content */}
        </div>
    );
}


export default CategoryPage;
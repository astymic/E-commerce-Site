import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';


function App() {
  return (
    <Router> 
      <div className="App">
        {/* Header will go herer */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Route for the homepage */}
            <Route path="/category/:categoryId" element={<CategoryPage />} /> {/* Route for category page */}
            <Route path="/product/:productId" element={<ProductPage />} /> {/* Route for product detail page */}
            {/* Another routes */}
          </Routes>
        {/* Footer will go here */}
      </div>
    </Router>
  );
}

export default App;

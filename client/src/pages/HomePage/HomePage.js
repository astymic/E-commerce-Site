import React from 'react';
import HeroBanner from './components/HeroBanner';
import TopSellingProducts from './components/TopSellingProducts';
import SpecialOffers from './components/SpecialOffers';
import NewArrivals from './components/NewArrivals';
import CategoryOverview from './components/CategoryOverview';

function HomePage() {
    return (
        <div className="home-page">
            <HeroBanner />
            <TopSellingProducts />
            <SpecialOffers />
            <NewArrivals />
            <CategoryOverview />
        </div>
    );
}


export default HomePage;
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
    const location = useLocation();

    if (loading) {
        return <div>Loading Authentication...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(PrivateRoute);
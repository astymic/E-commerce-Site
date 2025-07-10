import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const AdminPricateRoute = ({ auth: { isAuthenticated, loading, user } }) => {
    const location = useLocation();

    if (loading) {
        return <div>Loading Authentication...</div>
    }

    // Check for authentication and Admin role
    if (isAuthenticated && user && user.role === 'admin') {
        return <Outlet />;
    }

    // If authenticated but not Admin, redirect
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Navigate to="/login" state={{ from: location }} replace />
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminPricateRoute);
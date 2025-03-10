import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
    // Determine if the user is authenticated and not loading
    const authCheck = isAuthenticated && !loading;

    return authCheck ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

const mapStateToProps = state => ({
    auth: state.auth // Map auth state from Redux
});


export default connect(mapStateToProps)(PrivateRoute);
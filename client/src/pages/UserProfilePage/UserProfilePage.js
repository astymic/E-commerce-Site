import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../../redux/actions/authActions";


function UserProfilePage() {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && !user && !loading) {
            dispatch(loadUser());
        }
    }, [dispatch, isAuthenticated, user, loading]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (loading || !user) {
        return <p>Loading profile...</p>;
    }

    if (!isAuthenticated) {
        return <p>Please login in to view your profile</p>
    }

    return (
        <div className="user-profile-page container">
            <h1>My Profile</h1>
            <div className="profile-details">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
}


export default UserProfilePage;
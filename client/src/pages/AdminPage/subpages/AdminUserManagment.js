import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, adminUpdateUserRole } from "../../../redux/actions/adminActions";


function AdminUserManagment() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.adminUsers);
    const { user: currentUser } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAdminUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, newRole) => {
        dispatch(adminUpdateUserRole(userId, newRole));
    };

    const roleOptions = ['user', 'admin'];

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div>
            <div className="admin-page-header">
                <h2>Manage Users</h2>
            </div>
            {error && <p style={{ color: 'red' }}>Error: {error.msg || 'Could not fetch users.'}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select 
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        disabled={currentUser?._id === user._id}
                                    >
                                        {roleOptions.map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUserManagment;
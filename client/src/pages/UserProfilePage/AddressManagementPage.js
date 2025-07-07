import React, { useState, useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses, addAddress, deleteAddress, updateAddress } from "../../redux/actions/addressActions";

function AddressManagementPage() {
    const dispatch = useDispatch();
    const { addresses, loading, error } = useSelector(state => state.address);
    const { isAuthenticated } = useSelector(state => state.auth);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddressData, setNewAddressData] = useState({
        type: 'address',
        city: '',
        location: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAddresses());
        }
    }, [dispatch, isAuthenticated]);

    const handleAddFormChange = e => {
        setNewAddressData({ ...newAddressData, [e.target.name]: e.target.value });
    };

    const handleAddAddress = e => {
        e.preventDefault();
        dispatch(addAddress(newAddressData));
        // Clear form and hide after submission
        setNewAddressData({ type: 'address', city: '', location: '' });
        setShowAddForm(false);
    };

    const handleDeleteAddress = (addressId) => {
        if (window.confirm('Are you syre you want to delete this address?')) {
            dispatch(deleteAddress(addressId));
        }
    };

    const handleSetDefault = (addressId) => {
        dispatch(updateAddress(addressId, { isDefault: true }));
    };

    if (loading && addresses.length === 0) {
        return <p>Loading addresses...</p>;
    };

    return (
        <div className="address-management-page">
            <h2>Saved Addresses</h2>
            {error && <p style={{ color: 'red' }}>Error: {error.msg || 'Could not manage addresses.'}</p>}
            
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary mb-3">
                {showAddForm ? 'Cancel' : 'Add New Address'}
            </button>

            {showAddForm && (
                <form onSubmit={handleAddAddress} className="add-address-form mb-3">
                    <h3>Add New Address</h3>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={newAddressData.type} onChange={handleAddFormChange} required>
                            <option value="address">Home Address</option>
                            <option value="post">Postal Point</option>
                            <option value="store">Store Pickup</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={newAddressData.city} onChange={handleAddFormChange} required/>
                    </div>
                    <div>
                        <label htmlFor="location">
                            {newAddressData.type === 'address' ? 'Address Line:':
                            newAddressData.type === 'post' ? 'Pickup Point' :
                            'Store Location:'}
                        </label>
                        <input type="text" id="location" name="location" value={newAddressData.location} onChange={handleAddFormChange} required/>
                    </div>
                    <button type="submit" className="btn btn-success">Save Address</button>
                </form>
            )}

            {addresses && addAddress.length > 0 ? (
                <ul className="address-list">
                    {addresses.map(addr => (
                        <li key={addr._id} className={`address-item ${addr.isDefault ? 'default-address': ''}`}>
                            <p><strong>Type:</strong> {addr.type}</p>
                            <p><strong>City:</strong> {addr.city}</p>
                            <p><strong>Location/Address:</strong> {addr.location}</p>
                            {addr.isDefault && <span className="default-badge">(Default)</span>}
                            <div className="address-actions">
                                {!addr.isDefault && (
                                    <button onClick={() => handleSetDefault(addr._id)} className="btn btn-sm btn-secondary">Set as Default</button>
                                )}
                                <button onClick={() => handleDeleteAddress(addr._id)} className="btn btn-sm btn-danger">Delete</button>
                                {/* Edit button later */}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>You have no saved addresses.</p>
            )}
        </div>
    );
}

export default AddressManagementPage;
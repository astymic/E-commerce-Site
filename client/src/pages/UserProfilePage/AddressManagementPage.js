import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses, addAddress, deleteAddress, updateAddress } from "../../redux/actions/addressActions";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, CheckCircle2, Home, Truck, Store, X } from "lucide-react";

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
        setNewAddressData({ type: 'address', city: '', location: '' });
        setShowAddForm(false);
    };

    const handleDeleteAddress = (addressId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            dispatch(deleteAddress(addressId));
        }
    };

    const handleSetDefault = (addressId) => {
        dispatch(updateAddress(addressId, { isDefault: true }));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'address': return <Home size={20} />;
            case 'post': return <Truck size={20} />;
            case 'store': return <Store size={20} />;
            default: return <MapPin size={20} />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between bg-white p-8 rounded-[2.5rem] shadow-premium border border-neutral-50 mb-8">
                <div>
                    <h2 className="text-3xl font-display font-extrabold text-neutral-900 italic mb-2">Saved Addresses</h2>
                    <p className="text-sm text-neutral-400 font-medium tracking-tight">Manage your frequent delivery destinations</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${showAddForm ? 'bg-neutral-900 text-white rotate-45' : 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:scale-105'}`}
                >
                    <Plus size={24} />
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-10 rounded-[3rem] shadow-2xl border border-primary-50 relative overflow-hidden"
                    >
                        <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-display font-bold">New Destination</h3>
                                <button onClick={() => setShowAddForm(false)} className="text-neutral-300 hover:text-neutral-900"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleAddAddress} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Location Type</label>
                                        <select name="type" value={newAddressData.type} onChange={handleAddFormChange} className="input-field appearance-none" required>
                                            <option value="address">Home Address</option>
                                            <option value="post">Postal Office</option>
                                            <option value="store">Brand Store</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">City</label>
                                        <input type="text" name="city" value={newAddressData.city} onChange={handleAddFormChange} placeholder="e.g. New York" className="input-field" required />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">
                                            {newAddressData.type === 'address' ? 'Street Address / Building' :
                                                newAddressData.type === 'post' ? 'Office Name / ZIP Code' :
                                                    'Store Branch Name'}
                                        </label>
                                        <input type="text" name="location" value={newAddressData.location} onChange={handleAddFormChange} placeholder="Detailed location information..." className="input-field" required />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-full py-4 text-lg">Save Destination</button>
                            </form>
                        </div>
                        {/* Gradient decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {addresses?.map((addr, idx) => (
                        <motion.div
                            key={addr._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`bg-white p-8 rounded-[2.5rem] shadow-premium border-2 transition-all relative group ${addr.isDefault ? 'border-primary-600 shadow-xl shadow-primary-600/5' : 'border-neutral-50 hover:border-neutral-200'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${addr.isDefault ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-neutral-400'}`}>
                                    {getIcon(addr.type)}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!addr.isDefault && (
                                        <button onClick={() => handleSetDefault(addr._id)} className="p-3 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                                            <CheckCircle2 size={18} />
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteAddress(addr._id)} className="p-3 text-neutral-400 hover:text-danger hover:bg-danger/5 rounded-full transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em] mb-1 italic">
                                {addr.type === 'address' ? 'Residency' : addr.type === 'post' ? 'Logistics' : 'Store Collection'}
                            </p>
                            <h4 className="text-xl font-display font-bold text-neutral-900 mb-2 truncate">{addr.city}</h4>
                            <p className="text-sm font-medium text-neutral-500 line-clamp-2 italic">{addr.location}</p>

                            {addr.isDefault && (
                                <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                                    <CheckCircle2 size={12} />
                                    Primary Address
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {!loading && addresses?.length === 0 && !showAddForm && (
                    <div className="col-span-full py-20 bg-neutral-50 rounded-[3rem] border-2 border-dashed border-neutral-100 text-center flex flex-col items-center gap-4">
                        <MapPin size={40} className="text-neutral-200" />
                        <p className="text-neutral-400 font-medium font-display italic">Your destination list is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddressManagementPage;
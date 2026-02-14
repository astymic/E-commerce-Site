import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminImportData } from '../../../redux/actions/adminActions';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileJson,
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Info,
    RefreshCcw,
    Database,
    ArrowRight,
    FileCode
} from 'lucide-react';

function AdminDataImport() {
    const dispatch = useDispatch();
    const { loading, importResults, error } = useSelector(state => state.admin);

    const [file, setFile] = useState(null);
    const [importType, setImportType] = useState('products');
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target.result);
                    setPreview(json);
                } catch (err) {
                    setPreview({ error: "Invalid JSON format" });
                }
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleImport = async () => {
        if (!preview || preview.error) return;
        dispatch(adminImportData(importType, preview));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
                    <Database size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">Data Import</h2>
                    <p className="text-neutral-500 font-medium">Bulk upload products or categories via JSON</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Configuration Slot */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-premium">
                        <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                            <Info size={18} className="text-primary-600" />
                            Configuration
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Import Type</label>
                                <div className="grid grid-cols-1 gap-2">
                                    <button
                                        onClick={() => setImportType('products')}
                                        className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center gap-3 ${importType === 'products' ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-md' : 'border-neutral-100 bg-neutral-50 text-neutral-400'}`}
                                    >
                                        <Database size={16} /> Products
                                    </button>
                                    <button
                                        onClick={() => setImportType('categories')}
                                        className={`p-4 rounded-2xl border text-sm font-bold transition-all flex items-center gap-3 ${importType === 'categories' ? 'border-primary-600 bg-primary-50 text-primary-600 shadow-md' : 'border-neutral-100 bg-neutral-50 text-neutral-400'}`}
                                    >
                                        <FileJson size={16} /> Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary-500/20">
                        <h4 className="font-bold flex items-center gap-2 mb-2 italic">
                            <FileCode size={18} /> JSON Format
                        </h4>
                        <p className="text-xs text-primary-100 leading-relaxed opacity-80">
                            Ensure your JSON follows the required schema. For products, include `name`, `price`, and `category`.
                        </p>
                    </div>
                </div>

                {/* Upload Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-100 shadow-premium min-h-[300px] flex flex-col items-center justify-center relative">
                        {!file ? (
                            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
                                <div className="w-20 h-20 bg-neutral-50 text-neutral-300 rounded-3xl flex items-center justify-center mb-4 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all border-2 border-dashed border-neutral-200">
                                    <UploadCloud size={32} />
                                </div>
                                <span className="font-bold text-neutral-900 mb-1">Upload JSON File</span>
                                <span className="text-xs text-neutral-400 font-medium italic">Drop your file here or click to browse</span>
                                <input type="file" accept=".json" onChange={handleFileChange} hidden />
                            </label>
                        ) : (
                            <div className="w-full h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-success/10 text-success rounded-2xl flex items-center justify-center">
                                            <FileJson size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900">{file.name}</p>
                                            <p className="text-xs text-neutral-400 italic">{(file.size / 1024).toFixed(2)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setFile(null); setPreview(null); }}
                                        className="p-2 text-neutral-400 hover:text-danger hover:bg-danger/5 rounded-full transition-all"
                                    >
                                        <RefreshCcw size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 bg-neutral-900 rounded-2xl p-6 font-mono text-[10px] text-primary-400 overflow-y-auto max-h-[20rem] scrollbar-thin scrollbar-thumb-neutral-800">
                                    <pre>{JSON.stringify(preview, null, 2)}</pre>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={handleImport}
                                        disabled={loading || (preview && preview.error)}
                                        className="w-full btn btn-primary py-4 text-sm shadow-xl shadow-primary-500/20 group"
                                    >
                                        {loading ? 'Processing Import...' : `Import ${preview?.length || 0} ${importType}`}
                                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Slot */}
                    <AnimatePresence>
                        {importResults && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-premium"
                            >
                                <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-success" />
                                    Import Results
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-success/5 border border-success/10 rounded-2xl p-4 text-center">
                                        <p className="text-xs font-bold text-success uppercase tracking-widest mb-1">Success</p>
                                        <p className="text-3xl font-display font-bold text-success">{importResults.success}</p>
                                    </div>
                                    <div className="bg-danger/5 border border-danger/10 rounded-2xl p-4 text-center">
                                        <p className="text-xs font-bold text-danger uppercase tracking-widest mb-1">Failed</p>
                                        <p className="text-3xl font-display font-bold text-danger">{importResults.failed}</p>
                                    </div>
                                </div>
                                {importResults.errors.length > 0 && (
                                    <div className="mt-6 p-4 bg-neutral-50 rounded-2xl space-y-2">
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertCircle size={14} /> Error Log
                                        </p>
                                        <div className="max-h-[10rem] overflow-y-auto space-y-1">
                                            {importResults.errors.map((err, i) => (
                                                <p key={i} className="text-[10px] text-danger italic font-medium">
                                                    - {err.name}: {err.error}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default AdminDataImport;

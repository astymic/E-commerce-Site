import React from 'react';
import { useSelector } from 'react-redux';
import { Check, ChevronDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

function FilterSidebar({ filterValues = {}, onFilterChange }) {
    const { category, loading } = useSelector(state => state.category);

    const handleCheckboxChange = (filterName, optionValue, isChecked) => {
        const currentFilterOptions = filterValues[filterName] || [];
        let updatedOptions;
        if (isChecked) {
            updatedOptions = [...currentFilterOptions, optionValue];
        } else {
            updatedOptions = currentFilterOptions.filter(option => option !== optionValue);
        }
        onFilterChange({ ...filterValues, [filterName]: updatedOptions });
    };

    const handleInputChange = (filterName, value) => {
        onFilterChange({ ...filterValues, [filterName]: value === "" ? undefined : value });
    };

    if (loading) return <div className="space-y-6">{[1, 2, 3].map(i => <div key={i} className="h-40 bg-neutral-200 animate-pulse rounded-3xl" />)}</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2 text-neutral-900 mb-2">
                <Filter size={20} className="text-primary-600" />
                <h2 className="text-lg font-display font-bold">Filters</h2>
            </div>

            {category?.filters?.map((filter, idx) => (
                <motion.div
                    key={filter.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 bg-white rounded-[2rem] shadow-premium border border-neutral-100"
                >
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 px-1">
                        {filter.name}
                    </h3>

                    {/* Checkbox UI */}
                    {filter.type === 'checkbox' && (
                        <div className="space-y-4">
                            {filter.options?.map(option => {
                                const isChecked = (filterValues[filter.name] || []).includes(option);
                                return (
                                    <label key={option} className="flex items-center group cursor-pointer">
                                        <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center mr-3 ${isChecked ? 'bg-primary-600 border-primary-600' : 'bg-transparent border-neutral-200 group-hover:border-primary-400'
                                            }`}>
                                            {isChecked && <Check size={14} className="text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={isChecked}
                                            onChange={(e) => handleCheckboxChange(filter.name, option, e.target.checked)}
                                        />
                                        <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-900'}`}>
                                            {option}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {/* Range UI */}
                    {filter.type === 'range' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400">Min</label>
                                    <input
                                        type="number"
                                        placeholder="$0"
                                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-sm focus:bg-white focus:border-primary-500 outline-none transition-all"
                                        value={filterValues[`${filter.name}-min`] || ''}
                                        onChange={(e) => handleInputChange(filter.name + '-min', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400">Max</label>
                                    <input
                                        type="number"
                                        placeholder="$10k"
                                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-sm focus:bg-white focus:border-primary-500 outline-none transition-all"
                                        value={filterValues[`${filter.name}-max`] || ''}
                                        onChange={(e) => handleInputChange(filter.name + '-max', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Radio UI */}
                    {filter.type === 'radio' && (
                        <div className="space-y-4">
                            {[null, ...filter.options].map((option, i) => {
                                const isAll = option === null;
                                const isChecked = isAll ? !filterValues[filter.name] : filterValues[filter.name] === option;
                                return (
                                    <label key={i} className="flex items-center group cursor-pointer">
                                        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center mr-3 ${isChecked ? 'bg-primary-600 border-primary-600' : 'bg-transparent border-neutral-200 group-hover:border-primary-400'
                                            }`}>
                                            {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            checked={isChecked}
                                            onChange={() => handleInputChange(filter.name, isAll ? "" : option)}
                                        />
                                        <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-900'}`}>
                                            {isAll ? 'See All' : option}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

export default FilterSidebar;
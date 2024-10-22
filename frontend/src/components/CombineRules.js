import React, { useState, useEffect } from 'react';
import { getRules, combineRules } from '../utils/api';

const CombineRules = ({ onRulesCombined }) => {
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);
    const [operator, setOperator] = useState('AND');
    const [error, setError] = useState(null);

    useEffect(() => {
        loadRules();
    }, []);

    const loadRules = async () => {
        try {
            const response = await getRules();
            setRules(response.data);
        } catch (err) {
            setError('Failed to load rules');
        }
    };

    const handleRuleSelect = (ruleId) => {
        if (selectedRules.includes(ruleId)) {
            setSelectedRules(selectedRules.filter(id => id !== ruleId));
        } else {
            setSelectedRules([...selectedRules, ruleId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (selectedRules.length < 2) {
            setError('Please select at least two rules to combine');
            return;
        }

        try {
            const response = await combineRules({
                rule_ids: selectedRules,
                operator
            });
            if (onRulesCombined) {
                onRulesCombined(response.data);
            }
            setSelectedRules([]);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to combine rules');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Combine Rules</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Operator
                        <select
                            value={operator}
                            onChange={(e) => setOperator(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Rules to Combine
                    </label>
                    {rules.map(rule => (
                        <div key={rule.id} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedRules.includes(rule.id)}
                                onChange={() => handleRuleSelect(rule.id)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="ml-2">{rule.name}</label>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    disabled={selectedRules.length < 2}
                >
                    Combine Rules
                </button>
            </form>
        </div>
    );
};

export default CombineRules;
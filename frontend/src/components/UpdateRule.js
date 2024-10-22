import React, { useState, useEffect } from 'react';
import { getRules, updateRule } from '../utils/api';

const UpdateRule = ({ onRuleUpdated }) => {
    const [rules, setRules] = useState([]);
    const [selectedRule, setSelectedRule] = useState('');
    const [name, setName] = useState('');
    const [ruleString, setRuleString] = useState('');
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
        const rule = rules.find(r => r.id === parseInt(ruleId));
        if (rule) {
            setSelectedRule(ruleId);
            setName(rule.name);
            setRuleString(rule.rule_string);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await updateRule(selectedRule, {
                name,
                rule_string: ruleString
            });
            if (onRuleUpdated) {
                onRuleUpdated(response.data);
            }
            // Reset form
            setSelectedRule('');
            setName('');
            setRuleString('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update rule');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Rule</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Select Rule
                        <select
                            value={selectedRule}
                            onChange={(e) => handleRuleSelect(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Select a rule...</option>
                            {rules.map(rule => (
                                <option key={rule.id} value={rule.id}>
                                    {rule.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Rule Name
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        New Rule String
                        <textarea
                            value={ruleString}
                            onChange={(e) => setRuleString(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            rows="4"
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    disabled={!selectedRule}
                >
                    Update Rule
                </button>
            </form>
        </div>
    );
};

export default UpdateRule;
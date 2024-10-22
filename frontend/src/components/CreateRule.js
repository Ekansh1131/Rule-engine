import React, { useState } from 'react';
import { createRule } from '../utils/api';

const CreateRule = ({ onRuleCreated }) => {
    const [name, setName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await createRule({
                name,
                rule_string: ruleString
            });
            
            setName('');
            setRuleString('');
            if (onRuleCreated) {
                onRuleCreated(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Rule</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rule Name
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
                        Rule String
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
                >
                    Create Rule
                </button>
            </form>
        </div>
    );
};

export default CreateRule;
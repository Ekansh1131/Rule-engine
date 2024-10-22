import React, { useState, useEffect } from 'react';
import { getRules, evaluateRule } from '../utils/api';

const EvaluateRule = () => {
    const [rules, setRules] = useState([]);
    const [selectedRuleId, setSelectedRuleId] = useState('');
    const [userData, setUserData] = useState({
        age: '',
        department: '',
        salary: '',
        experience: ''
    });
    const [result, setResult] = useState(null);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        try {
            const response = await evaluateRule({
                rule_id: selectedRuleId,
                user_data: {
                    age: parseInt(userData.age),
                    department: userData.department,
                    salary: parseInt(userData.salary),
                    experience: parseInt(userData.experience)
                }
            });
            setResult(response.data.result);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to evaluate rule');
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Evaluate Rule</h2>
            
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
                            value={selectedRuleId}
                            onChange={(e) => setSelectedRuleId(e.target.value)}
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

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Age
                            <input
                                type="number"
                                name="age"
                                value={userData.age}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                            <input
                                type="text"
                                name="department"
                                value={userData.department}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Salary
                            <input
                                type="number"
                                name="salary"
                                value={userData.salary}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Experience (years)
                            <input
                                type="number"
                                name="experience"
                                value={userData.experience}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                required
                            />
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    disabled={!selectedRuleId}
                >
                    Evaluate Rule
                </button>
            </form>

            {result !== null && (
                <div className={`mt-4 p-4 rounded-md ${result ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Rule evaluation result: <strong>{result ? 'True' : 'False'}</strong>
                </div>
            )}
        </div>
    );
};

export default EvaluateRule;
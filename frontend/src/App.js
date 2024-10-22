import React, { useState, useEffect } from 'react';
import { getRules } from './utils/api';
import CreateRule from './components/CreateRule';
import UpdateRule from './components/UpdateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';
import RulesList from './components/RulesList';

function App() {
    const [rules, setRules] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadRules();
    }, []);

    const loadRules = async () => {
        try {
            const response = await getRules();
            setRules(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load rules');
        }
    };

    const handleRuleCreated = () => {
        loadRules();
    };

    const handleRuleUpdated = () => {
        loadRules();
    };

    const handleRuleDeleted = () => {
        loadRules();
    };

    const handleRulesCombined = () => {
        loadRules();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Rule Engine
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <CreateRule onRuleCreated={handleRuleCreated} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <UpdateRule onRuleUpdated={handleRuleUpdated} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                        <CombineRules onRulesCombined={handleRulesCombined} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                        <EvaluateRule />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mt-8">
                    <RulesList 
                        rules={rules} 
                        onRuleDeleted={handleRuleDeleted}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
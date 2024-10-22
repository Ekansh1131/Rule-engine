import React from 'react';
import DeleteRule from './DeleteRule';

const RulesList = ({ rules, onRuleDeleted }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Existing Rules</h2>
            
            {rules.length === 0 ? (
                <p className="text-gray-600">No rules created yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rule
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rules.map(rule => (
                                <tr key={rule.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {rule.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                            {rule.rule_string}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(rule.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <DeleteRule 
                                            rule={rule} 
                                            onRuleDeleted={onRuleDeleted}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RulesList;
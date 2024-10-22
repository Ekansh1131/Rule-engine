import React, { useState } from 'react';
import { deleteRule } from '../utils/api';

const DeleteRule = ({ rule, onRuleDeleted }) => {
    const [error, setError] = useState(null);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteRule(rule.id);
            onRuleDeleted(rule.id);
            setIsConfirming(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete rule');
        }
    };

    return (
        <div>
            {error && (
                <div className="text-red-600 mb-2">
                    {error}
                </div>
            )}
            
            {!isConfirming ? (
                <button
                    onClick={() => setIsConfirming(true)}
                    className="text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            ) : (
                <div className="space-x-2">
                    <span className="text-sm text-gray-600">Are you sure?</span>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setIsConfirming(false)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        No
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteRule;
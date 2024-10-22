import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateRule from '../CreateRule';
import { createRule } from '../../utils/api';

// Mock the API
jest.mock('../../utils/api');

describe('CreateRule', () => {
    it('renders correctly', () => {
        const { getByLabelText, getByText } = render(<CreateRule />);
        expect(getByLabelText(/rule name/i)).toBeInTheDocument();
        expect(getByLabelText(/rule string/i)).toBeInTheDocument();
        expect(getByText(/create rule/i)).toBeInTheDocument();
    });

    it('submits form successfully', async () => {
        const mockOnRuleCreated = jest.fn();
        createRule.mockResolvedValueOnce({ data: { id: 1, name: 'Test Rule' } });

        const { getByLabelText, getByText } = render(
            <CreateRule onRuleCreated={mockOnRuleCreated} />
        );

        fireEvent.change(getByLabelText(/rule name/i), {
            target: { value: 'Test Rule' }
        });
        fireEvent.change(getByLabelText(/rule string/i), {
            target: { value: 'age > 30' }
        });
        fireEvent.click(getByText(/create rule/i));

        await waitFor(() => {
            expect(createRule).toHaveBeenCalledWith({
                name: 'Test Rule',
                rule_string: 'age > 30'
            });
            expect(mockOnRuleCreated).toHaveBeenCalled();
        });
    });

    it('handles error correctly', async () => {
        createRule.mockRejectedValueOnce({
            response: { data: { error: 'Invalid rule' } }
        });

        const { getByLabelText, getByText } = render(<CreateRule />);

        fireEvent.change(getByLabelText(/rule name/i), {
            target: { value: 'Test Rule' }
        });
        fireEvent.change(getByLabelText(/rule string/i), {
            target: { value: 'invalid > rule' }
        });
        fireEvent.click(getByText(/create rule/i));

        await waitFor(() => {
            expect(getByText(/invalid rule/i)).toBeInTheDocument();
        });
    });
});
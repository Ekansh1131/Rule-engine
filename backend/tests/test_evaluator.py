import pytest
from app.models.rule import Node
from app.utils.evaluator import evaluate_rule

def test_simple_comparison():
    # age > 30
    node = Node('operand', attribute='age', comparator='>', value=30)
    assert evaluate_rule(node, {'age': 35}) is True
    assert evaluate_rule(node, {'age': 25}) is False

def test_and_operation():
    # age > 30 AND department == 'Sales'
    node = Node('operator', operator='AND',
        left=Node('operand', attribute='age', comparator='>', value=30),
        right=Node('operand', attribute='department', comparator='==', value='Sales')
    )
    assert evaluate_rule(node, {'age': 35, 'department': 'Sales'}) is True
    assert evaluate_rule(node, {'age': 25, 'department': 'Sales'}) is False
    assert evaluate_rule(node, {'age': 35, 'department': 'Marketing'}) is False

def test_missing_attribute():
    node = Node('operand', attribute='age', comparator='>', value=30)
    with pytest.raises(ValueError, match="Missing attribute in data: age"):
        evaluate_rule(node, {})

def test_invalid_value_type():
    node = Node('operand', attribute='age', comparator='>', value=30)
    with pytest.raises(ValueError, match="Invalid value type for age"):
        evaluate_rule(node, {'age': 'not_a_number'})
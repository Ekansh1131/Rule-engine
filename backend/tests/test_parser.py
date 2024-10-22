import pytest
from app.utils.parser import create_rule

def test_simple_rule():
    rule = create_rule("age > 30")
    assert rule.node_type == 'operand'
    assert rule.attribute == 'age'
    assert rule.comparator == '>'
    assert rule.value == 30

def test_compound_rule():
    rule = create_rule("age > 30 AND department == 'Sales'")
    assert rule.node_type == 'operator'
    assert rule.operator == 'AND'
    assert rule.left.attribute == 'age'
    assert rule.right.attribute == 'department'

def test_invalid_attribute():
    with pytest.raises(ValueError, match="Invalid attribute"):
        create_rule("invalid_attr > 30")

def test_invalid_syntax():
    with pytest.raises(ValueError, match="Invalid rule syntax"):
        create_rule("age >> 30")

def test_complex_rule():
    rule = create_rule("(age > 30 AND department == 'Sales') OR experience >= 5")
    assert rule.node_type == 'operator'
    assert rule.operator == 'OR'
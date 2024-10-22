import ast
from app.models.rule import Node
from flask import current_app
from app.utils.validator import validate_attribute, validate_comparator

def create_rule(rule_string):
    """
    Parse a rule string into an AST (Abstract Syntax Tree).
    
    Args:
        rule_string (str): The rule string to parse
        
    Returns:
        Node: The root node of the AST
        
    Raises:
        ValueError: If the rule string is invalid
    """
    try:
        tree = ast.parse(rule_string, mode='eval')
        return _build_ast(tree.body)
    except SyntaxError as e:
        raise ValueError(f"Invalid rule syntax: {e}")
    except Exception as e:
        raise ValueError(f"Error parsing rule: {e}")

def _build_ast(node):
    """
    Recursively build our AST from Python's AST.
    """
    if isinstance(node, ast.BoolOp):
        # Handle AND/OR operations
        operator = 'AND' if isinstance(node.op, ast.And) else 'OR'
        if operator not in current_app.config['ALLOWED_OPERATORS']:
            raise ValueError(f"Unsupported operator: {operator}")
        
        left = _build_ast(node.values[0])
        right = _build_ast(node.values[1])
        return Node('operator', operator=operator, left=left, right=right)
    
    elif isinstance(node, ast.Compare):
        # Handle comparisons (>, <, ==, etc.)
        if len(node.ops) != 1 or len(node.comparators) != 1:
            raise ValueError("Only simple comparisons are supported")
        
        attribute = node.left.id
        validate_attribute(attribute)
        
        comparator = _get_comparator(node.ops[0])
        validate_comparator(comparator)
        
        # Handle the right side of the comparison
        if isinstance(node.comparators[0], ast.Num):
            value = node.comparators[0].n
        elif isinstance(node.comparators[0], ast.Str):
            value = node.comparators[0].s
        else:
            raise ValueError("Comparison value must be a number or string")
        
        return Node('operand', attribute=attribute, comparator=comparator, value=value)
    
    else:
        raise ValueError("Unsupported rule structure")

def _get_comparator(op):
    """Convert Python AST comparison operators to strings."""
    op_map = {
        ast.Gt: '>',
        ast.Lt: '<',
        ast.GtE: '>=',
        ast.LtE: '<=',
        ast.Eq: '==',
        ast.NotEq: '!='
    }
    op_type = type(op)
    if op_type not in op_map:
        raise ValueError(f"Unsupported operator: {op_type}")
    return op_map[op_type]
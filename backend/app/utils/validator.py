from flask import current_app

def validate_rule_string(rule_string):
    """
    Validate the rule string format.
    
    Args:
        rule_string (str): The rule string to validate
        
    Raises:
        ValueError: If the rule string is invalid
    """
    if not rule_string:
        raise ValueError("Rule string cannot be empty")
    
    if len(rule_string) > current_app.config['MAX_RULE_LENGTH']:
        raise ValueError(f"Rule string exceeds maximum length of {current_app.config['MAX_RULE_LENGTH']}")
    
    # Basic parentheses matching
    if not _check_parentheses_balance(rule_string):
        raise ValueError("Unbalanced parentheses in rule string")

def validate_attribute(attribute):
    """
    Validate that an attribute is allowed.
    
    Args:
        attribute (str): The attribute to validate
        
    Raises:
        ValueError: If the attribute is not allowed
    """
    if attribute not in current_app.config['ALLOWED_ATTRIBUTES']:
        raise ValueError(f"Invalid attribute: {attribute}. Allowed attributes: {current_app.config['ALLOWED_ATTRIBUTES']}")

def validate_comparator(comparator):
    """
    Validate that a comparator is allowed.
    
    Args:
        comparator (str): The comparator to validate
        
    Raises:
        ValueError: If the comparator is not allowed
    """
    if comparator not in current_app.config['ALLOWED_COMPARATORS']:
        raise ValueError(f"Invalid comparator: {comparator}")

def _check_parentheses_balance(rule_string):
    """Check if parentheses are balanced in the rule string."""
    stack = []
    for char in rule_string:
        if char == '(':
            stack.append(char)
        elif char == ')':
            if not stack:
                return False
            stack.pop()
    return len(stack) == 0
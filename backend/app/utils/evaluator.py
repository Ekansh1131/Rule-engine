def evaluate_rule(node, data):
    """
    Evaluate a rule against provided data.
    
    Args:
        node (Node): The root node of the rule AST
        data (dict): The data to evaluate against
        
    Returns:
        bool: The result of the evaluation
        
    Raises:
        ValueError: If the evaluation fails
    """
    if node.node_type == 'operator':
        left_result = evaluate_rule(node.left, data)
        right_result = evaluate_rule(node.right, data)
        
        if node.operator == 'AND':
            return left_result and right_result
        elif node.operator == 'OR':
            return left_result or right_result
        else:
            raise ValueError(f"Unknown operator: {node.operator}")
    
    elif node.node_type == 'operand':
        if node.attribute not in data:
            raise ValueError(f"Missing attribute in data: {node.attribute}")
        
        actual_value = data[node.attribute]
        expected_value = node.value
        
        # Type conversion for numeric comparisons
        if isinstance(expected_value, (int, float)):
            try:
                actual_value = type(expected_value)(actual_value)
            except (ValueError, TypeError):
                raise ValueError(f"Invalid value type for {node.attribute}")
        
        # Perform comparison
        if node.comparator == '>':
            return actual_value > expected_value
        elif node.comparator == '<':
            return actual_value < expected_value
        elif node.comparator == '>=':
            return actual_value >= expected_value
        elif node.comparator == '<=':
            return actual_value <= expected_value
        elif node.comparator == '==':
            return actual_value == expected_value
        elif node.comparator == '!=':
            return actual_value != expected_value
        else:
            raise ValueError(f"Unknown comparator: {node.comparator}")
    
    else:
        raise ValueError(f"Unknown node type: {node.node_type}")
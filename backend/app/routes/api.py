from flask import Blueprint, request, jsonify
from app import db
from app.models.rule import Rule, Node
from app.utils.parser import create_rule
from app.utils.evaluator import evaluate_rule
import json

api_bp = Blueprint('api', __name__)

@api_bp.route('/rules', methods=['POST'])
def create_rule_endpoint():
    data = request.get_json()
    
    if not data or 'name' not in data or 'rule_string' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        # Parse rule string into AST
        ast = create_rule(data['rule_string'])
        
        # Create new rule
        new_rule = Rule(
            name=data['name'],
            rule_string=data['rule_string'],
            ast_representation=json.dumps(ast.to_dict())
        )
        
        db.session.add(new_rule)
        db.session.commit()
        
        return jsonify(new_rule.to_dict()), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api_bp.route('/rules/<int:rule_id>', methods=['PUT'])
def update_rule(rule_id):
    rule = Rule.query.get_or_404(rule_id)
    data = request.get_json()
    
    if 'name' in data:
        rule.name = data['name']
    
    if 'rule_string' in data:
        try:
            ast = create_rule(data['rule_string'])
            rule.rule_string = data['rule_string']
            rule.ast_representation = json.dumps(ast.to_dict())
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    
    db.session.commit()
    return jsonify(rule.to_dict())

@api_bp.route('/rules/<int:rule_id>', methods=['DELETE'])
def delete_rule(rule_id):
    rule = Rule.query.get_or_404(rule_id)
    db.session.delete(rule)
    db.session.commit()
    return jsonify({'message': 'Rule deleted successfully'})

@api_bp.route('/rules', methods=['GET'])
def get_rules():
    rules = Rule.query.all()
    return jsonify([rule.to_dict() for rule in rules])

@api_bp.route('/rules/evaluate', methods=['POST'])
def evaluate_rule_endpoint():
    data = request.get_json()
    
    if not data or 'rule_id' not in data or 'user_data' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    rule = Rule.query.get_or_404(data['rule_id'])
    ast = Node.from_dict(json.loads(rule.ast_representation))
    
    try:
        result = evaluate_rule(ast, data['user_data'])
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@api_bp.route('/rules/combine', methods=['POST'])
def combine_rules():
    data = request.get_json()
    
    if not data or 'rule_ids' not in data or 'operator' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    rules = Rule.query.filter(Rule.id.in_(data['rule_ids'])).all()
    
    if len(rules) != len(data['rule_ids']):
        return jsonify({'error': 'One or more rules not found'}), 404
    
    try:
        # Combine ASTs
        combined_ast = None
        for rule in rules:
            rule_ast = Node.from_dict(json.loads(rule.ast_representation))
            if combined_ast is None:
                combined_ast = rule_ast
            else:
                combined_ast = Node(
                    node_type='operator',
                    operator=data['operator'].upper(),
                    left=combined_ast,
                    right=rule_ast
                )
        
        # Create new combined rule
        new_rule = Rule(
            name=f"Combined Rule ({data['operator']}) - {', '.join(r.name for r in rules)}",
            rule_string=f"Combined using {data['operator']}",
            ast_representation=json.dumps(combined_ast.to_dict())
        )
        
        db.session.add(new_rule)
        db.session.commit()
        
        return jsonify(new_rule.to_dict()), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
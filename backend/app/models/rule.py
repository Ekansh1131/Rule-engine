from app import db
from datetime import datetime
import json

class Rule(db.Model):
    __tablename__ = 'rules'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rule_string = db.Column(db.Text, nullable=False)
    ast_representation = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Rule {self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'rule_string': self.rule_string,
            'ast_representation': json.loads(self.ast_representation),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Node:
    def __init__(self, node_type, operator=None, left=None, right=None, attribute=None, comparator=None, value=None):
        self.node_type = node_type
        self.operator = operator
        self.left = left
        self.right = right
        self.attribute = attribute
        self.comparator = comparator
        self.value = value

    def to_dict(self):
        if self.node_type == 'operator':
            return {
                'node_type': self.node_type,
                'operator': self.operator,
                'left': self.left.to_dict() if self.left else None,
                'right': self.right.to_dict() if self.right else None
            }
        return {
            'node_type': self.node_type,
            'attribute': self.attribute,
            'comparator': self.comparator,
            'value': self.value
        }

    @staticmethod
    def from_dict(data):
        if data['node_type'] == 'operator':
            return Node(
                node_type='operator',
                operator=data['operator'],
                left=Node.from_dict(data['left']) if data['left'] else None,
                right=Node.from_dict(data['right']) if data['right'] else None
            )
        return Node(
            node_type='operand',
            attribute=data['attribute'],
            comparator=data['comparator'],
            value=data['value']
        )
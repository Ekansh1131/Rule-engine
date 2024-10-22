import json
import pytest
from app import create_app, db

def test_create_rule(client):
    response = client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30 AND department == "Sales"'
    })
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'Test Rule'
    assert 'id' in data

def test_create_invalid_rule(client):
    response = client.post('/api/rules', json={
        'name': 'Invalid Rule',
        'rule_string': 'invalid_attr > 30'
    })
    assert response.status_code == 400

def test_get_rules(client):
    # Create a test rule
    client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30'
    })
    
    response = client.get('/api/rules')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) >= 1

def test_evaluate_rule(client):
    # Create a test rule
    create_response = client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30'
    })
    rule_id = json.loads(create_response.data)['id']
    
    # Test evaluation
    response = client.post('/api/rules/evaluate', json={
        'rule_id': rule_id,
        'user_data': {'age': 35}
    })
    assert response.status_code == 200
    assert json.loads(response.data)['result'] is True
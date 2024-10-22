def test_create_rule(client):
    response = client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30 AND department == "Sales"'
    })
    assert response.status_code == 201
    assert response.json['name'] == 'Test Rule'

def test_get_rules(client):
    # First create a rule
    client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30'
    })
    
    response = client.get('/api/rules')
    assert response.status_code == 200
    assert len(response.json) > 0

def test_evaluate_rule(client):
    # First create a rule
    create_response = client.post('/api/rules', json={
        'name': 'Test Rule',
        'rule_string': 'age > 30'
    })
    rule_id = create_response.json['id']
    
    # Test evaluation
    response = client.post('/api/rules/evaluate', json={
        'rule_id': rule_id,
        'user_data': {'age': 35}
    })
    assert response.status_code == 200
    assert response.json['result'] is True
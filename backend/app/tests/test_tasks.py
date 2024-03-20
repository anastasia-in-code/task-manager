import pytest
from flask_jwt_extended import create_access_token
from app import create_app, db
from app.models import Task

@pytest.fixture
def app():
    app = create_app(testing=True)
    yield app
    with app.app_context():
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_get_tasks_success(client, app):
    with app.app_context():
        user_id = 1
        token = create_access_token(identity=user_id)
        response = client.get('/tasks', headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 200
        assert isinstance(data, list)

def test_create_task_success(client, app):
    with app.app_context():
        user_id = 1
        token = create_access_token(identity=user_id)
        response = client.post('/tasks', json={'title': 'New Task'}, headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()
    
        assert response.status_code == 201
        assert data['id'] == 1
        assert data['title'] == 'New Task'
        assert data['completed'] == False
        assert data['description'] == None

def test_add_task_with_completed_flag(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.post('/tasks', json={'title': 'New Task', 'completed': True},
                               headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 201
        assert data['id'] == 1
        assert data['completed'] == True

def test_add_task_with_empty_title(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.post('/tasks', json={'title': ''},
                               headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 400
        assert data == {'error': 'Title is required'}

def test_update_task_success(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.post('/tasks', json={'title': 'New Task'},
                               headers={'Authorization': f'Bearer {token}'})
        assert response.status_code == 201
        task_id = response.get_json()['id']

        response = client.put(f'/tasks/{task_id}', json={'title': 'Updated Task'},
                              headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 200
        assert data['title'] == 'Updated Task'

def test_update_task_not_exist(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.put('/tasks/1', json={'title': 'Updated Task'},
                              headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 404
        assert data == {'error': 'Task not found'}

def test_get_nonexistent_endpoint(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.get('/nonexistent',
                              headers={'Authorization': f'Bearer {token}'})

        assert response.status_code == 404

def test_delete_task_success(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.post('/tasks', json={'title': 'New Task'},
                               headers={'Authorization': f'Bearer {token}'})
        assert response.status_code == 201
        task_id = response.get_json()['id']

        response = client.delete(f'/tasks/{task_id}',
                                 headers={'Authorization': f'Bearer {token}'})

        assert response.status_code == 200

def test_delete_task_not_exist(client, app):
    with app.app_context():
        token = create_access_token(identity=1)
        response = client.delete('/tasks/1',
                                 headers={'Authorization': f'Bearer {token}'})
        data = response.get_json()

        assert response.status_code == 404
        assert data == {'error': 'Task not found'}
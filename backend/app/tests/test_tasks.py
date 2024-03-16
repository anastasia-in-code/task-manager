import pytest
from app import create_app, db
from app.models import Task

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()


def test_get_tasks_success(client):
    response = client.get('/tasks')
    data = response.get_json()

    assert response.status_code == 200
    assert isinstance(data, list)

def test_create_task_success(client):
    response = client.post('/tasks', json={'title': 'New Task'})
    data = response.get_json()
    
    assert response.status_code == 201
    assert data['id'] == 1
    assert data['title'] == 'New Task'
    assert data['completed'] == False
    assert data['description'] == None

def test_add_task_with_completed_flag(client):
    response = client.post('/tasks', json={'title': 'New Task', 'completed': True})
    data = response.get_json()

    assert response.status_code == 201
    assert data['id'] == 1
    assert data['completed'] == True

def test_add_task_with_empty_title(client):
    response = client.post('/tasks', json={'title': ''})
    data = response.get_json()

    assert response.status_code == 400
    assert data == {'error': 'Title is required'}

def test_update_task_success(client):
    response = client.post('/tasks', json={'title': 'New Task'})
    assert response.status_code == 201
    task_id = response.get_json()['id']
    
    response = client.put(f'/tasks/{task_id}', json={'title': 'Updated Task'})
    data = response.get_json()
    
    assert response.status_code == 200
    assert data['title'] == 'Updated Task'

def test_update_task_not_exist(client):    
    response = client.put('/tasks/1', json={'title': 'Updated Task'})
    data = response.get_json()
    
    assert response.status_code == 404
    assert data == {'error': 'Task not found'}

def test_get_nonexistent_endpoint(client):
    response = client.get('/nonexistent')
    
    assert response.status_code == 404

def test_delete_task_success(client):
    response = client.post('/tasks', json={'title': 'New Task'})
    assert response.status_code == 201
    task_id = response.get_json()['id']

    response = client.delete(f'/tasks/{task_id}')

    assert response.status_code == 200

def test_delete_task_success(client):
    response = client.delete('/tasks/1')
    data = response.get_json()

    assert response.status_code == 404
    assert data == {'error': 'Task not found'}

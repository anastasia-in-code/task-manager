from http import HTTPStatus
from werkzeug.exceptions import NotFound
import logging
from flask import Blueprint, abort, jsonify, request
from app.models import Task
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

tasks_bp = Blueprint('tasks', __name__)

"""
Get a paginated list of tasks.

Returns:
    tuple: A tuple containing the JSON response and the HTTP status code.
        The JSON response contains a list of tasks, where each task is represented as a dictionary with the following keys:
            - id (int): The unique identifier of the task.
            - title (str): The title of the task.
            - description (str): The description of the task.
            - completed (bool): Indicates whether the task is completed or not.
        The HTTP status code indicates the success or failure of the request.
            - 200 (OK): The request was successful.
            - 400 (BAD REQUEST): The page or per_page value is invalid.
            - 500 (INTERNAL SERVER ERROR): An error occurred while processing the request.
"""
@tasks_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    try:
        user_id = get_jwt_identity()


        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        if page < 1 or per_page < 1:
            return jsonify({'error': 'Invalid page or per_page value.'}), HTTPStatus.BAD_REQUEST
        
        tasks = Task.query.filter_by(user_id=user_id).paginate(page=page, per_page=per_page)
        task_data = [{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks.items]
        
        return jsonify(task_data), HTTPStatus.OK
    
    except Exception as e:
        logging.error(f"An error occurred while getting tasks: {str(e)}")
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')

"""
Add a new task.

This function is used to add a new task to the database. The task details are provided in the request body as JSON data. The required fields are 'title', which is a string representing 
the title of the task. The optional fields are 'description', which is a string representing the description of the task, and 'completed', which is a boolean indicating whether the task is completed or not.

Returns:
    tuple: A tuple containing the JSON response and the HTTP status code.
        The JSON response contains the details of the newly added task, including the unique identifier ('id'), the title ('title'), the description ('description'), and the completion status ('completed').
        The HTTP status code indicates the success or failure of the request.
            - 201 (CREATED): The task was successfully added.
            - 400 (BAD REQUEST): The request body is missing the required 'title' field or the 'title' field is empty.
            - 500 (INTERNAL SERVER ERROR): An error occurred while processing the request.
"""
@tasks_bp.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    try: 
        user_id = get_jwt_identity()

        data = request.json
        if 'title' not in data or len(data['title']) < 1:
            return jsonify({'error': 'Title is required'}), HTTPStatus.BAD_REQUEST
        new_task = Task(title=data['title'], description=data.get('description', None), completed=data.get('completed', False), user_id=user_id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'id': new_task.id, 'title': new_task.title, 'description': new_task.description, 'completed': new_task.completed}), HTTPStatus.CREATED
    except Exception as e:
        logging.error(f"An error occurred while task adding: {str(e)}")
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')

"""
Delete a task.

This function is used to delete a task from the database based on its unique identifier. The task is identified by the 'id' parameter in the URL.

Parameters:
    id (int): The unique identifier of the task to be deleted.

Returns:
    tuple: A tuple containing the JSON response and the HTTP status code.
        The JSON response contains a message indicating the success of the deletion operation.
        The HTTP status code indicates the success or failure of the request.
            - 200 (OK): The task was successfully deleted.
            - 404 (NOT FOUND): The task with the specified 'id' does not exist.
            - 500 (INTERNAL SERVER ERROR): An error occurred while processing the request.
"""
@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    try: 
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        logging.info(f"Task with id {id} deleted successfully")
        return jsonify({'message': 'Task deleted successfully'}), HTTPStatus.OK
    except NotFound:
        logging.error(f"Task with id {id} not found")
        return jsonify({'error': 'Task not found'}), HTTPStatus.NOT_FOUND
    except Exception as e:
        logging.error(f"An error occurred while deleting task with id {id}: {str(e)}")
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')


"""
Update a task.

This function is used to update an existing task in the database. The task to be updated is identified by its unique identifier ('id'), which is provided as a parameter in the URL. The updated task details are provided in the request body as JSON data. The fields that can be updated are 'title', 'description', and 'completed'. If a field is not provided in the request body, the existing value of that field will be retained.

Parameters:
    id (int): The unique identifier of the task to be updated.

Returns:
    tuple: A tuple containing the JSON response and the HTTP status code.
        The JSON response contains the updated details of the task, including the unique identifier ('id'), the updated title ('title'), the updated description ('description'), and the updated completion status ('completed').
        The HTTP status code indicates the success or failure of the request.
            - 200 (OK): The task was successfully updated.
            - 400 (BAD REQUEST): The request body is missing or invalid.
            - 404 (NOT FOUND): The task with the specified 'id' does not exist.
            - 500 (INTERNAL SERVER ERROR): An error occurred while processing the request.
"""
@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    try: 
        task = Task.query.get_or_404(id)
        data = request.json
        if not data:
            return jsonify({'error': "Request body is missing or invalid"}), HTTPStatus.BAD_REQUEST
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)
        db.session.commit()
        return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}), HTTPStatus.OK
    except NotFound:
        logging.error(f"Task with id {id} not found")
        return jsonify({'error': 'Task not found'}), HTTPStatus.NOT_FOUND
    except Exception as e:
        logging.error(f"An error occurred while updating task with id {id}: {str(e)}")
        db.session.rollback()
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')

from http import HTTPStatus
from flask_jwt_extended import create_access_token
import bcrypt
import logging
from flask import Blueprint, abort, jsonify, request
from app.models import User
from app import db

users_bp = Blueprint('users', __name__)


@users_bp.route('/register', methods=['POST'])
def register():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), HTTPStatus.BAD_REQUEST

        user = User.query.filter_by(username=username).first()

        if user is not None: 
            return jsonify({'message': 'Username already exists'}), HTTPStatus.BAD_REQUEST

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'message': 'Registration successful'}), HTTPStatus.CREATED
    except Exception as e:
        logging.error(f"An error occurred during registration: {str(e)}")
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')

@users_bp.route('/login', methods=['POST'])
def login():
    try:
        username = request.json.get('username')
        password = request.json.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), HTTPStatus.BAD_REQUEST

        user = User.query.filter_by(username=username).first()

        if user is None or not bcrypt.checkpw(password.encode('utf-8'), user.password):
            return jsonify({'message': 'Invalid username or password'}), HTTPStatus.UNAUTHORIZED

        access_token = create_access_token(identity=username)
        return jsonify({'access_token': access_token}), HTTPStatus.OK

    except Exception as e:
        logging.error(f"An error occurred during login: {str(e)}")
        abort(HTTPStatus.INTERNAL_SERVER_ERROR, 'An error occurred while processing the request.')


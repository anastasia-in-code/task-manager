from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app(testing=False):
    app = Flask(__name__)
    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "secret-key" 

    CORS(app)
    JWTManager(app)


    with app.app_context():
        from app.controllers.tasks import tasks_bp
        from app.controllers.auth import users_bp
        db.init_app(app)
        app.register_blueprint(tasks_bp)
        app.register_blueprint(users_bp)
        db.create_all()

    return app

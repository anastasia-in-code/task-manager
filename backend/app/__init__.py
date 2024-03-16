from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)

    with app.app_context():
        from app.controllers.tasks import tasks_bp
        db.init_app(app)
        app.register_blueprint(tasks_bp)
        db.create_all()

    return app
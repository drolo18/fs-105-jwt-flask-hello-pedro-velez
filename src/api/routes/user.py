from api.models.User import User
from flask import Blueprint, jsonify, request
from api.database.db import db
import bcrypt

api = Blueprint('api/user', __name__)

@api.route('/', methods=['GET'])
def get_users():
    all_user = User.query.all()
    all_user_serialize = list(map(lambda user: user.serialize(), all_user))
    return jsonify(all_user_serialize), 200

@api.route('/register', methods=['POST', 'OPTIONS'])
def user_register():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        body = request.get_json()
        if not body or 'email' not in body or 'password' not in body:
            return jsonify({'error': 'Falta el email o el password'}), 400

        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=body['email']).first()
        if existing_user:
            return jsonify({'error': 'El usuario ya existe'}), 400

        new_pass = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())

        new_user = User()
        new_user.email = body['email']
        new_user.password = new_pass.decode()
        new_user.is_active = True

        db.session.add(new_user)
        db.session.commit() 

        return jsonify({'message': 'Usuario creado exitosamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
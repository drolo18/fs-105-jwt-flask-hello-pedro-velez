from api.models.User import User
from flask import Blueprint, jsonify, request
from api.database.db import db
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/login', methods=['POST', 'OPTIONS'])
def user_login():
    if request.method == 'OPTIONS':
        return '', 200

    try:
        body = request.get_json()
        if not body or 'email' not in body or 'password' not in body:
            return jsonify({'error': 'Falta el email o el password'}), 400

        user = User.query.filter_by(email=body['email']).first()
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        if not bcrypt.checkpw(body['password'].encode(), user.password.encode()):
            return jsonify({'error': 'Contraseña incorrecta'}), 401

        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            'message': 'Login exitoso',
            'token': access_token,
            'user': user.serialize()
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/logout', methods=['POST', 'OPTIONS'])
@jwt_required()
def user_logout():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
            
        return jsonify({'message': 'Sesión cerrada exitosamente'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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


@api.route('/register', methods=['POST'])
def user_register():
    body = request.get_json()
    if 'email' in body and 'password' in body:
        new_pass = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())

        new_user = User()
        new_user.email = body['email']
        new_user.password = new_pass.decode()
        new_user.is_active = True

        db.session.add(new_user)
        db.session.commit() 

        return jsonify('User created'), 200

    return jsonify('Falta el email o el password'), 400
    
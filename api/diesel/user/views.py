from flask import Blueprint
from flask_apispec import marshal_with, use_kwargs
from flask_jwt import current_identity, jwt_required
from sqlalchemy.exc import IntegrityError

from diesel.extensions import db
from diesel.utils import jwt_optional
from .models import User
from .serializers import user_schema

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/users', methods=('POST',))
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register_user(username, password, email, **kwargs):
    try:
        user = User(username, email, password=password, **kwargs).save()
    except IntegrityError:
        db.session.rollback()
        print('User already registered: {}'.format(username))  # TODO: proper handling
        raise Exception
    return user


@blueprint.route('/api/users/login', methods=('POST',))
@jwt_optional()
@use_kwargs(user_schema)
@marshal_with(user_schema)
def login_user(email, password, **kwargs):
    user = User.query.filter_by(email=email).first()
    if user is not None and user.check_password(password):
        return user
    else:
        print('User not found')  # TODO: proper handling
        raise Exception 


@blueprint.route('/api/user', methods=('GET',))
@jwt_required()
@marshal_with(user_schema)
def get_user():
    return current_identity

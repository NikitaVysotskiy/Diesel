from flask import Blueprint, request
from flask_apispec import marshal_with, use_kwargs
from sqlalchemy.exc import IntegrityError

from diesel.extensions import db
from .models import User
from .serializers import user_schema

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/users', methods=('POST',))
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register_user(username, password, email, **kwargs):
    print(username)
    try:
        user = User(username, email, password=password, **kwargs).save()
    except IntegrityError:
        db.session.rollback()
        print('User already registered: {}'.format(username))  # TODO: proper handling
        raise Exception
    return user

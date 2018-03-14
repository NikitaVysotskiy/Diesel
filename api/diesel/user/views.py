from flask import Blueprint
from flask_apispec import marshal_with
from sqlalchemy.exc import IntegrityError

from diesel.extensions import db
from .models import User
from .serializers import user_schema

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/users', methods=('POST',))
@marshal_with(user_schema)
def register_user(username, email, password):
    try:
        user = User(username, email, password).save()
    except IntegrityError:
        db.session.rollback()
        print('User already registered: {}'.format(username))  # TODO: proper handling
        raise Exception
    return user

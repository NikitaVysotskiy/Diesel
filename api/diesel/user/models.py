from flask_jwt import _default_jwt_encode_handler
from sqlalchemy import Column

from diesel.extensions import db, bcrypt


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = Column(db.String(100), unique=True, nullable=False)
    email = Column(db.String(100), unique=True, nullable=False)
    password = Column(db.Binary(128), nullable=True)

    def __init__(self, username, email, password=None, **kwargs):
        db.Model.__init__(self, username=username, email=email, **kwargs)
        if password:
            self.set_password(password)
        else:
            self.password = None

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, value):
        return bcrypt.check_password_hash(self.password, value)

    @property
    def token(self):
        return _default_jwt_encode_handler(self).decode('utf-8')

    @classmethod
    def get_by_id(cls, user_id):
        return User.query.get(int(user_id))


    def __repr__(self):
        return 'User({username})'.format(username=self.username)

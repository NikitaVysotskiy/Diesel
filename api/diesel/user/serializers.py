
from marshmallow import Schema, fields


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Email()
    password = fields.Str(load_only=True)
    token = fields.Str(dump_only=True)

    class Meta:
        strict = True


user_schema = UserSchema()
user_schemas = UserSchema(many=True)

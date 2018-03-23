from marshmallow import Schema, fields, post_dump, pre_load


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Email()
    password = fields.Str(load_only=True)
    token = fields.Str(dump_only=True)

    user = fields.Nested('self', exclude=('user',), default=True, load_only=True)

    @pre_load
    def make_user(self, data):
        data = data['user']
        return data

    @post_dump
    def dump_user(self, data):
        return {'user': data}

    class Meta:
        strict = True


user_schema = UserSchema()
user_schemas = UserSchema(many=True)

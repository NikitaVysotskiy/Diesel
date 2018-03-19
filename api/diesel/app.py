from flask import Flask

from diesel import commands, user
from diesel.extensions import bcrypt, cache, db, migrate, jwt, cors
from diesel.exceptions import InvalidUsage


def create_app(config_object):
    app = Flask(__name__.split('.')[0])
    app.url_map.strict_slashes = False
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    regirter_errorhandlers(app)
    register_commands(app)
    return app


def register_extensions(app):
    bcrypt.init_app(app)
    cache.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)


def register_blueprints(app):
    origins = app.config.get('CORS_ORIGIN_WHITELIST', '*')
    cors.init_app(user.views.blueprint, origins=origins)

    app.register_blueprint(user.views.blueprint)


def regirter_errorhandlers(app):

    def errorhandler(error):
        res = error.to_json()
        res.status_code = error.status_code
        return res

    app.errorhandler(InvalidUsage)(errorhandler)


def register_commands(app):
    app.cli.add_command(commands.download_cars)


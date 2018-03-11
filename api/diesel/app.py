from flask import Flask


def create_app(config_object=None):
    if config_object is None:
        config_object = {}

    app = Flask(__name__.split('.')[0])
    app.url_map.strict_slashes = False
    app.config.from_object(config_object)
    return app

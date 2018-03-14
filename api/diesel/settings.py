import os
from datetime import timedelta


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY', 'whatever')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CACHE_TYPE = 'simple'
    JWT_AUTH_USERNAME_KEY = 'email'
    JWT_AUTH_HEADER_PREFIX = 'Token'
    CORS_ORIGIN_WHITELIST = [
        'http://0.0.0.0:3000',
        'http://localhost:3000',
        'http://0.0.0.0:8000',
        'http://localhost:8000',
    ]


class DevConfig(Config):
    """Development configuration."""

    ENV = 'dev'
    DEBUG = True
    JWT_EXPIRATION_DELTA = timedelta(10 ** 6)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'postgresql://localhost/diesel'
    )

from diesel.app import create_app
from diesel.settings import DevConfig

CONFIG = DevConfig

app = create_app(CONFIG)

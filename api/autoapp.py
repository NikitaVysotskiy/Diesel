from api.diesel.app import create_app
from api.diesel.settings import DevConfig

CONFIG = DevConfig

app = create_app(CONFIG)

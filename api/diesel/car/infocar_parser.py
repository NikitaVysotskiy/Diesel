import click
import requests

from bs4 import BeautifulSoup
from flask.cli import with_appcontext

from diesel.extensions import db
from .models import FuelTypes, CarData


BASE_URL = 'infocar.ua'
MAKE_MODELS_ENUM = [
    'ford-transit-connect',
    'subaru-forester',
    'subaru-legacy',
    'subaru-outback',
    'toyota-land-cruiser',
    'toyota-hilux',
    'volkswagen-golf',
    'volkswagen-jetta',
    'volkswagen-polo',
    'volkswagen-transporter',
    'volkswagen-caddy',
]
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko)' +
                  ' Chrome/39.0.2171.95 Safari/537.36'
}


@click.command()
@with_appcontext
def download_cars():
    for make_model in MAKE_MODELS_ENUM:
        generations_page_url = '.'.join(['http://' + make_model, BASE_URL])
        raw = requests.get(generations_page_url, headers=HEADERS).text
        soup = BeautifulSoup(raw.encode('windows-1251'), 'lxml')

        make, model = make_model.split('-', 1)
        for submodel_card in soup.select('.submodel'):
            submodel = submodel_card.select('a.modela')[0].text
            details_link = submodel_card.select('.modellinks a')[1]['href']
            years = submodel_card.select('strong.models')[0].find(text=True, recursive=False).strip()

            raw = requests.get(details_link).text
            soup = BeautifulSoup(raw.encode('windows-1251'), 'lxml')
            for engine in soup.select('.motordiv'):
                fuel_type = FuelTypes.petrol if 'fuel1' in engine['class'] \
                       else FuelTypes.diesel if 'fuel2' in engine['class'] \
                       else FuelTypes.other
                engine_name = engine.select('strong')[0].text
                fuel_tags = engine.select('.kppdiv')[0].select('.privod span')
                fuel_consumptions = [tag.text.split(' ')[0] for tag in fuel_tags if 'л' in tag.text]

                car_data = CarData(
                    make=make,
                    model=model,
                    submodel=submodel,
                    years=years,
                    engine=engine_name,
                    fuel_type=fuel_type,
                    fuel_consumptions=' '.join(fuel_consumptions)
                )

                db.session.add(car_data)
                db.session.commit()

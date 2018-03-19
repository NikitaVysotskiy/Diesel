from bs4 import BeautifulSoup
import requests

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


def main():
    for submodel in MAKE_MODELS_ENUM[0]:
        generations_page_url = '.'.join(['http://' + submodel, BASE_URL])
        raw = requests.get(generations_page_url, headers=HEADERS).text
        soup = BeautifulSoup(raw.encode('windows-1251'), 'lxml')
        for submodel_card in soup.select('.submodel'):
            submodel_name = submodel_card.select('a.modela')[0].text
            details_link = submodel_card.select('.modellinks a')[1]['href']
            print(submodel_name, details_link)

            raw = requests.get(details_link).text
            soup = BeautifulSoup(raw.encode('windows-1251'), 'lxml')
            for engine in soup.select('.motordiv'):
                print(engine.text)


if __name__ == '__main__':
    main()

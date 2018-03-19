import click

from diesel.car.utils.infocar_parser import main as infocar_main


@click.command()
def download_cars():
    infocar_main()

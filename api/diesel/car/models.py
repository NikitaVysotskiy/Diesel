import enum

from diesel.extensions import db


class FuelTypes(enum.Enum):
    petrol = 'petrol'
    diesel = 'diesel'
    other = 'other'


class GasStations(enum.Enum):
    OKKO = 'ОККО'
    SOCAR = 'Socar'
    WOG = 'WOG'
    UKR_NAFTA = 'УкрНафта'


class FuelKinds(enum.Enum):
    __order__ = 'A95_PLUS A95 A92 DIESEL'

    A95_PLUS = 'A 95+'
    A95 = 'A 95'
    A92 = 'A 92'
    DIESEL = 'Diesel'


class CarData(db.Model):
    __tablename__ = 'car_data'

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    submodel = db.Column(db.String(100), nullable=False)
    years = db.Column(db.String(20), nullable=False)
    engine = db.Column(db.String(50), nullable=False)
    fuel_type = db.Column(db.Enum(FuelTypes), nullable=False)
    fuel_consumptions = db.Column(db.String(50), nullable=False)


class FuelData(db.Model):
    __tablename__ = 'fuel_data'

    id = db.Column(db.Integer, primary_key=True)
    station = db.Column(db.Enum(GasStations), nullable=False)
    fuel_kind = db.Column(db.Enum(FuelKinds), nullable=False)
    price = db.Column(db.Float, nullable=False)

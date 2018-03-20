import enum

from diesel.extensions import db


class FuelTypes(enum.Enum):
    petrol = 'petrol'
    diesel = 'diesel'
    other = 'other'


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


from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from .models import GasStations, FuelKinds


class FuelDataSchema(Schema):

    station = EnumField(GasStations)
    fuel_kind = EnumField(FuelKinds)
    price = fields.Str()  # TODO: float?

    class Meta:
        strict = True


fuel_data_schema = FuelDataSchema()

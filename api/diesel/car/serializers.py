from marshmallow import Schema, fields, pre_load, post_dump
from marshmallow_enum import EnumField

from .models import GasStations, FuelKinds


class FuelDataSchema(Schema):

    station = EnumField(GasStations, by_value=True)
    fuel_kind = EnumField(FuelKinds, by_value=True)
    price = fields.Float()

    fuel_price = fields.Nested('fuel_price', exclude=('fuel_price',), default=True, load_only=True)

    @pre_load
    def make_user(self, data):
        data = data['fuel_price']
        return data

    @post_dump
    def dump_user(self, data):
        return {'fuel_price': data}

    class Meta:
        strict = True


fuel_data_schema = FuelDataSchema(many=True)

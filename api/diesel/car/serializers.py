from marshmallow import Schema, fields, pre_load, post_dump
from marshmallow_enum import EnumField

from .models import GasStations, FuelKinds, FuelTypes


class FuelDataSchema(Schema):

    station = EnumField(GasStations, by_value=True)
    fuel_kind = EnumField(FuelKinds, by_value=True)
    price = fields.Float()

    fuel_price = fields.Nested('fuel_price', exclude=('fuel_price',), default=True, load_only=True)

    @post_dump
    def dump_fuel_price(self, data):
        return {'fuel_price': data}

    class Meta:
        strict = True


class CarDataSchema(Schema):
    make = fields.Str()
    model = fields.Str()
    submodel = fields.Str()
    years = fields.Str()
    engine = fields.Str()
    fuel_type = EnumField(FuelTypes, by_value=True)
    fuel_consumptions = fields.Str()

    class Meta:
        strict = True


class SubmodelsSchema(CarDataSchema):

    @post_dump(pass_many=True)
    def dump_many(self, data, many):
        # make unique list of dicts
        return {'models': [dict(y) for y in set(tuple(x.items()) for x in data)]}

    class Meta:
        strict = True
        fields = ('submodel', 'years')


fuel_data_schema = FuelDataSchema(many=True)
submodels_schema = SubmodelsSchema(many=True)

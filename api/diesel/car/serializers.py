from itertools import groupby

from marshmallow import Schema, fields, pre_load, post_dump
from marshmallow_enum import EnumField

from .models import GasStations, FuelKinds, FuelTypes


class FuelDataSchema(Schema):

    station = EnumField(GasStations, by_value=True)
    fuel_kind = EnumField(FuelKinds, by_value=True)
    price = fields.Float()

    @post_dump(pass_many=True)
    def dump_many(self, data, many):
        prices = []
        for station, fuels in groupby(data, key=lambda x: x['station']):
            fuels = list(fuels)
            for f in fuels:
                del f['station']
            prices.append({'station': station, 'fuels': fuels})
        return {'fuelPrices': prices}

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
        # TODO: sort
        # makes unique list of dicts
        return {'models': [dict(y) for y in set(tuple(x.items()) for x in data)]}

    class Meta:
        strict = True
        fields = ('submodel', 'years')


class EnginesSchema(CarDataSchema):

    @post_dump(pass_many=True)
    def dump_many(self, data, many):
        # TODO: sort
        return {'engines': data}

    class Meta:
        strict = True
        fields = ('engine', 'fuel_type', 'fuel_consumptions')


fuel_data_schema = FuelDataSchema(many=True)
submodel_schema = SubmodelsSchema()
submodels_schema = SubmodelsSchema(many=True)
engines_schema = EnginesSchema(many=True)

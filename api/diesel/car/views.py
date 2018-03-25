from flask import Blueprint, jsonify
from flask_apispec import marshal_with, use_kwargs
from flask_jwt import jwt_required

from .models import CarData, FuelData, GasStations
from .serializers import fuel_data_schema, submodels_schema, submodel_schema, engines_schema


blueprint = Blueprint('car', __name__)


@blueprint.route('/api/car/fuel-prices', methods=('GET',))
@jwt_required()
@marshal_with(fuel_data_schema)
def get_fuel_prices():
    return FuelData.query.all()


@blueprint.route('/api/car/gas-stations', methods=('GET',))
@jwt_required()
def get_gas_stations():
    return jsonify({'stations': [e.value for e in GasStations]})


@blueprint.route('/api/car/makes', methods=('GET',))
@jwt_required()
def get_makes():
    # TODO: sort
    return jsonify({'makes': list(set(car_data.make.capitalize() for car_data in CarData.query.all()))})


@blueprint.route('/api/car/make/<make>/models')
@jwt_required()
@marshal_with(submodels_schema)
def get_models_by_make(make):
    return CarData.query.filter_by(make=make)


@blueprint.route('/api/car/make/<make>/models/engines')
@jwt_required()
@use_kwargs(submodel_schema)
@marshal_with(engines_schema)
def get_engines(make, submodel, years):
    return CarData.query.filter_by(make=make.lower(), submodel=submodel, years=years)


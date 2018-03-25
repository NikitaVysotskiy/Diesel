from flask import Blueprint, jsonify
from flask_apispec import marshal_with, use_kwargs
from flask_jwt import jwt_required

from .models import CarData, FuelData, GasStations
from .serializers import fuel_data_schema


blueprint = Blueprint('car', __name__)


@blueprint.route('/api/car/fuel-prices', methods=('GET',))
@jwt_required()
@use_kwargs(fuel_data_schema, locations=['json'])
@marshal_with(fuel_data_schema)
def get_fuel_prices():
    return FuelData.query.all()


@blueprint.route('/api/car/gas-stations', methods=('GET',))
@jwt_required()
def get_gas_stations():
    return jsonify({'gasStations': [e.value for e in GasStations]})


@blueprint.route('/api/car/makes', methods=('GET',))
@jwt_required()
def get_makes():
    # TODO: sort
    return jsonify({'makes': list(set(car_data.make.capitalize() for car_data in CarData.query.all()))})


@blueprint.route('/api/car/make/<make>/models')
@jwt_required()
def get_models_by_make(make):
    return jsonify({
        'models': list(set(car_data.model for car_data in CarData.query.filter_by(make=make)))
    })


@blueprint.route('/api/car/make/<make>/models/<model>/submodels')
@jwt_required()
def get_models(make, model):
    return jsonify({
        'submodels': ['hereitgoes']
    })


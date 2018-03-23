from flask import Blueprint, jsonify
from flask_apispec import marshal_with, use_kwargs
from flask_jwt import jwt_required

from .models import CarData
from .serializers import fuel_data_schema


blueprint = Blueprint('car', __name__)


@blueprint.route('/api/car/fuel-prices', methods=('GET',))
@jwt_required()
@use_kwargs(fuel_data_schema)
@marshal_with(fuel_data_schema)
def get_fuel_prices():
    return jsonify()


@blueprint.route('/api/car/makes', methods=('GET',))
@jwt_required()
def get_makes():
    # TODO: sort
    return jsonify({'makes': list(set(car_data.make.capitalize() for car_data in CarData.query.all()))})

from flask import Blueprint, jsonify
from flask_jwt import jwt_required

from . models import CarData


blueprint = Blueprint('car', __name__)


@blueprint.route('/api/car/makes', methods=('GET',))
@jwt_required()
def get_makes():
    return jsonify({'makes': list(set(car_data.make for car_data in CarData.query.all()))})

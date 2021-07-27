from flask import Blueprint, request
from ..models import db, Collection
from flask_login import current_user
# from app.forms import

collection_route = Blueprint('collections', __name__)


@collection_route.route('/api/collections')
def get_collections():
    allCollections = Collection.query.filter(
        current_user.id == Collection.user_id).all()
    return {'collections': [collection.to_dict() for collection in allCollections]}

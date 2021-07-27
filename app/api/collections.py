from app.forms import collection_form
from flask import Blueprint, request
from ..models import db, Collection
from flask_login import current_user
from app.forms import CollectionForm
# from app.forms import

collection_routes = Blueprint('collections', __name__)


@collection_routes.route('/api/collections')
def get_collections():
    allCollections = Collection.query.filter(
        current_user.id == Collection.user_id).all()
    return {'collections': [collection.to_dict() for collection in allCollections]}


@collection_routes.route('/api/collections', methods=['POST'])
def post_club():
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        collection = Collection(
            name=form.name.data,
            description=form.description.data,
            user_id=current_user.id,
            collection_img_url=form.collection_img_url.data
        )
        db.session.add(collection)
        db.session.commit()
        return collection.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}

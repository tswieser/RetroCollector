
from flask import Blueprint, request
from ..models import db, Collection, Console, Game, Review
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
def post_collection():
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


@collection_routes.route('/api/collections/<int:id>', methods=['PUT'])
def put_collection(id):
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editCollection = Collection.query.filter(Collection.id == id).first()
        editCollection.name = form.name.data,
        editCollection.description = form.description.data,
        editCollection.user_id = current_user.id,
        editCollection.collection_img_url = form.collection_img_url.data
        db.session.commit()
        return editCollection.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@collection_routes.route('/api/collections/<int:id>', methods=['DELETE'])
def delete_club(id):
    collection = Collection.query.get(id)
    consoles = Console.query.filter(Console.collection_id == id).all()
    games = Game.query.filter(Game.collection_id == id).all()

    for game in games:
        reviews = Review.query.filter(Review.game_id == game.id).all()
        for review in reviews:
            db.session.delete(review)
        db.session.delete(game)

    for console in consoles:
        db.session.delete(console)
        
    db.session.delete(collection)
    db.session.commit()
    return {'message': True}

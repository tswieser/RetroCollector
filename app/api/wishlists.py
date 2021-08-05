from flask import Blueprint, request
from ..models import db, WishList
from flask_login import current_user
from app.forms import WishListForm


wishlist_routes = Blueprint('wishlists', __name__)


@wishlist_routes.route('/api/wishlists')
def get_wishlist():
    all_wishlists = WishList.query.filter(
        current_user.id == WishList.user_id).all()
    return {'wishlists': [wishes.to_dict() for wishes in all_wishlists]}


@wishlist_routes.route('/api/wishlists', methods=['POST'])
def post_wishlists():
    form = WishListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        wish = WishList(
            title=form.title.data,
            consoleName=form.consoleName.data,
            cib_value=form.cib_value.data,
            loose_value=form.loose_value.data,
            genre=form.genre.data,
            release_date=form.release_date.data,
            user_id=current_user.id,
        )
        db.session.add(wish)
        db.session.commit()
        return wish.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@wishlist_routes.route('/api/wishlists/<int:id>', methods=['PUT'])
def put_wish(id):
    form = WishListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editWish = WishList.query.filter(WishList.id == id).first()
        editWish.title = form.title.data
        editWish.consoleName = form.consoleName.data
        editWish.cib_value = form.cib_value.data
        editWish.loose_value = form.loose_value.data
        editWish.genre = form.genre.data
        editWish.release_date = form.release_date.data
        db.session.commit()
        return editWish.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@wishlist_routes.route('/api/wishlists/<int:id>', methods=['DELETE'])
def delete_wish(id):
    wish = WishList.query.get(id)
    db.session.delete(wish)
    db.session.commit()
    return {'message': True}

from flask import Blueprint, request
from ..models import db, Review, Game
from flask_login import current_user
from app.forms import ReviewForm


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/api/games/review')
def get_reviews():
    all_reviews = Review.query.filter(Review.user_id == current_user.id).all()
    return {"reviews": [review.to_dict()for review in all_reviews]}


@review_routes.route('/api/games/<int:id>/review', methods=['POST'])
def post_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            rating=form.rating.data,
            user_id=current_user.id,
            game_id=id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}

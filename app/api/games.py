from flask import Blueprint, request
from ..models import db, Game
from flask_login import current_user
from app.forms import GameForm


game_routes = Blueprint('games', __name__)


@game_routes.route('/api/consoles/<int:id>/games')
def get_games(id):
    all_games = Game.query.filter(Game.console_id == id).all()
    return {'games': [game.to_dict() for game in all_games]}


@game_routes.route('/api/consoles/<int:id>/games', methods=['POST'])
def post_games(id):
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game(
            title=form.title.data,
            console_id=id,
            collection_id=form.collection_id.data,
            value=form.value.data,
            genre=form.genre.data,
            release_date=form.release_date.data
        )
        db.session.add(game)
        db.session.commit()
        return game.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@game_routes.route('/api/games/<int:id>', methods=["PUT"])
def put_game(id):
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editGame = Game.query.filter(Game.id == id).first()
        editGame.title = form.title.data,
        editGame.value = form.value.data,
        editGame.genre = form.genre.data,
        editGame.release_date = form.release_date.data
        db.session.commit()
        return editGame.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@game_routes.route('/api/games/<int:id>', methods=["DELETE"])
def delete_game(id):
    game = Game.query.get(id)
    db.session.delete(game)
    db.session.commit()
    return {'message': True}

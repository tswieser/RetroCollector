from flask import Blueprint, request
from ..models import db, Console, Game, Review
from flask_login import current_user
from app.forms import ConsoleForm


console_routes = Blueprint('consoles', __name__)


@console_routes.route('/api/collections/<int:id>/consoles')
def get_consoles(id):
    all_consoles = Console.query.filter(Console.collection_id == id).all()
    return {'consoles': [console.to_dict() for console in all_consoles]}


@console_routes.route('/api/collections/<int:id>/consoles', methods=["POST"])
def post_console(id):
    form = ConsoleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        console = Console(
            name=form.name.data,
            value=form.value.data,
            console_img_url=form.console_img_url.data,
            collection_id=id
        )
        db.session.add(console)
        db.session.commit()
        return console.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@console_routes.route('/api/consoles/<int:id>', methods=["PUT"])
def put_console(id):
    form = ConsoleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editConsole = Console.query.filter(Console.id == id).first()
        editConsole.name = form.name.data,
        editConsole.value = form.value.data,
        editConsole.console_img_url = form.console_img_url.data,
        db.session.commit()
        return editConsole.to_dict()

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace(
                '_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return {'errors': errorMessages}


@console_routes.route('/api/consoles/<int:id>', methods=['DELETE'])
def delete_club(id):
    console = Console.query.get(id)
    games = Game.query.filter(Game.console_id == id).all()

    for game in games:
        reviews = Review.query.filter(Review.game_id == game.id).all()
        for review in reviews:
            db.session.delete(review)
        db.session.delete(game)

    db.session.delete(console)
    db.session.commit()
    return {'message': True}

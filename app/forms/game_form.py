from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired



class GameForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    collection_id = StringField('collection_id')
    value = StringField('value', validators=[DataRequired()])
    genre = StringField('genre', validators=[DataRequired()])
    release_date = StringField('value')

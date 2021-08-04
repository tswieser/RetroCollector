from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    rating = StringField('rating')
    review = StringField('review')

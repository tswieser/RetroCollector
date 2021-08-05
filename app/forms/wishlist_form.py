from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class WishListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    consoleName = StringField('consoleName', validators=[DataRequired()])
    cib_value = StringField('cib_value', validators=[DataRequired()])
    loose_value = StringField('loose_value', validators=[DataRequired()])
    genre = StringField('genre', validators=[DataRequired()])
    release_date = StringField('release_date')

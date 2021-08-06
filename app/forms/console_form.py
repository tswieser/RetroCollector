from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ConsoleForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    value = StringField('description', validators=[DataRequired()])
    console_img_url = StringField(
        'collection_img_url')

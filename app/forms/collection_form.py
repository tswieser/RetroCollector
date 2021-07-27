from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CollectionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    collection_img_url = StringField('collection_img_url')

from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Restaurant


class RestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    type = StringField('type', validators=[DataRequired(), Length(max=100)])
    description = StringField('description', validators=[DataRequired(), Length(max=255)])
    address = StringField('address', validators=[DataRequired(), Length(max=255)])
    city = StringField('city', validators=[DataRequired(), Length(max=255)])
    country = StringField('country', validators=[DataRequired(), Length(max=255)])
    img_url = StringField('img_url', validators=[DataRequired(), Length(max=255)])
    national_brand = BooleanField('national_brand', default=False)
    healthy_options = BooleanField('healthy_options', default=False)
    under_2_delivery = BooleanField('under_2_delivery', default=False)
    hot_spot = BooleanField('hot_spot', default=False)
    in_a_rush = BooleanField('in_a_rush', default=False)
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# bellow validations are for signup
def first_name(form, field):
    if not field.data.isalpha() or len(field.data) > 40:
        raise ValidationError("First name must be only alphabets, and less than 40 characters.")
def last_name(form, field):
    if not field.data.isalpha() or len(field.data) > 40:
        raise ValidationError("Last name must be only alphabets, and less than 40 characters.")
def password(form, field):
    if len(field.data) < 4:
        raise ValidationError("Password can not be less than 4 characters. It should be more than 4 characters")
def email(form, field):
    if not '@' in field.data or not '.' in field.data or len(field.data) > 255:
        raise ValidationError("Invalid email format. Also it should be less than 255 characters")
def address(form, field):
    if len(field.data) > 100:
        raise ValidationError("Address must be less than 100 characters")
def city(form, field):
    if len(field.data) > 40:
        raise ValidationError("City name must be less than 40 characters")
def country(form, field):
    if len(field.data) > 100:
        raise ValidationError("Country name must be less than 40 characters")
def phone(form, field):
    if not field.data.isdigit() or len(field.data) != 10:
        raise ValidationError("Phone number must be 10 digits.")
# above validations are for signup

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField("email", validators=[DataRequired(), user_exists, email])
    password = StringField('password', validators=[DataRequired(), password])
    first_name = StringField("first_name", validators=[DataRequired(), first_name])
    last_name = StringField("last_name", validators=[DataRequired(), last_name])
    # email = StringField("email", validators=[DataRequired(), email])
    address = StringField("address", validators=[DataRequired(), address])
    city = StringField("city", validators=[DataRequired(), city])
    country = StringField("country", validators=[DataRequired(), country])
    phone = StringField("phone", validators=[DataRequired(), phone])

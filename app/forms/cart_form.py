from flask_wtf import FlaskForm
from wtforms import IntegerField, FieldList, FormField
from wtforms.validators import DataRequired

class CartItemForm(FlaskForm):
    menu_items_id = IntegerField("menu_items_id", validators=[DataRequired()])
    quantity = IntegerField("quantity", validators=[DataRequired()])


class ShoppingCartForm(FlaskForm):
    cart_items = FieldList(FormField(CartItemForm))

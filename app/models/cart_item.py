from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User

class CartItem(db.Model):
    __tablename__ = 'cartitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shoppingcarts.id')))
    menu_items_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('menuitems.id')))
    quantity = db.Column(db.Integer)

    #Many-to-One relationship with User
    shoppingcart = db.relationship("ShoppingCart", back_populates="cartitems")

    #many-to-one relationship with menuitems
    menuitem = db.relationship("MenuItem", back_populates="cartitems")

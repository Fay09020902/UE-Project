from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User

class ShoppingCart(db.Model):
    __tablename__ = 'shoppingcarts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))


    user = db.relationship("User", back_populates="shoppingcarts")
    cartitems = db.relationship("CartItem", back_populates="shoppingcart")


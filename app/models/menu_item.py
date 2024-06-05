from .db import db, environment, SCHEMA, add_prefix_for_prod


class MenuItem(db.Model):
    __tablename__ = "menuitems"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("restaurants.id")))
    type = db.Column(db.String(50), nullable=False)
    food_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000))
    price = db.Column(db.Float, nullable=False)
    img_url = db.Column(db.String(1000), nullable=False)

    # Many-to-One relationship with restaurants
    the_restaurant = db.relationship("Restaurant", back_populates="menu_items")

    # one-to-many relationship with cartItems
    cartitems = db.relationship("CartItem", back_populates="menuitem")

    def to_dict(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "type": self.type,
            "food_name": self.food_name,
            "description": self.description,
            "price": self.price,
            "img_url": self.img_url,
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from .menu_item import MenuItem

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String)
    type = db.Column(db.String)
    description = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    country = db.Column(db.String)
    img_url = db.Column(db.String)
    national_brand = db.Column(db.Boolean, default=False)
    healthy_options = db.Column(db.Boolean, default=False)
    under_2_delivery = db.Column(db.Boolean, default=False)
    hot_spot = db.Column(db.Boolean, default=False)
    in_a_rush = db.Column(db.Boolean, default=False)

    #Many-to-One relationship with User
    user = db.relationship("User", back_populates="restaurants")

    #one-to-many relationship with menuitems
    menu_items = db.relationship("MenuItem", back_populates="the_restaurant")

    def to_dict(self, include_menu_items=False):
        dic = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'country': self.country,
            'img_url': self.img_url,
            'national_brand' : self.national_brand,
            'healthy_options': self.healthy_options,
            'under_2_delivery' : self.under_2_delivery,
            'hot_spot' : self.hot_spot,
            'in_a_rush': self.in_a_rush
        }

        if include_menu_items:
            dic['menuitems'] = [item.to_dict() for item in self.menu_items]

        return dic

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import MenuItem, db
from ..forms import MenuItemForm

menu_items_routes = Blueprint("menu-items", __name__)

# Moved to restaurant_routes.py because the menu belongs to a restaurant
# api: api/restaurant/<init:id>/menu-items 

# @menu_items_routes.route("")
# @login_required
# def show_menu_items():
#     menu_items = MenuItem.query.all()

#     return {"menu_items": [menu_item.to_dict() for menu_item in menu_items]}


@menu_items_routes.route("/<int:id>/")
# @login_required
def item_details(id):
    item_details = MenuItem.query.filter_by(id=id).first()
    print('item details: ', item_details)
    return {
        "id": item_details.id,
        "restaurant_id": item_details.restaurant_id,
        "type": item_details.type,
        "food_name": item_details.food_name,
        "description": item_details.description,
        "price": item_details.price,
        "img_url": item_details.img_url,
    }


# The bellow routes are defined by Chris Update/Delete
@menu_items_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_items(id):
    menu_item = MenuItem.query.get(id)
    form = MenuItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # if int(current_user.get_id()) != menu_item.restaurant.user_id:
        #     return {"errors": {"message": "Unauthorized"}}, 401
        menu_item.type = form.data["type"]
        menu_item.food_name = form.data["food_name"]
        menu_item.decription = form.data["description"]
        menu_item.price = form.data["price"]
        menu_item.img_url = form.data["img_url"]

        db.session.commit()
        return menu_item.to_dict()
    return form.errors, 401


# Moved to restaurant_routes.py

# @menu_items_routes.route("/<int:id>", methods=["DELETE"])
# @login_required
# def delete_item(id):
#     menu_item = MenuItem.query.get(id)

#     if not menu_item:
#         return {"message": "Menu Item couldn't be found"}

#     if int(current_user.get_id()) != menu_item.restaurant.user_id:
#         return {"errors": {"message": "Unauthorized"}}, 401

#     db.session.delete(menu_item)
#     db.session.commit()
#     return {"message": "Successfully deleted Menu Item"}

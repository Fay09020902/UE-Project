from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Restaurant,MenuItem, db
from sqlalchemy.orm import joinedload
from app.forms import RestaurantForm
from app.forms import MenuItemForm

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('/')
def preview():
    """
    Retrieve a list of all restaurants.
    """
    restaurants = Restaurant.query.all()
    return {"restaurants": {r.id: r.to_dict() for r in restaurants}}


@restaurant_routes.route('/<int:id>')
def detail_of_a_restaurant(id):
    """
    Retrieve details of a specific restaurant and menuitems by ID.
    """
    restaurant = (
        Restaurant.query
        .options(joinedload(Restaurant.menu_items))
        .filter(Restaurant.id == id)
        .first()
    )
    return restaurant.to_dict(include_menu_items=True)


#Get all Restaurants owned by the Current User
@restaurant_routes.route('/current')
def owner_restaurants():
    restaurants = (
        Restaurant.query
        .filter(Restaurant.user_id == current_user.get_id())
    )
    return {"restaurants": {r.id: r.to_dict(include_menu_items=True) for r in restaurants}}


@restaurant_routes.route('/', methods=['POST'])
@login_required
def add_restaurant():
    """
    Create a new restaurant.
    """
    #dict format from front-end
    # data = request.json
    print('csrf_token: ', request.cookies['csrf_token'])

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_restaurant = Restaurant(
            user_id = current_user.id,
            name = form.data["name"],
            type = form.data["type"],
            description = form.data["description"],
            address = form.data["address"],
            city = form.data["city"],
            country = form.data["country"],
            img_url = form.data["img_url"],
            national_brand = form.data["national_brand"],
            healthy_options = form.data["healthy_options"],
            under_2_delivery = form.data["under_2_delivery"],
            hot_spot = form.data["hot_spot"],
            in_a_rush = form.data["in_a_rush"]
        )

        db.session.add(new_restaurant)
        db.session.commit()
        return new_restaurant.to_dict()
    return form.errors, 401


# Adding a new Item to a restaurant by ID
@restaurant_routes.route('/<int:id>/menu-items/', methods=['POST'])
@login_required
def add_new_items(id):
    form = MenuItemForm()
    # data = request.json
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_item = MenuItem(
            restaurant_id = id,
            type = form.data['type'],
            food_name = form.data['food_name'],
            description = form.data['description'],
            price = form.data['price'],
            img_url = form.data['img_url']
            )
        # print('until here, ok!')
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()
        # return jsonify(message='Item added successfully.')
    # return jsonify(message="couldn't addd new item")
    return form.errors, 401



# show all the menu items of a restaurant
@restaurant_routes.route("/<int:id>/menu-items", methods = ['GET'])
@login_required
def show_menu_items(id):
    # menu_items = MenuItem.query.filter_by(restaurant_id = id).all()
    menu_items = MenuItem.query.filter_by(restaurant_id = id).all()
    if not menu_items:
        return {"err": "This restaurant hs no item in its menu yet."}
    return {mi.id: mi.to_dict() for mi in menu_items}
    # return [menu_item.to_dict() for menu_item in menu_items]
    # return {"menu_items": [menu_item.to_dict() for menu_item in menu_items]}


# Delete an item from a menu of a restaurant
@restaurant_routes.route("/menu-items/<int:item_id>", methods=["DELETE"])
@login_required
def delete_item(item_id):
    menu_item = MenuItem.query.get(item_id)

    if not menu_item:
        return {"message": "Menu Item couldn't be found"}

    if int(current_user.get_id()) != menu_item.the_restaurant.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(menu_item)
    db.session.commit()
    return {"message": "Successfully deleted Menu Item"}


@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_restaurant(id):
    restaurant = Restaurant.query.get(id)

    if int(current_user.get_id()) != restaurant.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        restaurant.name = form.data["name"]
        restaurant.description = form.data['description']
        restaurant.address = form.data['address']
        restaurant.city = form.data['city']
        restaurant.country = form.data['country']
        restaurant.img_url = form.data['img_url']

        db.session.commit()
        return restaurant.to_dict()
    return form.errors, 400


@restaurant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)

    if not restaurant:
        return {"message": "Restaurant couldn't be found"}

    if int(current_user.get_id()) != restaurant.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(restaurant)
    db.session.commit()
    return {'message': 'Successfully deleted restaurant'}

from app.models import db, MenuItem, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_map import FOOD_NAMES, DESC, IMG_TYPES
from random import randint

NUM_MENU_ITEMS_PER_RES = 30


def seed_menuitems():
    # menuitems1 = MenuItem(restaurant_id=1, food_name='French Fries', description='Description One', price = 3.69, img_url='img_url_one')
    # menuitems2 = MenuItem(restaurant_id=1, food_name='McNuggets', description='Description Two',price = 6.19,img_url='img_url_two')
    # menuitems3 = MenuItem(restaurant_id=2, food_name='Tacos', description='Description Three', price = 8.9, img_url='img_url_three')

    # db.session.add(menuitems1)
    # db.session.add(menuitems2)
    # db.session.add(menuitems3)

    # for every Restaurant
    for i in range(len(Restaurant.query.all())):
        # create a pre determined amount of MenuItems
        for _ in range(NUM_MENU_ITEMS_PER_RES):
            menu_item = menu_builder(i)
            db.session.add(menu_item)

    db.session.commit()


def menu_builder(i):
    # generate random food type / name from our map
    r_type = randint(0, len(FOOD_NAMES) - 1)
    item_type = FOOD_NAMES[r_type]
    food_type = FOOD_NAMES[r_type]["names"][randint(0, len(item_type) - 1)]

    # generate a random image based off of https://foodish-api.com/
    img = IMG_TYPES[randint(0, len(IMG_TYPES) - 1)]

    # return a random MenuItem
    return MenuItem(
        restaurant_id=i + 1,
        type=item_type["type"],
        food_name=food_type,
        description=DESC[0 : randint(10, len(DESC) - 1)],
        price=randint(1, 50),
        img_url=f"https://foodish-api.com/images/{img['name']}/{img['name']}{randint(1, img['num'])}.jpg",
    )


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menuitems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()

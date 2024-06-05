from app.models import db, Restaurant, User, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_map import REST_NAMES, DESC, IMG_TYPES
from random import randint
NUM_OF_RESTAURANTS = 50
NUM_USERS = 5


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    # restaurant1 = Restaurant(user_id=1, name='Restaurant One', description='Description One', address='Address One', city='City One', country='Country One', img_url='img_url_one')
    # restaurant2 = Restaurant(user_id=2, name='Restaurant Two', description='Description Two', address='Address Two', city='City Two', country='Country Two', img_url='img_url_two')
    # restaurant3 = Restaurant(user_id=2, name='Restaurant Three', description='Description Three', address='Address Three', city='City Three', country='Country Three', img_url='img_url_three')

    # db.session.add(restaurant1)
    # db.session.add(restaurant2)
    # db.session.add(restaurant3)

    for _ in range(NUM_OF_RESTAURANTS):
        new_restaurant = restaurant_builder()
        db.session.add(new_restaurant)

    db.session.commit()


def restaurant_builder():
    # generate random restaurant type / name from our map
    r_type = randint(0, len(REST_NAMES) - 1)
    rest_type = REST_NAMES[r_type]
    rest_name = REST_NAMES[r_type]["names"][randint(0, len(rest_type) - 1)]

    # generate a random image based off of https://foodish-api.com/
    img = IMG_TYPES[randint(0, len(IMG_TYPES) - 1)]

    # return a random Restaurant
    return Restaurant(
        user_id=randint(1, NUM_USERS),
        name=rest_name,
        type=rest_type["type"],
        description=DESC[0 : randint(10, len(DESC) - 1)],
        address=f"Address {randint(1000, 9999)} ln",
        city=f"City {randint(1000, 9999)}",
        country=f"Country {randint(100, 999)}",
        img_url=f"https://foodish-api.com/images/{img['name']}/{img['name']}{randint(1, img['num'])}.jpg",
        national_brand=randint(0, 1),
        healthy_options=randint(0, 1),
        under_2_delivery=randint(0, 1),
        hot_spot=randint(0, 1),
        in_a_rush=randint(0, 1),
    )


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()

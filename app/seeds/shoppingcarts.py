from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_shoppingcarts():
    shoppingcart1 = ShoppingCart(user_id=1)
    shoppingcart2 = ShoppingCart(user_id=2)
    shoppingcart3 = ShoppingCart(user_id=3)


    db.session.add(shoppingcart1)
    db.session.add(shoppingcart2)
    db.session.add(shoppingcart3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shoppingcarts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shoppingcarts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shoppingcarts"))

    db.session.commit()

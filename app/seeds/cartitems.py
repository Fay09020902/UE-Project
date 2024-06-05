from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_cartitems():
    cartitem1 = CartItem(shopping_cart_id=1, menu_items_id=1, quantity=3)
    cartitem2 = CartItem(shopping_cart_id=1, menu_items_id=2, quantity=1)



    db.session.add(cartitem1)
    db.session.add(cartitem2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cartitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cartitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cartitems"))

    db.session.commit()

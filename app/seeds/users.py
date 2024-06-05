from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    tabesh = User(
        first_name='Shir', last_name='Tabesh', email='tabesh@tabesh.com', address='123, first st, 023323', city='Silicon Valley', country='USA', phone='12345678', username='tabesh', password='password')
    marnie = User(
        first_name='marnie', last_name='marnie2', email='marnie@marnie.com', address='123, first st, 023323', city='Silicon Valley', country='USA', phone='12345678', username='marnie', password='password')
    bobbie = User(
        first_name='bobbie', last_name='bobbie2', email='bobbie@bobbie.com', address='123, first st, 023323', city='Silicon Valley', country='USA', phone='12345678', username='bobbie', password='password')
    fay = User(
        first_name='Yin', last_name='Fay', email='fay@fay.com', address='123, first st, 023323', city='Silicon Valley', country='USA', phone='12345678', username='fay', password='password')
    chris = User(
        first_name='chris', last_name='chris2', email='chris@chris.com', address='123, first st, 023323', city='Silicon Valley', country='USA', phone='12345678', username='chris', password='password')

    db.session.add(tabesh)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(fay)
    db.session.add(chris)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

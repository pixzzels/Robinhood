from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(first_name='Demo', last_name="User", email='demo@user.io',
                password='password')

    ellen = User(first_name='Ellen', last_name="Park", email='ellen@chaos.com',
                 password='password')

    eunice = User(first_name='Eunice', last_name="Park", email='eunice@chaos.com',
                  password='password')

    jack = User(first_name='Jack', last_name="Radinger", email='jack@chaos.com',
                password='password')

    schuler = User(first_name='Schuler', last_name="Small", email='schuler@chaos.com',
                   password='password')

    db.session.add(demo)
    db.session.add(ellen)
    db.session.add(eunice)
    db.session.add(jack)
    db.session.add(schuler)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

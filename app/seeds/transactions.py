from app.models import db, Transaction, transaction
import datetime

def seed_transactions():

    transaction = Transaction(
        user_id=1, stock_id=52, order_price=124, order_volume=4, order_type=1, time_created=datetime.datetime.now()
    )

    db.session.add(transaction)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_transactions():
    db.session.execute('TRUNCATE Watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()

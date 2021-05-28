from app.models import db, Watchlist

def seed_watchlists():

    stock_watchlist = Watchlist(
        user_id=1, name="stocks"
    )

    db.session.add(stock_watchlist)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_watchlists():
    db.session.execute('TRUNCATE Watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()

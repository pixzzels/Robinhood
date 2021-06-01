from app.models import db, User, Portfolio

# Adds a demo user, you can add other users here if you want


def seed_portfolios():

    demo_portfolio = Portfolio(
        user_id=1, cash_balance=50000, total_investment=34000, portfolio_stats=[1, 2, 3])

    ellen_portfolio = Portfolio(
        user_id=2, cash_balance=50000, total_investment=34000, portfolio_stats=[1, 2, 3])

    eunice_portfolio = Portfolio(
        user_id=3, cash_balance=50000, total_investment=34000, portfolio_stats=[1, 2, 3])

    schuler_portfolio = Portfolio(
        user_id=4, cash_balance=50000, total_investment=34000, portfolio_stats=[1, 2, 3])

    jack_portfolio = Portfolio(
        user_id=5, cash_balance=50000, total_investment=34000, portfolio_stats=[1, 2, 3])

    db.session.add(demo_portfolio)
    db.session.add(ellen_portfolio)
    db.session.add(eunice_portfolio)
    db.session.add(schuler_portfolio)
    db.session.add(jack_portfolio)

    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_portfolios():
    db.session.execute('TRUNCATE Portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()

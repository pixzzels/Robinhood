from .db import db

class Stock(db.Model):
    __tablename__ = 'Stocks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    ticker = db.Column(db.String, nullable = False, unique = True)
    market_price = db.Column(db.Float, nullable = False, unique = True)

    
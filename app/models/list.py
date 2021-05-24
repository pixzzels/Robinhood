from .db import db

class List(db.Model):
    __tablename__ = 'Lists'

    id = db.Column(db.Integer, primary_key = True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey('Watchlists.id'), nullable = False, unique = True)
    stock_id = db.Column(db.Integer, db.ForeignKey('Stocks.id'), nullable = False, unique = True)

    watchlist = db.relationship('Watchlist')
    stock = db.relationship('Stock')
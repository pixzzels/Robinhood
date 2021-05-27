from .db import db

class List(db.Model):
    __tablename__ = 'Lists'

    id = db.Column(db.Integer, primary_key = True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey('Watchlists.id'), nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey('Stocks.id'), nullable = False)

    watchlist = db.relationship('Watchlist')
    stock = db.relationship('Stock')

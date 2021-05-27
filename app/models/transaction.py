from .db import db

class Transaction(db.Model):
    __tablename__ = 'Transactions'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey('Stocks.id'), nullable = False)
    order_price = db.Column(db.Integer, nullable = False)
    order_volume = db.Column(db.Integer, nullable = False)
    order_type = db.Column(db.Integer, nullable = True)

    user = db.relationship('User')
    stock = db.relationship('Stock')

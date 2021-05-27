from .db import db

class Transaction(db.Model):
    __tablename__ = 'Transactions'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey('Stocks.id'), nullable = False)
    order_price = db.Column(db.Integer, nullable = False)
    order_volume = db.Column(db.Integer, nullable = False)
    order_type = db.Column(db.Integer, nullable = True)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())


    user = db.relationship('User')
    stock = db.relationship('Stock')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_id": self.stock.to_dict(),
            "order_price": self.order_price,
            "order_volume": self.order_volume,
            "order_type": self.order_type,
            
        }
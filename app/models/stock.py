from .db import db

class Stock(db.Model):
    __tablename__ = 'Stocks'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    ticker = db.Column(db.String, nullable = False, unique = True)
    market_price = db.Column(db.Float, nullable = False)

    # transaction = db.relationship("Transaction", back_populates="Stocks")
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ticker": self.ticker,
            "market_price": self.market_price,
        }
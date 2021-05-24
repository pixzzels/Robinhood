from .db import db


class Tag(db.Model):
    __tablename__ = 'Tags'

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(
        'Stocks.id'), nullable=False, unique=True)
    tag_name = db.Column(db.String, nullable=False, unique=True)

    stock = db.relationship('Stock')

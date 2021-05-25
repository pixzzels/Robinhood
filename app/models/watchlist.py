from .db import db


class Watchlist(db.Model):
    __tablename__ = 'Watchlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String, nullable=False)

    user = db.relationship('User')

from .db import db
from sqlalchemy.dialects import postgresql
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import Mutable
from .user import User

class MutableList(Mutable, list):
    def append(self, value):
        list.append(self, value)
        self.changed()

    def pop(self, index=0):
        value = list.pop(self, index)
        self.changed()
        return value

    @classmethod
    def coerce(cls, key, value):
        if not isinstance(value, MutableList):
            if isinstance(value, list):
                return MutableList(value)
            return Mutable.coerce(key, value)
        else:
            return value

class Portfolio(db.Model):
    __tablename__ = 'Portfolios'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False, unique = True)
    cash_balance = db.Column(db.Integer, nullable = True)
    total_investment = db.Column(db.Integer, nullable = True)
    portfolio_stats = db.Column(MutableList.as_mutable(db.ARRAY(db.Integer)), nullable = False)

    user = db.relationship('User')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cash_balance": self.cash_balance,
            "total_investment": self.total_investment,
            "portfolio_stats": self.portfolio_stats
        }
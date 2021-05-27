from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Transaction, db

transaction_routes = Blueprint("Transactions", __name__)

@transaction_routes.route("/buy", methods=["POST"])
@login_required
def add_watchlist():
    transaction = Transaction(**request.json)

    db.session.add(transaction)
    db.session.commit()
    return transaction.to_dict()

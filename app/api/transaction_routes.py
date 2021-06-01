from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Transaction, Stock, db

transaction_routes = Blueprint("Transactions", __name__)

@transaction_routes.route("/<int:user_id>")
@login_required
def load_transactions(user_id):
    transactions = Transaction.query.filter(Transaction.user_id == user_id).all()
    return jsonify([transaction.to_dict() for transaction in transactions])



@transaction_routes.route("/buy", methods=["POST"])
@login_required
def buy_transaction():
    transaction = Transaction(**request.json)

    db.session.add(transaction)
    db.session.commit()
    return transaction.to_dict()



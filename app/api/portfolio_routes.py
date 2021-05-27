from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Portfolio, db

portfolio_routes = Blueprint("Portfolios", __name__)

@portfolio_routes.route("/<int:user_id>")
@login_required
def load_portfolio(user_id):
    portfolio = Portfolio.query.get(user_id)

    return portfolio.to_dict()


@portfolio_routes.route("/update/<int:user_id>", methods=["PUT"])
@login_required
def update_portfolio(user_id):
    portfolio = Portfolio.query.get(user_id)
    # print("HELP", request.json["cash_balance"])

    portfolio.cash_balance = request.json["cash_balance"]
    db.session.add(portfolio)
    db.session.commit()

    return portfolio.to_dict()
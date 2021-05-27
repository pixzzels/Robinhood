from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Portfolio, db

portfolio_routes = Blueprint("Portfolios", __name__)

@portfolio_routes.route("/<int:user_id>")
@login_required
def load_portfolio(user_id):
    portfolio = Portfolio.query.get(user_id)

    return portfolio.to_dict()
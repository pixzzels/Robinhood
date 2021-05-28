from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import List, db

list_routes = Blueprint("Lists", __name__)


@list_routes.route("/<int:watchlist_id>")
@login_required
def load_list(watchlist_id):
    lists = List.query.filter(List.watchlist_id == watchlist_id).all()
    return jsonify([oneList.to_dict() for oneList in lists])


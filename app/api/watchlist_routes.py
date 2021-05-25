from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Watchlist, db

watchlist_routes = Blueprint('Watchlists', __name__)

# POST ROUTES
# api/dashboard/watchlist/add


@watchlist_routes.route('/add', methods=['POST'])
@login_required
def add_watchlist():
    watchlist = Watchlist(**request.json)
    print("watchlist!", watchlist)

    db.session.add(watchlist)
    db.session.commit()
    return

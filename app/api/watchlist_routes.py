from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Watchlist, db
# from flask_cors import 

watchlist_routes = Blueprint("Watchlists", __name__)

# GET all lists


@watchlist_routes.route("/", methods=["GET"])
@login_required
def load_watchlist():
    watchlist = Watchlist.query.all()
    print("watchlist", watchlist)
    return watchlist


# POST ROUTES
# api/dashboard/watchlist/add


# ADD a list
@watchlist_routes.route("/add", methods=["POST"])
@login_required
def add_watchlist():
    watchlist = Watchlist(**request.json)
    # print("watchlist!", watchlist)

    db.session.add(watchlist)
    db.session.commit()
    return watchlist

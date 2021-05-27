from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Watchlist, db
# from flask_cors import

watchlist_routes = Blueprint("Watchlists", __name__)

# GET ROUTES
# api/watchlist

# GET all lists


@watchlist_routes.route("/<int:user_id>")
@login_required
def load_watchlist(user_id):
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    # print("watchlist", watchlists)
    print(jsonify([watchlist.to_dict() for watchlist in watchlists]))
    return jsonify([watchlist.to_dict() for watchlist in watchlists])


# POST ROUTES
# api/watchlist/add

# ADD a list
@watchlist_routes.route("/add", methods=["POST"])
@login_required
def add_watchlist():
    watchlist = Watchlist(**request.json)
    # print("watchlist!", watchlist)

    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict()


@watchlist_routes.route("/delete/<int:listId>", methods=["DELETE"])
@login_required
def remove_watchlist(listId):
    # print("TESTING HELLO WORKING?")
    watchlist = Watchlist.query.get(listId)

    db.session.delete(watchlist)
    db.session.commit()
    return watchlist.to_dict()


@watchlist_routes.route("/update/<int:listId>", methods=["PUT"])
@login_required
def update_watchlist(listId):
    # print("TESTING HELLO WORKING?")
    watchlist = Watchlist.query.get(listId)

    watchlist.name = request.json["name"]

    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict()

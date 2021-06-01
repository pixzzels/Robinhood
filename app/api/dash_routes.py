from types import new_class
from typing import Dict
from flask import Blueprint, jsonify, session, request
from requests.models import ReadTimeoutError
from flask_login import login_required
from app.models import User, Stock, Portfolio, Transaction, Watchlist, List, transaction
import requests, json
import pyEX as p
import pprint

dashboard_routes = Blueprint('dashboard', __name__)

@dashboard_routes.route('/stockinfo/<int:user>')
# @login_required
def stock(user):
    stocks = []
    prices = {'1d': [], '5d': [], '1m': [], '3m': [], '1y': [], '5y': [], 'stock_amount': {'total': 0}}
    temp = Transaction.query.filter_by(user_id=user).all()
    for i in range(len(temp)):
        temp2 = temp[i].to_dict()
        if temp2['stock_id']['ticker'] not in stocks:
            stocks.append(temp2['stock_id']['ticker'])
            prices['stock_amount'] = {**prices['stock_amount'], temp2['stock_id']['ticker']: temp2['order_volume']}
        elif temp2['stock_id']['ticker'] in stocks:
            prices['stock_amount'][temp2['stock_id']['ticker']] += temp2['order_volume']

    for stock in stocks:
        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{stock}/price?token={iex_api_key}'
        df2 = requests.get(api_url).json()
        prices['stock_amount']['total'] += df2 * prices['stock_amount'][stock]

    def get_latest_updates(symbols):
        seperator = ','


        attributes = ['1d',
                    '5d',
                    '1m',
                    '3m',
                    '1y',
                    '5y']


        for date_range in attributes:


            api_url = f'https://cloud.iexapis.com/stable/stock/market/batch?symbols={seperator.join(symbols)}&types=chart&filter=close&range={date_range}&token={iex_api_key}'
            df = requests.get(api_url).json()

            for symbol in symbols:
                if len(prices[date_range]) == 0:
                    for i in range(len(df[symbol]['chart'])):
                        prices[date_range].append(df[symbol]['chart'][i]['close'])

                elif len(prices[date_range]):
                    for i in range(len(prices[date_range])):
                        if prices[date_range][i] == None:
                            prices[date_range][i] = df[symbol]['chart'][i]['close']
                        elif df[symbol]['chart'][i]['close'] == None:
                            continue
                        else:
                            prices[date_range][i] += df[symbol]['chart'][i]['close']



        return prices


    response = get_latest_updates(stocks)
    return response


@dashboard_routes.route('/stockprices', methods=['POST'])
# @login_required
def stockprices():
    stocks = request.json['stock']

    def get_daily_historical_data(symbols):
        stockinfo = {}
        for i in symbols:
            ticker = i
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            api_url = f'https://cloud.iexapis.com/stable/stock/{ticker}/intraday-prices?token={iex_api_key}'
            df = requests.get(api_url).json()
            prices = []
            for i in range(len(df)):
                prices.append(df[i]['average'])
            stockinfo[ticker] = {'prices': prices}
        return stockinfo

    get_daily_historical_data(stocks)

from types import new_class
from typing import Dict
from flask import Blueprint, jsonify, session, request
from requests.models import ReadTimeoutError
from flask_login import login_required
from app.models import User, Stock, Portfolio, Transaction, Watchlist, List
import requests, json
import pyEX as p
import pprint

# API_KEY=pk_7f972a2636b841c489f3cf32f9a06575

dashboard_routes = Blueprint('dashboard', __name__)

# c = p.Client(api_token='pk_7f972a2636b841c489f3cf32f9a06575', version='stable')

@dashboard_routes.route('/stockinfo', methods=['POST'])
# @login_required
def stock():

    stocks = request.json['stock']



    def get_latest_updates(symbols):
        print(symbols)
        for i in symbols:
            ticker = i
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            api_url = f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token={iex_api_key}'
            df = requests.get(api_url).json()
            attributes = ['symbol',
                        'latestPrice',
                        'change']
            for i in attributes:
                print(df[i])
            print('--------------\n')
    get_latest_updates(stocks)



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
            print(prices)
            print('--------------\n')
            print(stockinfo)
            stockinfo[ticker] = {'prices': prices}
        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(stockinfo)
        return stockinfo

    get_daily_historical_data(stocks)


        # def get_historic_data(symbol):
    #     ticker = symbol
    #     iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
    #     api_url = f'https://cloud.iexapis.com/stable/stock/{ticker}/chart/max?token={iex_api_key}'
    #     df = requests.get(api_url).json()

    #     date = []
    #     open = []
    #     high = []
    #     low = []
    #     close = []

    #     for i in range(len(df)):
    #         date.append(df[i]['date'])
    #         open.append(df[i]['open'])
    #         high.append(df[i]['high'])
    #         low.append(df[i]['low'])
    #         close.append(df[i]['close'])

    # NEWS
    # sym='GS'
    # df = c.newsDF(symbol=sym, count=10)[['headline', 'source']]

    # OUTPUT

    # datetime                headline                                            source
    # 2020-07-22 03:22:10.000 Snapʼs (SNAP) CEO Evan Spiegel on Q2 2020 Resu...   Seeking Alpha
    # 2020-07-21 19:58:38.000 Slack board member and former Goldman Sachs ex...   Fortune
    # 2020-07-21 16:03:21.498 Former Goldman Sachs Exec Tabbed as USOPC Comp...   New York Times
    # 2020-07-21 15:15:25.000 High Voltage? Some Wonder If Teslaʼs High Flyi...   Benzinga Feeds
    # 2020-07-21 15:03:12.000 The 5 slides that the public was never suppose...   Business Insider
    # 2020-07-21 13:29:08.000 Goldman Sachs Has the Right Stuff to Make Mone...   The Street RealMoney
    # 2020-07-21 12:00:00.000 Weʼre seeking nominations for the 2020 Rising ...   Business Insider
    # 2020-07-21 10:02:53.000 AI startup Eigen says the coronavirus recessio...   Business Insider
    # 2020-07-21 09:13:10.000 Finance professionals not keen on getting back...   PrivateEquityWire
    # 2020-07-21 08:15:26.000 Goldman Execs Enter Malaysia for 1MDB Negotiat...   Finews.Asia


    # REDUX STORE ROUTE

    # const handleClick = async () => {
        # await fetch('/api/dashboard/stockinfo', {
        #     method: 'POST',
        #     headers: {
        #         'Content-Type':'application/json'
        #     },
        #     body: JSON.stringify({
        #         stock: ['SNAP', 'AAPL', 'TWTR']
        #     }),
        # })
    # }

from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Stock, Portfolio, Transaction, Watchlist, List
import requests, json
import pyEX as p
import pprint

# API_KEY=pk_7f972a2636b841c489f3cf32f9a06575

stock_routes = Blueprint('stock', __name__)

# c = p.Client(api_token='pk_7f972a2636b841c489f3cf32f9a06575', version='stable')

@stock_routes.route('/history/<symbol>')
# @login_required
def stock_history(symbol):
    print('HERE')



    def get_latest_updates(symbol):

        attributes = ['2d',
                    '5d',
                    '1m',
                    '3m',
                    '1y',
                    '5y']

        # attributes = ['1y']


        for i in attributes:
            date_range = i
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            # api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/chart/{date_range}/?token={iex_api_key}'
            # api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/chart/date/20210526/?token={iex_api_key}'
            api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/batch?types=chart&range={date_range}&token={iex_api_key}'
            df = requests.get(api_url).json()
            prices = []
            # for i in range(len(df)):
            #     if date_range == '1m':
            #         if df[i]['minute'][-1] == '0' or df[i]['minute'][-1] == '5' :
            #             # prices.append(df[i]['average'])
            #             print(df[i]['minute'][-1])
            #     prices.append(df[i]['minute'])
            # pp = pprint.PrettyPrinter(indent=4)
            # pp.pprint(df)
            print('--------------\n')
            print(len(df['chart']))
    get_latest_updates(symbol)



# @stock_routes.route('/stockprices', methods=['POST'])
# # @login_required
# def stockprices():
#     stocks = request.json['stock']

#     def get_daily_historical_data(symbols):
#         stockinfo = {}
#         for i in symbols:
#             ticker = i
#             iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
#             api_url = f'https://cloud.iexapis.com/stable/stock/{ticker}/intraday-prices?token={iex_api_key}'
#             df = requests.get(api_url).json()
#             prices = []
#             for i in range(len(df)):
#                 prices.append(df[i]['average'])
#             print(prices)
#             print('--------------\n')
#             print(stockinfo)
#             stockinfo[ticker] = {'prices': prices}
#         pp = pprint.PrettyPrinter(indent=4)
#         pp.pprint(stockinfo)
#         return stockinfo

#     get_daily_historical_data(stocks)

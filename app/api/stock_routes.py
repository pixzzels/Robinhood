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


    def get_latest_updates(symbol):

        # attributes = ['5d',
        #             '1m',
        #             '3m',
        #             '1y',
        #             '5y']


        # REMEMBER TO FIX THIS BEFORE PRODUCTION

        attributes = ['2d',
                    '3d',
                    '4d',
                    '5d',]

        # attributes = ['5d']

        stockinfo = {symbol: {}}

        for i in attributes:
            date_range = i
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/batch?types=chart&range={date_range}&token={iex_api_key}'
            df = requests.get(api_url).json()
            prices = []
            for i in range(len(df['chart'])):
                # print(df)
                # print(df['chart'][i])
                prices.append(df['chart'][i]['close'])
                # print(df['chart'][i]['close'])
                prices.append(df['chart'][i]['high'])
                prices.append(df['chart'][i]['low'])
                prices.append(df['chart'][i]['open'])
            if date_range == '5d':
                api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/intraday-prices?token={iex_api_key}'
                temp_df = requests.get(api_url).json()
                temp = []
                # print(temp_df)
                for i in range(len(temp_df)):
                    temp.append(temp_df[i]['average'])
                # print('TEMP', temp)
                # print('PRICES BEFORE APPEND', prices)
                # temp.reverse()
                prices = prices + temp
                # print('PRICES AFTER APPEND', prices)
                stockinfo[symbol]= {'1d': temp, **stockinfo[symbol]}

            # print('--------------\n')
            # print('61', df['chart'])
            # print('62', prices)
            # print('--------------\n')
            # print('64', stockinfo)
            stockinfo[symbol] = {date_range: prices, **stockinfo[symbol]}

            # print('--------------\n')
            # pp.pprint(stockinfo)
            # print('--------------\n')

        return jsonify(stockinfo)
    # response ='Success'
    response = get_latest_updates(symbol)
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(response.json)
    return response



# @stock_routes.route('/companyinfo/<symbol>')
# # @login_required
# def stockprices(symbol):
#     print(symbol)

#     def get_company_data(symbol):
#         companyinfo = {}

#         iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
#         api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/company?token={iex_api_key}'
#         df = requests.get(api_url).json()
#         description = df['description']
#         ceo = df['CEO']
#         employees = df['employees']
#         headquarters = df['city'] + ', ' + df['state']
#         companyinfo[symbol] = {'description': description, 'ceo': ceo, 'employees':employees, 'headquarters': headquarters}


#         pp = pprint.PrettyPrinter(indent=4)
#         pp.pprint(companyinfo)
#         return jsonify(companyinfo)

#     return get_company_data(symbol)

# @stock_routes.route('/keystatistics/<symbol>')
# # @login_required
# def company_statistics(symbol):

#     def get_company_statistics(symbol):
#         companystats = {}

#         iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
#         api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/stats?token={iex_api_key}'
#         df = requests.get(api_url).json()
#         market_cap = df['marketcap']
#         pe_ratio = df['peRatio']
#         div_yield = df['dividendYield']
#         avg_volume = df['avg30Volume']
#         companystats[symbol] = {'market_cap': market_cap, 'pe_ratio': pe_ratio, 'div_yield':div_yield, 'avg_volume': avg_volume}


#         pp = pprint.PrettyPrinter(indent=4)
#         pp.pprint(companystats)
#         return jsonify(companystats)

#     return get_company_statistics(symbol)

@stock_routes.route('/news/<symbol>')
# @login_required
def company_news(symbol):

    def get_company_news(symbol):
        companynews = {}

        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/news/last/5?token={iex_api_key}'
        df = requests.get(api_url).json()
        # print(df)
        companynews[symbol] = []
        for i in range(len(df)):
            headline = df[i]['headline']
            source = df[i]['source']
            url = df[i]['url']
            summary = df[i]['summary']
            image = df[i]['image']
            news = {'headline': headline, 'source': source, 'url':url, 'summary': summary, 'image': image}
            companynews[symbol].append(news)

        pp = pprint.PrettyPrinter(indent=4)
        pp.pprint(companynews)
        return jsonify(companynews)

    return get_company_news(symbol)







@stock_routes.route('/companyinfo/<symbol>')
# @login_required
def stockprices(symbol):
    print(symbol)
    company_details = {symbol: {}}


    def get_company_data(symbol):
        company_details = {}

        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/company?token={iex_api_key}'
        df = requests.get(api_url).json()
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={iex_api_key}'
        df2 = requests.get(api_url).json()
        price = df2['latestPrice']
        priceChange = df2['changePercent']
        change = df2['change']
        description = df['description']
        ceo = df['CEO']
        employees = df['employees']
        headquarters = df['city'] + ', ' + df['state']
        company_details[symbol] = {'description': description, 'ceo': ceo, 'employees':employees, 'headquarters': headquarters, 'company_name': df['companyName'], 'price': price, 'change': change, 'priceChange': priceChange}


        # pp = pprint.PrettyPrinter(indent=4)
        # pp.pprint(company_details)
        return company_details

    def get_company_statistics(symbol):
        companystats = {}

        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/stats?token={iex_api_key}'
        df = requests.get(api_url).json()
        market_cap = df['marketcap']
        pe_ratio = df['peRatio']
        div_yield = df['dividendYield']
        avg_volume = df['avg30Volume']
        companystats[symbol] = {'market_cap': market_cap, 'pe_ratio': pe_ratio, 'div_yield':div_yield, 'avg_volume': avg_volume}


        # pp = pprint.PrettyPrinter(indent=4)
        # pp.pprint(companystats)
        return companystats

    def get_company_news(symbol):
        companynews = {}

        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/news/last/5?token={iex_api_key}'
        df = requests.get(api_url).json()
        # print(df)
        companynews[symbol] = []
        for i in range(len(df)):
            headline = df[i]['headline']
            source = df[i]['source']
            url = df[i]['url']
            summary = df[i]['summary']
            image = df[i]['image']
            news = {'headline': headline, 'source': source, 'url':url, 'summary': summary, 'image': image}
            companynews[symbol].append(news)

        # pp = pprint.PrettyPrinter(indent=4)
        # pp.pprint(companynews)
        return companynews

    details = get_company_data(symbol)
    stats = get_company_statistics(symbol)
    news = get_company_news(symbol)
    pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(details)
    # pp.pprint(stats)
    company_details[symbol] = {'company_info': details[symbol], 'company_statistics': stats[symbol], 'company_news': news}
    pp.pprint(company_details)

    return jsonify(company_details)

# @stock_routes.route('/keystatistics/<symbol>')
# # @login_required
# def company_statistics(symbol):

#     def get_company_statistics(symbol):
#         companystats = {}

#         iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
#         api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/stats?token={iex_api_key}'
#         df = requests.get(api_url).json()
#         market_cap = df['marketcap']
#         pe_ratio = df['peRatio']
#         div_yield = df['dividendYield']
#         avg_volume = df['avg30Volume']
#         companystats[symbol] = {'market_cap': market_cap, 'pe_ratio': pe_ratio, 'div_yield':div_yield, 'avg_volume': avg_volume}


#         pp = pprint.PrettyPrinter(indent=4)
#         pp.pprint(companystats)
#         return jsonify(companystats)

#     return get_company_statistics(symbol)

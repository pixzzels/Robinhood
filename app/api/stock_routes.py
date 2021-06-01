from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Stock, Portfolio, Transaction, Watchlist, List, db
import requests, json
import pyEX as p
import pprint

stock_routes = Blueprint('stock', __name__)

@stock_routes.route('/companyinfo/<symbol>')
# @login_required
def stockprices(symbol):
    company_details = {symbol: {}}
    symbol = symbol.upper()


    def get_company_data(symbol):
        company_details = {}

        stock = Stock.query.filter_by(ticker=symbol).first()
        if stock == None:
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/quote?token={iex_api_key}'

            df3 = requests.get(api_url).json()
            company = df3['companyName']
            price = df3['latestPrice']
            if company == '':
                company = '--'

            if price == '':
                price = '--'
            stock = Stock(name=company, ticker=symbol, market_price=price)
            db.session.add(stock)
            db.session.commit()

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
        company_details[symbol] = {'description': description, 'ceo': ceo, 'employees':employees, 'headquarters': headquarters, 'company_name': df['companyName'], 'price': price, 'change': change, 'priceChange': priceChange, 'stock_id':stock.id}

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

        return companystats

    def get_company_news(symbol):
        companynews = {}

        iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
        api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/news/last/5?token={iex_api_key}'
        df = requests.get(api_url).json()
        companynews[symbol] = []
        for i in range(len(df)):
            headline = df[i]['headline']
            source = df[i]['source']
            url = df[i]['url']
            summary = df[i]['summary']
            image = df[i]['image']
            news = {'headline': headline, 'source': source, 'url':url, 'summary': summary, 'image': image}
            companynews[symbol].append(news)

        return companynews

    def get_latest_updates(symbol):

        attributes = ['5d',
                    '1m',
                    '3m',
                    '1y',
                    '5y']

        # REMEMBER TO FIX THIS BEFORE PRODUCTION

        stockinfo = {symbol: {}}

        for i in attributes:
            date_range = i
            iex_api_key = 'pk_7f972a2636b841c489f3cf32f9a06575'
            api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/batch?types=chart&range={date_range}&token={iex_api_key}'
            df = requests.get(api_url).json()
            prices = []
            for i in range(len(df['chart'])):
                prices.append(df['chart'][i]['close'])
                prices.append(df['chart'][i]['high'])
                prices.append(df['chart'][i]['low'])
                prices.append(df['chart'][i]['open'])
            if date_range == '5d':
                api_url = f'https://cloud.iexapis.com/stable/stock/{symbol}/intraday-prices?token={iex_api_key}'
                temp_df = requests.get(api_url).json()
                temp = []
                for i in range(len(temp_df)):
                    temp.append(temp_df[i]['average'])
                prices = prices + temp
                stockinfo[symbol]= {'1d': temp, **stockinfo[symbol]}

            stockinfo[symbol] = {date_range: prices, **stockinfo[symbol]}

        return stockinfo

    details = get_company_data(symbol)
    stats = get_company_statistics(symbol)
    news = get_company_news(symbol)
    price_history = get_latest_updates(symbol)
    company_details[symbol] = {'company_info': details[symbol], 'company_statistics': stats[symbol], 'company_news': news, 'price_history': price_history}

    return jsonify(company_details)

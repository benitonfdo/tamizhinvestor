import json
import os
from datetime import datetime, timezone

import yfinance as yf

ROOT = os.path.dirname(os.path.dirname(__file__))
OUTPUT = os.path.join(ROOT, 'data', 'stocks.json')

CATEGORIES = {
    'largecap': [
        'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
        'HINDUNILVR.NS', 'ITC.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'SBIN.NS',
        'LT.NS', 'BHARTIARTL.NS', 'MARUTI.NS', 'ASIANPAINT.NS', 'M&M.NS',
        'BAJFINANCE.NS', 'WIPRO.NS', 'TECHM.NS', 'ULTRACEMCO.NS', 'TITAN.NS',
        'POWERGRID.NS', 'HCLTECH.NS', 'INDUSINDBK.NS', 'COALINDIA.NS', 'DIVISLAB.NS'
    ],
    'midcap': [
        'PIDILITIND.NS', 'MUTHOOTFIN.NS', 'AUBANK.NS', 'POLYCAB.NS', 'JINDALSTEL.NS',
        'CHOLAFIN.NS', 'TVSMOTOR.NS', 'TRENT.NS', 'BALKRISIND.NS', 'PAGEIND.NS',
        'SYNGENE.NS', 'GLENMARK.NS', 'PIIND.NS', 'VOLTAS.NS', 'DABUR.NS',
        'INDIAMART.NS', 'JUBLFOOD.NS', 'NMDC.NS', 'LICI.NS', 'APOLLOHOSP.NS'
    ],
    'smallcap': [
        'KPITTECH.NS', 'ROUTE.NS', 'SJS.NS', 'BSE.NS', 'CAMS.NS', 'MFL.NS',
        'TARC.NS', 'IRCTC.NS', 'AARTIIND.NS', 'GAEL.NS', 'SAPPHIRE.NS', 'MINDACORP.NS'
    ]
}


def build_payload():
    payload = {}
    for category, symbols in CATEGORIES.items():
        items = []
        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                info = ticker.info
                hist = ticker.history(period='2d', interval='1d')
                price = None
                if not hist.empty:
                    price = round(float(hist['Close'].iloc[-1]), 2)
                record = {
                    'symbol': symbol,
                    'name': info.get('shortName') or info.get('longName') or symbol,
                    'sector': info.get('sector'),
                    'currency': info.get('currency'),
                    'price': price,
                    'marketCap': info.get('marketCap'),
                    'pe': info.get('trailingPE'),
                    'pb': info.get('priceToBook'),
                    'roe': info.get('returnOnEquity'),
                    'debtToEquity': info.get('debtToEquity'),
                    'dividendYield': info.get('dividendYield'),
                    'updatedAt': datetime.now(timezone.utc).isoformat()
                }
                items.append(record)
            except Exception as exc:
                items.append({
                    'symbol': symbol,
                    'name': symbol,
                    'error': str(exc),
                    'updatedAt': datetime.now(timezone.utc).isoformat()
                })
        payload[category] = items
    return payload


def main():
    payload = build_payload()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w', encoding='utf-8') as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    print(f'Wrote {OUTPUT}')


if __name__ == '__main__':
    main()

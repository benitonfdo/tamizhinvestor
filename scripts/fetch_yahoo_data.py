import json
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone

import requests

ROOT = os.path.dirname(os.path.dirname(__file__))
OUTPUT = os.path.join(ROOT, 'data', 'stocks.json')
API_KEY = os.getenv('FMP_API_KEY', '').strip()

# Top ~100 NSE stocks by market cap per category
# Large cap: > ₹20,000 Cr | Mid cap: ₹5,000-20,000 Cr | Small cap: < ₹5,000 Cr
CATEGORIES = {
    'largecap': [
        'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
        'HINDUNILVR.NS', 'ITC.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'SBIN.NS',
        'LT.NS', 'BHARTIARTL.NS', 'MARUTI.NS', 'ASIANPAINT.NS', 'M&M.NS',
        'BAJFINANCE.NS', 'WIPRO.NS', 'TECHM.NS', 'ULTRACEMCO.NS', 'TITAN.NS',
        'POWERGRID.NS', 'HCLTECH.NS', 'INDUSINDBK.NS', 'COALINDIA.NS', 'DIVISLAB.NS',
        'BAJAJFINSV.NS', 'ADANIENT.NS', 'ADANIPORTS.NS', 'ADANIGREEN.NS', 'ADANITRANS.NS',
        'JSWSTEEL.NS', 'TATASTEEL.NS', 'HINDALCO.NS', 'VEDANTA.NS', 'NTPC.NS',
        'ONGC.NS', 'BPCL.NS', 'IOC.NS', 'GAIL.NS', 'PETRONET.NS',
        'SUNPHARMA.NS', 'DRREDDY.NS', 'CIPLA.NS', 'LUPIN.NS', 'BIOCON.NS',
        'TORNTPHARM.NS', 'AUROPHARMA.NS', 'ALKEM.NS', 'GLENMARK.NS', 'ZYDUSLIFE.NS',
        'MARICO.NS', 'DABUR.NS', 'GODREJCP.NS', 'COLPAL.NS', 'EMAMILTD.NS',
        'PIDILITIND.NS', 'BERGEPAINT.NS', 'AKZOINDIA.NS', 'KANSAINER.NS', 'GRASIM.NS',
        'SHREECEM.NS', 'AMBUJACEM.NS', 'ACC.NS', 'DALBHARAT.NS', 'RAMCOCEM.NS',
        'BAJAJ-AUTO.NS', 'HEROMOTOCO.NS', 'EICHERMOT.NS', 'TVSMOTOR.NS', 'BALKRISIND.NS',
        'MOTHERSUMI.NS', 'BOSCHLTD.NS', 'MRF.NS', 'APOLLOTYRE.NS', 'CEAT.NS',
        'HDFCLIFE.NS', 'SBILIFE.NS', 'ICICIPRULI.NS', 'HDFCAMC.NS', 'NIPPONAMC.NS',
        'ICICIGI.NS', 'BAJAJHLDNG.NS', 'CHOLAFIN.NS', 'MUTHOOTFIN.NS', 'AUBANK.NS',
        'BANDHANBNK.NS', 'FEDERALBNK.NS', 'IDFCFIRSTB.NS', 'RBLBANK.NS', 'YESBANK.NS',
        'PAGEIND.NS', 'TRENT.NS', 'DMART.NS', 'JUBLFOOD.NS', 'DEVYANI.NS',
        'VBL.NS', 'UNITDSPR.NS', 'RADICO.NS', 'MCDOWELL-N.NS', 'UBL.NS',
        'HAVELLS.NS', 'VOLTAS.NS', 'BLUESTARCO.NS', 'WHIRLPOOL.NS', 'CROMPTON.NS',
        'POLYCAB.NS', 'FINOLEX.NS', 'KEI.NS', 'RRKABEL.NS', 'GUJGASLTD.NS',
        'IGL.NS', 'MGL.NS', 'PETRONET.NS', 'ATGL.NS', 'GUJGASLTD.NS'
    ],
    'midcap': [
        'PIDILITIND.NS', 'MUTHOOTFIN.NS', 'AUBANK.NS', 'POLYCAB.NS', 'JINDALSTEL.NS',
        'CHOLAFIN.NS', 'TVSMOTOR.NS', 'TRENT.NS', 'BALKRISIND.NS', 'PAGEIND.NS',
        'SYNGENE.NS', 'GLENMARK.NS', 'PIIND.NS', 'VOLTAS.NS', 'DABUR.NS',
        'INDIAMART.NS', 'JUBLFOOD.NS', 'NMDC.NS', 'LICI.NS', 'APOLLOHOSP.NS',
        'MPHASIS.NS', 'PERSISTENT.NS', 'COFORGE.NS', 'LTIM.NS', 'OFSS.NS',
        'KPITTECH.NS', 'TATAELXSI.NS', 'CYIENT.NS', 'ZENSARTECH.NS', 'SONATSOFTW.NS',
        'FIRSTSOURCE.NS', 'INTELLECT.NS', 'NEWGEN.NS', 'RAMCOCEM.NS', 'HEIDELBERG.NS',
        'JKCEMENT.NS', 'ORIENTCEM.NS', 'PRISMCEM.NS', 'SAGARCEM.NS', 'KCP.NS',
        'KEI.NS', 'FINOLEX.NS', 'RRKABEL.NS', 'GUJGASLTD.NS', 'IGL.NS',
        'MGL.NS', 'ATGL.NS', 'GSPL.NS', 'IRCTC.NS', 'RAILTEL.NS',
        'IRCON.NS', 'RVNL.NS', 'NBCC.NS', 'RITES.NS', 'CONCOR.NS',
        'HAL.NS', 'BEL.NS', 'BDL.NS', 'MAZAGON.NS', 'COCHINSHIP.NS',
        'GRSE.NS', 'HINDCOPPER.NS', 'NLCINDIA.NS', 'SJVN.NS', 'THDC.NS',
        'NHPC.NS', 'POWERGRID.NS', 'RECLTD.NS', 'PFC.NS', 'IRFC.NS',
        'REPCOHOME.NS', 'CANFINHOME.NS', 'LICHSGFIN.NS', 'AADHARHFC.NS', 'BAJAJHLDNG.NS',
        'M&MFIN.NS', 'SUNDARAMFIN.NS', 'CHOICEIN.NS', 'MASFIN.NS', 'UJJIVANSFB.NS',
        'EQUITAS.NS', 'JANABANK.NS', 'SURYODAY.NS', 'UTKARSH.NS', 'FINCARE.NS',
        'MAHINDRA.NS', 'ESCORTS.NS', 'TAFE.NS', 'SWARAJENG.NS', 'GREAVES.NS',
        'TUBEINVEST.NS', 'ENDURANCE.NS', 'SUBROS.NS', 'MINDAIND.NS', 'UNOMINDA.NS',
        'SCHAEFFLER.NS', 'TIMKEN.NS', 'NRBBEARING.NS', 'SKFINDIA.NS', 'GALAXYSURF.NS',
        'NAVINFLUOR.NS', 'TATACHEM.NS', 'DEEPAKNTR.NS', 'VINATIORGA.NS', 'ASTRAZEN.NS',
        'TORNTPHARM.NS', 'ALKEM.NS', 'AJANTPHARM.NS', 'NATCOPHARM.NS', 'GRANULES.NS',
        'LAURUSLABS.NS', 'BIOCON.NS', 'SYNGENE.NS', 'GLENMARK.NS', 'ZYDUSLIFE.NS'
    ],
    'smallcap': [
        'KPITTECH.NS', 'ROUTE.NS', 'SJS.NS', 'BSE.NS', 'CAMS.NS', 'MFL.NS',
        'TARC.NS', 'IRCTC.NS', 'AARTIIND.NS', 'GAEL.NS', 'SAPPHIRE.NS', 'MINDACORP.NS',
        'AFFLE.NS', 'HAPPSTMNDS.NS', 'RATEGAIN.NS', 'CARTRADE.NS', 'EASEMYTRIP.NS',
        'POLICYBZR.NS', 'ZOMATO.NS', 'NYKAA.NS', 'PAYTM.NS', 'PBFINTECH.NS',
        'DELHIVERY.NS', 'BLUEDART.NS', 'TCIEXP.NS', 'MAHINDRA.NS', 'ESCORTS.NS',
        'TAFE.NS', 'SWARAJENG.NS', 'GREAVES.NS', 'TUBEINVEST.NS', 'ENDURANCE.NS',
        'SUBROS.NS', 'MINDAIND.NS', 'UNOMINDA.NS', 'SCHAEFFLER.NS', 'TIMKEN.NS',
        'NRBBEARING.NS', 'SKFINDIA.NS', 'GALAXYSURF.NS', 'NAVINFLUOR.NS', 'TATACHEM.NS',
        'DEEPAKNTR.NS', 'VINATIORGA.NS', 'ASTRAZEN.NS', 'TORNTPHARM.NS', 'ALKEM.NS',
        'AJANTPHARM.NS', 'NATCOPHARM.NS', 'GRANULES.NS', 'LAURUSLABS.NS', 'BIOCON.NS',
        'SYNGENE.NS', 'GLENMARK.NS', 'ZYDUSLIFE.NS', 'METROPOLIS.NS', 'DRLALPATH.NS',
        'LALPATHLAB.NS', 'THYROCARE.NS', 'KRSNAA.NS', 'MAXHEALTH.NS', 'NARAYANA.NS',
        'FORTIS.NS', 'APOLLOHOSP.NS', 'MEDANTA.NS', 'HCG.NS', 'ASTERDM.NS',
        'RAINBOW.NS', 'KRISHNA.NS', 'SAGAR.NS', 'INDRAD.NS', 'SARVESH.NS',
        'DEEPINDS.NS', 'GRAVITA.NS', 'HINDZINC.NS', 'NATCOPHARM.NS', 'ASTEC.NS',
        'CAMS.NS', 'KFINTECH.NS', 'LINKINTIME.NS', 'MCAP.NS', 'ALMONDZ.NS',
        'CENTRALBK.NS', 'BANKINDIA.NS', 'UNIONBANK.NS', 'INDIANB.NS', 'CENTRALBK.NS'
    ]
}


def fetch_profile(symbol):
    if not API_KEY:
        raise RuntimeError('FMP_API_KEY is not set')
    url = f'https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={API_KEY}'
    response = requests.get(url, timeout=60, headers={'User-Agent': 'Mozilla/5.0'})
    response.raise_for_status()
    payload = response.json()
    if isinstance(payload, list):
        return payload[0] if payload else {}
    return payload or {}


def fetch_symbol(symbol):
    """Fetch profile for a single symbol."""
    try:
        profile = fetch_profile(symbol)
        return {
            'symbol': symbol,
            'name': profile.get('companyName') or profile.get('name') or symbol,
            'sector': profile.get('industry') or profile.get('sector'),
            'currency': profile.get('currency'),
            'price': profile.get('price'),
            'marketCap': profile.get('marketCap'),
            'pe': profile.get('pe') or profile.get('priceEarningsRatio'),
            'pb': profile.get('priceToBookRatio') or profile.get('pb'),
            'roe': profile.get('returnOnEquity'),
            'debtToEquity': profile.get('debtToEquity') or profile.get('debtToEquityRatio'),
            'dividendYield': profile.get('dividendYield') or profile.get('lastDividend'),
            'updatedAt': datetime.now(timezone.utc).isoformat()
        }
    except Exception as exc:
        return {
            'symbol': symbol,
            'name': symbol,
            'error': str(exc),
            'updatedAt': datetime.now(timezone.utc).isoformat()
        }


def build_payload():
    payload = {}
    for category, symbols in CATEGORIES.items():
        items = []
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_symbol = {executor.submit(fetch_symbol, sym): sym for sym in symbols}
            for future in as_completed(future_to_symbol):
                items.append(future.result())
        payload[category] = items
    return payload


def main():
    payload = build_payload()
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, 'w', encoding='utf-8') as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    print(f'Wrote {OUTPUT}')
    for cat, items in payload.items():
        print(f'  {cat}: {len(items)} stocks')


if __name__ == '__main__':
    main()
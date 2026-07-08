let stockData = { largecap: [], midcap: [], smallcap: [] };

async function loadStockData() {
  try {
    const response = await fetch('data/stocks.json');
    if (!response.ok) throw new Error('Unable to load stock data');
    const payload = await response.json();
    stockData = payload;
    generateCurrentStocks();
    renderStocks();
    applyLanguage(currentLang);
  } catch (error) {
    console.error(error);
  }
}

const translations = {
  ta: {
    nav: { home: 'முகப்பு', largecap: 'பெரிய பங்குகள்', midcap: 'நடுத்தர பங்குகள்', smallcap: 'சிறிய பங்குகள்' },
    home: {
      hero: { eyebrow: 'சீர்தரமான, வெளிப்படையான, தமிழில்', title: 'மூலதன அளவின் அடிப்படையில் 300+ பங்குகளின் தொகுப்பு பகுப்பாய்வு', description: 'இந்தத் தளம் பெரிய, நடுத்தர மற்றும் சிறிய பங்கு பிரிவுகளில் உள்ள பங்குகளின் சுருக்க பகுப்பாய்வை தமிழில் வழங்குகிறது. ஒவ்வொரு பங்கின் PE, PB, ROE, Debt/Equity, Dividend Yield மற்றும் அடிப்படைக் கருத்தை கிளிக் செய்தால் பார்க்கலாம்.', ctaLarge: 'பெரிய பங்குகள்', ctaMid: 'நடுத்தர பங்குகள்', ctaSmall: 'சிறிய பங்குகள்' },
      heroCard: { title: 'இந்தத் தளம் என்ன வழங்குகிறது?', item1: 'நிலையான HTML, CSS மற்றும் JavaScript கொண்ட GitHub Pages வடிவமைப்பு', item2: 'ஒவ்வொரு பங்கும் கிளிக் செய்யக்கூடிய விவரங்கள்', item3: 'பங்குகள், விகிதங்கள், அபாய மதிப்பீடு மற்றும் சுருக்கக் குறிப்புகள்', item4: 'சிறந்த வாசிப்புத்திறன் மற்றும் மொபைல் அனுபவம்' },
      cards: { large: { title: '100 பெரிய பங்குகள்', description: 'நிறுவனங்களின் நீண்டகால நிலைத்தன்மை, வலுவான நிதிச் செயல்திறன் மற்றும் பெரிய மூலதன கட்டமைப்பை மதிப்பிடுதல்.' }, mid: { title: '100 நடுத்தர பங்குகள்', description: 'வளர்ச்சி திறன், விலை-வருவாய் விகிதம் மற்றும் நிதி வலிமையின் அடிப்படையில் சோதனை.' }, small: { title: '100 சிறிய பங்குகள்', description: 'உயர் வளர்ச்சி சாத்தியம், மாறுபாட்டை சமநிலைப்படுத்துதல் மற்றும் சுறுசுறுப்பான துறை வாய்ப்புகள்.' }, link: 'விவரங்களைப் பார்க்க' },
      infoPanel: { title: 'செயல்முறைத் தளம்', description: 'இந்தத் தளம் நேரடி Yahoo Finance தரவுகளின் அடிப்படையில் உருவாக்கப்பட்டு, இப்போது துல்லியமான சந்தைப் மதிப்பீடுகளை வழங்குகிறது.' }
    },
    pages: {
      large: { eyebrow: '100 பெரிய மூலதன பங்குகள்', title: 'நிலையான நிறுவனங்கள், வலிமையான நிதி சுயவிவரம் மற்றும் நீண்டகால வளர்ச்சி', description: 'இந்தப் பிரிவு பெரிய அளவிலான நிறுவனங்களின் சுருக்க மதிப்பீடுகளை நேரடியான Yahoo Finance தரவுகளின் அடிப்படையில் வழங்குகிறது.' },
      mid: { eyebrow: '100 நடுத்தர மூலதன பங்குகள்', title: 'வளர்ச்சி சாத்தியமும், மிதமான நிலைத்தன்மையும் கொண்ட நிறுவனங்கள்', description: 'இந்தப் பிரிவு நடுத்தர அளவிலான நிறுவனங்களின் வளர்ச்சி சாத்தியத்தையும், விகிதங்களையும் நேரடி தரவுகளுடன் ஒப்பிடுகிறது.' },
      small: { eyebrow: '100 சிறிய மூலதன பங்குகள்', title: 'உயர் வளர்ச்சி சாத்தியம் மற்றும் அதிக மாறுபாட்டுடன் கூடிய பங்குகள்', description: 'இந்தப் பிரிவு சிறிய நிறுவனங்களின் ஆபத்து-வெகுமதி சமநிலையையும், வளர்ச்சி இயக்கவியலையும் நேரடி தரவுகளுடன் சுருக்கமாக வழங்குகிறது.' },
      search: { placeholder: 'பங்கு பெயர் அல்லது குறியீடு தேடு...' },
      sort: { roe: 'ROE', pe: 'PE', pb: 'PB', yield: 'Dividend Yield' }
    },
    footer: { disclaimer: 'முதலீட்டு ஆபத்து உள்ளது. இந்தத் தகவல் முதலீட்டு பரிந்துரை அல்ல; முடிவெடுப்பதற்கு தனிப்பட்ட ஆராய்ச்சி மற்றும் ஆலோசனையுடன் இணைந்து ஆய்வு செய்யவும்.' },
    ui: { details: 'விவரங்கள்', close: 'மூடு', analysis: 'பங்கு பகுப்பாய்வு', noteLabel: 'பகுப்பாய்வுக் கருத்து:', noteText: 'இந்தப் பங்கு அதன் துறைச் சூழல், நிதி நிலை மற்றும் வளர்ச்சி சாத்தியத்தின் அடிப்படையில் கவனிக்க வேண்டிய ஒரு தேர்வாக இருக்கலாம். முதலீட்டில் முடிவெடுப்பதற்கு முழுமையான ஆராய்ச்சி அவசியம்.', debtEquity: 'Debt/Equity', metricNote: 'குறிப்பு' }
  },
  en: {
    nav: { home: 'Home', largecap: 'Large Caps', midcap: 'Mid Caps', smallcap: 'Small Caps' },
    home: {
      hero: { eyebrow: 'Consistent, transparent, in English', title: 'A curated analysis of 300+ stocks by market capitalization', description: 'This site presents concise analysis of large, mid, and small-cap stocks in English, powered by real Yahoo Finance data. Click any stock to explore PE, PB, ROE, Debt/Equity, Dividend Yield, and a short summary.', ctaLarge: 'Large Caps', ctaMid: 'Mid Caps', ctaSmall: 'Small Caps' },
      heroCard: { title: 'What this site offers', item1: 'A GitHub Pages layout built with static HTML, CSS, and JavaScript', item2: 'Clickable stock details for every listing', item3: 'Ratios, risk context, and short commentary', item4: 'Good readability and mobile-friendly experience' },
      cards: { large: { title: '100 Large Cap Stocks', description: 'Assessment of long-term stability, strong financial performance, and large-cap structure.' }, mid: { title: '100 Mid Cap Stocks', description: 'A review of growth potential, valuation, and balance-sheet strength.' }, small: { title: '100 Small Cap Stocks', description: 'Highlights of high growth potential and higher volatility with disciplined screening.' }, link: 'View details' },
      infoPanel: { title: 'Live data driven view', description: 'This site is built from real Yahoo Finance metrics and refreshed into a structured JSON catalogue for fast static delivery.' }
    },
    pages: {
      large: { eyebrow: '100 Large Cap Stocks', title: 'Stable businesses with strong balance sheets and long-term growth potential', description: 'This section uses real Yahoo Finance data to present concise stock snapshots for large-cap companies.' },
      mid: { eyebrow: '100 Mid Cap Stocks', title: 'Companies with growth potential and moderate stability', description: 'This section compares mid-cap companies using live valuation and financial-health signals.' },
      small: { eyebrow: '100 Small Cap Stocks', title: 'High-growth opportunities with higher variability', description: 'This section highlights small-cap companies with risk-reward tradeoffs and growth-led dynamics.' },
      search: { placeholder: 'Search by stock name or ticker...' },
      sort: { roe: 'ROE', pe: 'PE', pb: 'PB', yield: 'Dividend Yield' }
    },
    footer: { disclaimer: 'Investment involves risk. This content is not a recommendation and should be reviewed with personal research and professional advice.' },
    ui: { details: 'Details', close: 'Close', analysis: 'Stock analysis', noteLabel: 'Analysis note:', noteText: 'This stock may be worth monitoring based on its sector context, financial strength, and growth potential. Always conduct full research before investing.', debtEquity: 'Debt/Equity', metricNote: 'Note' }
  }
};

const storageKey = 'tamizh-language';
let currentLang = localStorage.getItem(storageKey) || 'ta';

const themeStorageKey = 'tamizh-theme';
let currentTheme = localStorage.getItem(themeStorageKey) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

let currentStocks = [];
const pageKey = document.body.dataset.page || 'largecap';
const stockList = document.getElementById('stock-list');
const searchInput = document.getElementById('stock-search');
const sortSelect = document.getElementById('sort-select');
const modal = document.getElementById('stock-modal');
const themeToggle = document.getElementById('theme-toggle');

function getValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function applyTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  currentTheme = selected;
  localStorage.setItem(themeStorageKey, selected);
  document.documentElement.setAttribute('data-theme', selected);
  if (themeToggle) {
    themeToggle.innerHTML = selected === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', selected === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', selected === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function applyLanguage(lang) {
  const selected = translations[lang] ? lang : 'ta';
  currentLang = selected;
  localStorage.setItem(storageKey, selected);
  document.documentElement.lang = selected;
  document.title = selected === 'en'
    ? 'தமிழ் இன்வெஸ்டர் | Stock Analysis'
    : 'தமிழ் இன்வெஸ்டர் | பங்கு பகுப்பாய்வு';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', selected === 'en'
      ? 'English analysis of large, mid, and small-cap stocks.'
      : 'தமிழில் பெரிய, நடுத்தர மற்றும் சிறிய பங்கு பகுப்பாய்வு');
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getValue(translations[selected], element.dataset.i18n);
    if (typeof value === 'string') {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = value;
      } else {
        element.textContent = value;
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach((button) => {
    const isActive = button.dataset.lang === selected;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  if (stockList) {
    renderStocks();
  }
}

function generateCurrentStocks() {
  currentStocks = [...(stockData[pageKey] || [])];
}

function formatMetric(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return Number(value).toFixed(2);
}

function renderStocks() {
  if (!stockList) return;

  const filter = (searchInput?.value || '').toLowerCase();
  const sortKey = sortSelect?.value || 'roe';
  const t = translations[currentLang];

  const filtered = currentStocks.filter((stock) => {
    const haystack = `${stock.symbol} ${stock.name}`.toLowerCase();
    return haystack.includes(filter);
  });

  const sorted = filtered.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));

  stockList.innerHTML = sorted.map((stock) => `
    <article class="stock-card">
      <div class="stock-head">
        <div class="stock-title">
          <strong>${stock.symbol}</strong>
          <span>${stock.name}</span>
        </div>
        <button class="link-btn" data-symbol="${stock.symbol}">${t.ui.details}</button>
      </div>
      <div class="metric-grid">
        <div class="metric"><span class="label">Price</span><span class="value">₹${formatMetric(stock.price)}</span></div>
        <div class="metric"><span class="label">PE</span><span class="value">${formatMetric(stock.pe)}</span></div>
        <div class="metric"><span class="label">PB</span><span class="value">${formatMetric(stock.pb)}</span></div>
        <div class="metric"><span class="label">ROE</span><span class="value">${formatMetric(stock.roe * 100)}%</span></div>
      </div>
      <div class="metric-grid">
        <div class="metric"><span class="label">${t.ui.metricNote}</span><span class="value">${stock.sector || '—'}</span></div>
        <div class="metric"><span class="label">D/E</span><span class="value">${formatMetric(stock.debtToEquity)}</span></div>
      </div>
    </article>
  `).join('');
}

function openModal(stock) {
  if (!modal) return;
  const t = translations[currentLang];
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-head">
        <div>
          <p class="eyebrow">${t.ui.analysis}</p>
          <h2 id="modal-title">${stock.symbol} — ${stock.name}</h2>
        </div>
        <button class="close-btn" id="close-modal">${t.ui.close}</button>
      </div>
      <p><strong>Sector:</strong> ${stock.sector || '—'}</p>
      <p><strong>Price:</strong> ₹${formatMetric(stock.price)}</p>
      <div class="metric-grid">
        <div class="metric"><span class="label">PE</span><span class="value">${formatMetric(stock.pe)}</span></div>
        <div class="metric"><span class="label">PB</span><span class="value">${formatMetric(stock.pb)}</span></div>
        <div class="metric"><span class="label">ROE</span><span class="value">${formatMetric(stock.roe * 100)}%</span></div>
        <div class="metric"><span class="label">${t.ui.debtEquity}</span><span class="value">${formatMetric(stock.debtToEquity)}</span></div>
      </div>
      <p><strong>${t.ui.noteLabel}</strong> ${t.ui.noteText}</p>
    </div>
  `;
  modal.classList.remove('hidden');
}

document.querySelectorAll('.lang-btn').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', renderStocks);
}

if (sortSelect) {
  sortSelect.addEventListener('change', renderStocks);
}

stockList?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-symbol]');
  if (!button) return;
  const symbol = button.getAttribute('data-symbol');
  const stock = currentStocks.find((item) => item.symbol === symbol);
  if (stock) openModal(stock);
});

modal?.addEventListener('click', (event) => {
  if (event.target.id === 'close-modal' || event.target === modal) {
    modal.classList.add('hidden');
  }
});

applyTheme(currentTheme);
applyLanguage(currentLang);
loadStockData();

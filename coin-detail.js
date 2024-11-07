// Funktion zum Abrufen der Coin-ID aus der URL
function getCoinIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('coinId'); // Coin-ID aus den URL-Parametern holen
}

// Funktion zum Abrufen der Daten für den spezifischen Coin
async function fetchCoinData(coinId) {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Daten in HTML-Elementen anzeigen
        document.getElementById('coin-name').textContent = data.name;
        document.getElementById('coin-price').textContent = `$${data.market_data.current_price.usd}`;

        // TradingView-Widget für den spezifischen Coin laden
        loadTradingViewChart(data.symbol.toUpperCase() + "USDT");
        
    } catch (error) {
        console.error('Fehler beim Abrufen der Coin-Daten:', error);
    }
}

// Funktion zum Laden des TradingView-Charts für den spezifischen Coin
function loadTradingViewChart(symbol) {
    new TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": `BINANCE:${symbol}`,
        "interval": "D",
        "theme": "dark",
        "style": "1",
        "locale": "de",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": "tradingview_chart"
    });
}

// Starte das Laden der Daten für den Coin anhand der URL-ID
const coinId = getCoinIdFromURL();
if (coinId) {
    fetchCoinData(coinId);
} else {
    console.error("Keine Coin-ID in der URL gefunden.");
}
// Funktion zum Abrufen der Coin-ID aus der URL
function getCoinIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('coinId'); // Coin-ID aus den URL-Parametern holen
}

// Funktion zum Abrufen der Daten für den spezifischen Coin
async function fetchCoinData(coinId) {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Daten konnten nicht geladen werden.");
        const data = await response.json();

        // Daten in HTML-Elementen anzeigen
        document.getElementById('coin-name').textContent = data.name || "Coin Name nicht verfügbar";
        document.getElementById('coin-price').textContent = `$${data.market_data.current_price.usd || "0.00"}`;

        // TradingView-Widget für den spezifischen Coin laden
        loadTradingViewChart(data.symbol.toUpperCase() + "USDT");

    } catch (error) {
        console.error('Fehler beim Abrufen der Coin-Daten:', error);
        alert("Coin-Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    }
}

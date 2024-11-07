let currentPage = 1; // Aktuelle Seite für die Paginierung
const coinsPerPage = 30; // Anzahl der Coins pro Seite

// Funktion zum Abrufen der Meme-Coin-Daten von der CoinGecko-API mit Paginierung
async function fetchMemeCoins(page = 1) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=${coinsPerPage}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Daten konnten nicht geladen werden.");
        const data = await response.json();

        // Anzeige der Meme-Coins auf der Home-Seite
        displayTopMemecoins(data);

        // Paginierungsinformationen aktualisieren
        updatePagination(page, data.length < coinsPerPage);

    } catch (error) {
        console.error('Fehler beim Abrufen der Meme-Coin-Daten:', error);
        alert("Daten konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
    }
}

// Funktion zur Anzeige der Memecoins in einer Tabelle auf der Home-Seite
function displayTopMemecoins(coins) {
    const memecoinList = document.getElementById('memecoins-list');
    memecoinList.innerHTML = ''; // Liste leeren

    // Benutzerdefinierte Nummerierung beginnt bei der richtigen Position auf der aktuellen Seite
    coins.forEach((coin, index) => {
        const row = document.createElement('tr');

        // Berechne die Nummerierung basierend auf der aktuellen Seite
        const rankCell = document.createElement('td');
        rankCell.textContent = (currentPage - 1) * coinsPerPage + index + 1; // Berechnung der fortlaufenden Nummer
        row.appendChild(rankCell);

        // Kryptowährung Name und Symbol
        const nameCell = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.href = `pages/coin-detail.html?coinId=${coin.id}`;
        nameLink.textContent = coin.name;
        nameLink.style.color = 'inherit';
        nameLink.style.textDecoration = 'none';

        const symbol = document.createElement('span');
        symbol.classList.add('coin-symbol');
        symbol.textContent = coin.symbol.toUpperCase();

        nameCell.appendChild(nameLink);
        nameCell.appendChild(symbol);

        // Kauf-Button
        const buyButton = document.createElement('a');
        buyButton.href = "#";
        buyButton.classList.add('buy-button');
        buyButton.textContent = "Kaufen";
        nameCell.appendChild(buyButton);
        row.appendChild(nameCell);

        // Preis
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${coin.current_price.toFixed(4)}`;
        row.appendChild(priceCell);

        // Preisänderung 1h
        const change1hCell = document.createElement('td');
        change1hCell.textContent = coin.price_change_percentage_1h_in_currency != null 
            ? `${coin.price_change_percentage_1h_in_currency.toFixed(2)}%`
            : 'N/A';
        change1hCell.classList.add(coin.price_change_percentage_1h_in_currency > 0 ? 'coin-gain' : 'coin-loss');
        row.appendChild(change1hCell);

        // Preisänderung 24h
        const change24hCell = document.createElement('td');
        change24hCell.textContent = coin.price_change_percentage_24h != null 
            ? `${coin.price_change_percentage_24h.toFixed(2)}%`
            : 'N/A';
        change24hCell.classList.add(coin.price_change_percentage_24h > 0 ? 'coin-gain' : 'coin-loss');
        row.appendChild(change24hCell);

        // Preisänderung 7d
        const change7dCell = document.createElement('td');
        change7dCell.textContent = coin.price_change_percentage_7d_in_currency != null
            ? `${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`
            : 'N/A';
        change7dCell.classList.add(coin.price_change_percentage_7d_in_currency > 0 ? 'coin-gain' : 'coin-loss');
        row.appendChild(change7dCell);

        // Handelsvolumen 24h
        const volumeCell = document.createElement('td');
        volumeCell.textContent = `$${coin.total_volume ? coin.total_volume.toLocaleString() : 'N/A'}`;
        row.appendChild(volumeCell);

        // Marktkapitalisierung
        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = `$${coin.market_cap ? coin.market_cap.toLocaleString() : 'N/A'}`;
        row.appendChild(marketCapCell);

        // 7-Tage-Chart Icon (Platzhalter)
        const chartCell = document.createElement('td');
		const chartIcon = document.createElement('img');
		chartIcon.src = "assets/chart-icon.png"; // Korrigierter Pfad
		chartIcon.classList.add('chart-icon');
		chartCell.appendChild(chartIcon);

        row.appendChild(chartCell);

        // Zeile zur Tabelle hinzufügen
        memecoinList.appendChild(row);
    });
}

// Funktion zur Aktualisierung der Paginierungskontrollen
function updatePagination(page, isLastPage) {
    document.getElementById('page-info').textContent = `Seite ${page}`;
    document.getElementById('prev-page').disabled = page === 1;
    document.getElementById('next-page').disabled = isLastPage;
}

// Funktion zum Ändern der Seite
function changePage(direction) {
    currentPage += direction;
    fetchMemeCoins(currentPage);
}

// Initialer Aufruf, um die erste Seite zu laden
fetchMemeCoins(currentPage);

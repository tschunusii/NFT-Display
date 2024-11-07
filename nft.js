// Funktion zum Abrufen von NFT-Daten für ein bestimmtes Projekt
async function fetchNFTs() {
    const nftList = document.getElementById('nft-list');
    nftList.innerHTML = ''; // Galerie leeren

    // API-Endpunkt für die OpenSea-Assets mit API-Schlüssel im Header
    const apiUrl = `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=10`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-API-KEY': '8982fb44fdfb4303a85526a1de38adf0' // API-Schlüssel im Header
            }
        });

        const data = await response.json();

        // Überprüfe, ob die Antwort die erwarteten NFT-Daten enthält
        if (data && data.assets) {
            displayNFTs(data.assets); // Verwende 'data.assets' für die Anzeige der NFTs
        } else {
            console.error('Unerwartete API-Antwort:', data);
            alert("Es wurden keine NFTs gefunden.");
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der NFT-Daten:', error);
        alert('NFT-Daten konnten nicht geladen werden. Bitte versuche es später erneut.');
    }
}



// Funktion zur Anzeige der NFTs in der Galerie
function displayNFTs(nfts) {
    const nftList = document.getElementById('nft-list');

    nfts.forEach((nft) => {
        // Erstelle die NFT-Karte
        const nftCard = document.createElement('div');
        nftCard.classList.add('nft-card');

        // Bild des NFTs
        const nftImage = document.createElement('img');
        nftImage.src = nft.image_url || 'default-image.png'; // Platzhalter-Bild, falls kein Bild vorhanden ist
        nftImage.alt = nft.name || 'NFT';
        nftCard.appendChild(nftImage);

        // Name des NFTs
        const nftName = document.createElement('h4');
        nftName.textContent = nft.name || 'Unbekanntes NFT';
        nftCard.appendChild(nftName);

        // Preis des NFTs
        const nftPrice = document.createElement('p');
        nftPrice.textContent = nft.price ? `$${nft.price}` : 'Preis nicht verfügbar';
        nftCard.appendChild(nftPrice);

        // Füge die Karte zur Liste hinzu
        nftList.appendChild(nftCard);
    });
}

// Rufe die NFTs beim Laden der Seite ab
fetchNFTs();

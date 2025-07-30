function fetchAndDisplay(keyword) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const searchTerm = keyword.toLowerCase().trim();
            let results = [];

            if (searchTerm.includes("beach")) {
                results = data.beaches;
            } else if (searchTerm.includes("temple")) {
                results = data.temples;
            } else {
                results = data.countries
                    .filter(function(country) {
                        return country.name.toLowerCase().includes(searchTerm);
                    })
                    .flatMap(function(country) {
                        return country.cities;
                    });
            }

            if (results.length === 0) {
                resultsContainer.innerHTML = `<p>No results found".</p>`;
                return;
            }

            results.forEach(function(item) {
                const card = document.createElement("div");
                card.className = "recommendation-card";
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.imageUrl}" alt="${item.name}" width="300">
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(card);
            });
        })
        .catch(function(error) {
            console.log("Fetch error:", error);
            resultsContainer.innerHTML = "<p>Failed to load recommendations.</p>";
        });
}

function searchRecommendations() {
    const keyword = document.getElementById("searchInput").value;
    if (keyword) {
        fetchAndDisplay(keyword);
    }
}

function resetResults() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}

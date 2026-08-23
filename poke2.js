const btn = document.getElementById("btn");

btn.addEventListener("click", searchPokemon);

function searchPokemon() {
    const input = document.getElementById("text-input");
    const query = input.value.toLowerCase().trim();

    if (query === "") {
        displayError("Please enter a Pokémon name");
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById("pokemon-info");

    pokemonInfo.innerHTML = `
        <div class="pokemon-name">${pokemon.name.toUpperCase()}</div>
        <div class="pokemon-img">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
           

        </div>
        <p class='pokemon-height'><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p class='pokemon-weight'><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <p class='pokemon-type'><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    `;
}

function displayError(message) {
    const pokemonInfo = document.getElementById("pokemon-info");
    pokemonInfo.innerHTML = `<p style="color:red;">${message}</p>`;
}


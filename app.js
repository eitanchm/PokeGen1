/* Pokemon grid functionality */

const grid = document.querySelector(".grid-container");

/** Function to fetch pokemons from PokeAPI and fill pokemon card with info and HTML */
async function asyncFetchPokemon() {
    for (let id = 1; id <= 151; id++)
    {
        let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

        fetch(pokeUrl)
            .then(res => {
                return res.json();
            })
            // Build a pokemon object
            .then(data => {
                const pokemon = {};
                pokemon['name'] = data.name;
                pokemon['image'] = data.sprites.front_default;
                pokemon['types'] = data.types;
                
                // Make a readable string of all the pokemon's types
                let types = '';
                for (i in pokemon['types']) {
                    types += `${pokemon['types'][i].type.name}, `;
                }
                // Remove the last ', '
                types = types.slice(0, -2);

                // Add the innerHTML for each pokemon card
                grid.innerHTML += `<button onclick="displayPokemonInfo(${id})" class="pokemon-card" style="order: ${id}">
                    <img src="${pokemon['image']}" /><h3 class="pokemon-name">${id}. ${pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1)}
                    </h3><p class="pokemon-types">Type: ${types}</p></button>`;
            });
    }
};

/* Function call */
asyncFetchPokemon();

/** Function that triggers on click, and displays detailed information about the pokemon */
function displayPokemonInfo(pokemonID) {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    pokemonInfo.classList.add("visible");
}

// Closing the pokemon info window
const closeButton = document.querySelector(".close");
console.log(closeButton);

function closePokemonInfo() {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    pokemonInfo.classList.remove("visible");
    console.log("doneafasdf");
}

// Event listener
closeButton.addEventListener("click", closePokemonInfo, false);

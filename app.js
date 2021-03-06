/* Pokemon grid functionality */

const grid = document.querySelector(".grid-container");
let closeBtn = document.querySelector(".closeBtn")

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
                let pokemon = {};
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
function displayPokemonInfo(pokemonId) {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            let pokemon = {}
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

        });
    pokemonInfo.classList.add("visible");
}

/** This function closes the pokemon detailed information pop-up */
function closePokemonInfo() {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    pokemonInfo.classList.remove("visible");
}

/** This function will close the pokemon info window when clicked outside the modal box */
window.addEventListener("click", function(e) {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    if (e.target == pokemonInfo) {
        closePokemonInfo();
    }
})

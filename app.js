/* Pokemon grid functionality */

const grid = document.querySelector(".grid-container");
let closeBtn = document.querySelector(".closeBtn")

/** Function to fetch pokemons from PokeAPI and fill pokemon card with info and HTML */
function fetchPokemon() {
    let gridHTML = ``;
    grid.innerHTML = `<h3>Loading...</h3>`;
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
                let type = '';
                for (i in pokemon['types']) {
                    type = `${pokemon['types'][i].type.name}`;
                    // Prettify the string
                    type = prettifyStr(type);
                    // Append to types
                    types += type + ', ';
                }
                // Remove the last ', '
                types = types.slice(0, -2);

                // Add the innerHTML for each pokemon card
                console.log('i');
                gridHTML += `<button onclick="displayPokemonInfo(${id})" class="pokemon-card" style="order: ${id}">
                    <img src="${pokemon['image']}" /><h3 class="pokemon-name">${id}. ${pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1)}
                    </h3><p class="pokemon-types">Type: ${types}</p></button>`;
                
                // This is used because fetch works asynchronously, so we need to check inside of fetch
                if (id == 151) {
                    // After loading have the invisible pokemon-info-container
                    grid.innerHTML = `<div class="pokemon-info-container" id="pokemon-info">
                        <div class="pokemon-info-content"></div></div>`;
                    grid.innerHTML += gridHTML;
                }
            });
    }
};

/* Function call */
fetchPokemon();


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

            pokemon['moves'] = data.moves;
            // Make a readable string of the pokemon's moves
            let moves = '';
            let move = '';
            for (i in pokemon['moves']) {
                // Start with the basic information as it appears on the API
                move = `${pokemon['moves'][i].move.name}`;
                // Prettify the string
                move = prettifyStr(move);
                moves += move + ', ';
            }
            // Deletes the last 2 characters: ', '
            moves = moves.slice(0, -2);

            pokemon['games'] = data.game_indices;
            // Make a readable string of the games that the pokemon appears in
            let games = '';
            let game = '';
            for (i in pokemon['games']) {
                // Start with information as it appears on the API response
                game = `${pokemon['games'][i].version.name}`;
                // Prettify the string
                game = prettifyStr(game);
                // Append to games string if the game doens't exist
                if (games.search(game) == -1) {
                    games += game + ', ';
                }
            }
            // Deletes the last 2 characters: ', '
            games = games.slice(0, -2);

            // Build the HTML structure with the prettified data from the API
            pokemonInfo.querySelector(".pokemon-info-content").innerHTML = 
                `<span onclick="closePokemonInfo()" class="closeBtn">&times;</span>
                <div class="left"><img src="${pokemon['image']}" class="poke-info-img"></div>
                <div class="right"><h3>${pokemonId}. ${pokemon['name'].charAt(0).toUpperCase() + pokemon['name'].slice(1)}</h3>
                <h4 class="pokemon-info-type">Type: ${types}<h4/><div class="div-line"></div><p class="pokemon-info-moves">Moves: ${moves}</p>
                </div>`;
        });
    pokemonInfo.classList.add("visible");
}

/** This function closes the pokemon detailed information pop-up */
function closePokemonInfo() {
    let pokemonInfo = document.querySelector(".pokemon-info-container");
    // To delete the previous pokemon's details before opening a new pokemon info pop up
    pokemonInfo.querySelector(".pokemon-info-content").innerHTML = '';
    pokemonInfo.classList.remove("visible");
}

/** This function will close the pokemon info window when clicked outside the modal box */
window.addEventListener("click", function(e) {
    let pokemonInfo = document.querySelector(".pokemon-info-container");

    // Since the pokemon info container covers the entire window, if it is pressed
    // it's outside the pokemon info box, so it gets closed
    if (e.target == pokemonInfo) {
        closePokemonInfo();
    }
})

/** This function makes the string received by the API look better, more readable */
function prettifyStr(str) {
    // Capitalize the first letter of the string
    str = str.charAt(0).toUpperCase() + str.slice(1);
    // Replace dashes with spaces
    while (str.search('-') != -1) {
        str = str.replace('-', ' ');
    }
    return str;
}

/** This function returns a string with the weaknesses prettified. Input - pokemon type/s,
 * returns a string with the weaknesses.
 */
function getPokemonWeaknesses(types) {
    // Build an array of the pokemon's types
    let typeArr = types.split(', ');
    let weaknesses = ''; // Empty string of weaknesses
    let url = '';
    
    // For each type in types find the value of double_damage_taken from pokeAPI
    for (type in typeArr) {
        // Set the url to fetch
        url = `https://pokeapi.co/api/v2/type/${type}`;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                let weaknessList = data.damage_relation.double_damage_from;
                // iterate over the elements of the list
                for (i in weaknessList) {
                    console.log(weaknessList[i]);
                }
            });
    }
}

getPokemonWeaknesses('fire');

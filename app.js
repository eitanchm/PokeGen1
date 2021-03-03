/* Navbar functionality */

const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");

/* Toggle mobile menu */

function toggleMenu() {
    // Check if the menu is active right now
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        
        // Adds the menu hamburger icon back
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    }
    else {
        menu.classList.add("active");
        
        // Replaces hamburger icon with x icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}

/* Event listener */
toggle.addEventListener("click", toggleMenu, false);


/* Pokemon grid functionality */

const pokemonCard = document.querySelector(".pokemon-card");

/* Fill card with information and HTML */

function getPokemon() {
    
}
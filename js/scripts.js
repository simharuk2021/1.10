//This code creates a repository for holding all of the pokemon
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


/* The below code creates a function called add, which allows for the addition of a new pokemon using .push*/
  function add(pokemon) {
    if (
      typeof pokemon === "object"
       )
      {pokemonList.push(pokemon);
      }
      else {
        console.log("pokemon is not correct");
    }
  }

/*The below code creates a getAll function which returns pokemonList*/
  function getAll() {
    return pokemonList;
  }
/*this function recreates the list of Pokemon (including the added pokemon) as buttons.
These buttons are then added to the list of pokemon */
function addListItem (pokemon){
  let pokemonList = document.querySelector('.list-group');
  let listpokemon = document.createElement('li');
  listpokemon.classList.add('list-group', 'list-group-action')
  let button = document.createElement ('btn');
  button.innerText = pokemon.name;
  button.classList.add('button');
  button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
  pokemonList.appendChild(listpokemon);
  listpokemon.appendChild(button);
  button.addEventListener('click', function(){
    showDetails(pokemon)
  });
}

//loads the list of pokemon as JSON and loops through each item - the results of which are stored under name and detailsURL
function loadList() {
    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

/* this code creates a function which loads the details for each item(pokemon) within the URL */
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })

      .catch(function (e) {
        console.error(e);
      });
    }

/* this code creates a function which shows the details of the items within the modal */

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
  });
}

function showModal(item) {
  pokemonRepository.loadDetails(item)
.then(function(){
  let modalBody = $(".modal-body");
     let modalTitle = $(".modal-title");
     let modalHeader = $(".modal-header");

     //clear all modal content
     modalBody.empty();
     modalTitle.empty();

//creates a title element to access the pokemon name
  let titleElement = $('<h1>' + item.name  +'</h1>');

//creates a p element to display and access the pokemon types
  let contentElement = $('<p>' + item.types + '</p>');

//creates a function which accesses and loops through the various types for each pokemon and then displayes these as a string

//creates a p element which shows the height for each pokemon
  let heightElement = $('<p>' + item.height + '</p>');

//creates an image element to access the images for the pokemon
let pokemonImageElement = document.createElement('img');
pokemonImageElement.attr('src', item.imageUrl);

//appends the content to the modal for display
modalTitle.append(titleElement);
modalBody.append(contentElementTypes);
modalBody.append(heightElement);
modalBody.append(pokemonImageElement);
$('pokemonModal').modal('toggle');
})

let pokemonTypes = ''
pokemon.types.forEach(element=>{
  pokemonTypes = pokemonTypes + ' ' + element.type.name
});

/* the below code returns the add and getAll functions */
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails,

  };
}();
//This code adds a new pokemon to the list with the details listed as below
// console.log(pokemonRepository.getAll());
// pokemonRepository.add({name:'Lapras', height:"8.02", types:["Water Absorb", "Shell Armor"]});
//This code cycles through the list of all pokemon held within the repository



pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

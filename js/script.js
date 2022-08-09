const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const typeContainer = document.querySelector('#types');


let Shiny = 'front_default';

let searchPokemon = 1;


function button_shiny() {
  if (Shiny=='front_shiny'){
    Shiny='front_default'


  } else{Shiny='front_shiny'}
  //document.getElementById('button_shiny')
  renderPokemon(searchPokemon);
  }


const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);




  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);



  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][Shiny];
    divInnerHTML = '';
    data['types'].forEach((item, index) => {
      tipo = item['type']['name'];
      let imageUrl;
      switch (tipo) {
        case 'grass':
          imageUrl = 'https://cdn.discordapp.com/attachments/920027249279922256/1006357455523037265/folha_teste_bosta_testetamahnp1.png';
        break;
        case 'poison':
          imageUrl = 'https://th.bing.com/th/id/R.13e886cdfdf0af564d4f1b3c6875faa7?rik=rGWBDNUHsLwUSQ&riu=http%3a%2f%2fpixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com%2fimage%2f27faf2f6fee9b5a.png&ehk=hG7YkFH2w%2fDZtqXf1ySZ9copdTHxZR15x1dwj8POBmY%3d&risl=&pid=ImgRaw&r=0';
        break;
      }
      divInnerHTML += `<img class="type_image" src="${imageUrl}"/>`;
    });
    typeContainer.innerHTML = divInnerHTML;


    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
  }
  input.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    
    
  }
});


buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);

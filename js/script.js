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

  pokemonName.textContent = 'Loading...';
  pokemonNumber.textContent = '';

  const data = await fetchPokemon(pokemon);



  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][Shiny];
    divInnerHTML = '';
    data['types'].forEach((item, index) => {
      tipo = item['type']['name'];        
      let imageUrls = {
        grass: 'https://cdn.discordapp.com/attachments/905594842619469854/1006524004363939870/ghost.png',
        poison: 'https://cdn.discordapp.com/attachments/905594842619469854/1006527684010049596/ghost.png',
        water: 'https://cdn.discordapp.com/attachments/905594842619469854/1006526844985688185/ghost.png',
        fire: 'https://cdn.discordapp.com/attachments/905594842619469854/1006519390721802310/ghost.png',
        fairy: 'https://cdn.discordapp.com/attachments/905594842619469854/1006519717768462377/ghost.png',
        flying: 'https://cdn.discordapp.com/attachments/905594842619469854/1006519156855803925/ghost.png',
        ghost: 'https://cdn.discordapp.com/attachments/905594842619469854/1006518782107328592/ghost.png',
        electric: 'https://cdn.discordapp.com/attachments/905594842619469854/1006519920395304960/ghost.png',
        dragon: 'https://cdn.discordapp.com/attachments/905594842619469854/1006520957848010762/ghost.png',
        dark: 'https://cdn.discordapp.com/attachments/905594842619469854/1006522402114654218/ghost.png',
        bug: 'https://cdn.discordapp.com/attachments/905594842619469854/1006523209694322738/ghost.png',
        fight: 'https://cdn.discordapp.com/attachments/905594842619469854/1006523633914626088/ghost.png',
        ground: 'https://cdn.discordapp.com/attachments/905594842619469854/1006524320815775865/ghost.png',
        ice: 'https://cdn.discordapp.com/attachments/905594842619469854/1006524559899492422/ghost.png',
        normal: 'https://cdn.discordapp.com/attachments/905594842619469854/1006525048573661236/ghost.png',
        psychic: 'https://cdn.discordapp.com/attachments/905594842619469854/1006525946590941194/ghost.png',
        rock: 'https://cdn.discordapp.com/attachments/905594842619469854/1006526192914018417/ghost.png',
        steel: 'https://cdn.discordapp.com/attachments/905594842619469854/1006526676714410074/ghost.png', 
      }
      let imageUrl = imageUrls[tipo];
      divInnerHTML += `<img class="type_image" src="${imageUrl}"/>`;
    });
    typeContainer.innerHTML = divInnerHTML;
    

    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.textContent = 'Not found';
    pokemonNumber.textContent = '';
  }
  input.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);

buttonPrev.onclick = () => {
  var audio = new Audio("soundfile.wav");
  audio.play();
  if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
}

buttonNext.onclick = function() {
  var audio = new Audio("soundfile.wav");
  audio.play();
  searchPokemon += 1;
  renderPokemon(searchPokemon);
}



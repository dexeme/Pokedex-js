const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonStats = document.querySelector('.pokemon__stats');
const star = document.querySelector('.star');
const pokedex = document.querySelector('#pokedex');
const pokedexInfo = document.querySelector('#pokedexInfoPokemon');
const stats = document.querySelector('#stats');




const form = document.querySelector('.form');

const input = document.querySelector('.input__search');


const buttonShiny = document.querySelector('#up');
const buttonPrev = document.querySelector('#left');
const buttonNext = document.querySelector('#right');
const buttonInfo = document.querySelector('#down');
const typeContainer = document.querySelector('#types');

buttonShiny.addEventListener('click', buttonShiny); 


let Shiny = 'front_default';
let searchPokemon = 1;

pokedexInfo.style.display = 'none';
typeContainer.style.display = 'none';
stats.style.display = 'none';
star.style.display = 'none';





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
  
  stats.innerHTML = '';
  types.innerHTML = '';
  
  if (data) {
    pokedex.src = "./images/pokedex.png";
    pokemonImage.style.display = 'block';
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][Shiny];
    for (let i = 0; i < data['stats'].length; i++) {  
      stats.innerHTML += `<h1 class="statsContainer"> ${data['stats'][i]['base_stat']}</h1>`;
    }
    
    
    input.value = '';
    
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
        fighting: 'https://cdn.discordapp.com/attachments/905594842619469854/1006523633914626088/ghost.png',
        ground: 'https://cdn.discordapp.com/attachments/905594842619469854/1006524320815775865/ghost.png',
        ice: 'https://cdn.discordapp.com/attachments/905594842619469854/1006524559899492422/ghost.png',
        normal: 'https://cdn.discordapp.com/attachments/905594842619469854/1006525048573661236/ghost.png',
        psychic: 'https://cdn.discordapp.com/attachments/905594842619469854/1006525946590941194/ghost.png',
        rock: 'https://cdn.discordapp.com/attachments/905594842619469854/1006526192914018417/ghost.png',
        steel: 'https://cdn.discordapp.com/attachments/905594842619469854/1006526676714410074/ghost.png', 
      }
      let imageUrl = imageUrls[tipo];
      img = document.createElement('img');
      img.classList.add('type_image');
      img.src = imageUrl;
      
      typeContainer.appendChild(img);
      
      
    });
    
    
    searchPokemon = data.id;
    document.getElementById('#up').disabled = false;  
    
  } else {
    pokedex.src = "./images/pokedexERROR.png";
    pokemonImage.style.display = 'none';
    pokemonName.textContent = 'Not found';
    pokemonNumber.textContent = '';
    input.value = '';
    star.style.display = 'none';
    typeContainer.innerHTML = ''
    
    
    
    
    var audio = new Audio("./sounds/error.wav");
    audio.play();
    audio.volume = 0.2;
    
  }
  searchPokemon = 0; 
  document.getElementById('#up').disabled = true; 
  input.value = '';
  
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);




buttonPrev.onclick = function() {
  var audio = new Audio("./sounds/buttonPrev.wav");
  audio.play();
  audio.volume = 0.2;
  if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
}
buttonNext.onclick = function() {
  var audio = new Audio("./sounds/buttonNext.wav");
  audio.play();
  audio.volume = 0.2;
  searchPokemon += 1;
  renderPokemon(searchPokemon);
}

buttonShiny.onclick = function() {
  var audio = new Audio("./sounds/buttonShiny.wav");
  audio.play();
  audio.volume = 0.2;
  star.style.display = 'none';
  if (Shiny=='front_shiny'){
    Shiny='front_default'
    star.style.display = 'none';
  } else{
    Shiny='front_shiny'
    star.style.display = 'inherit';
  }

  renderPokemon(searchPokemon);
  
}

buttonInfo.onclick = function() {
  pokedexInfo.src = "./images/pokedexInfoPokemon.png";
  if (pokedexInfo.style.display == 'none'){
    var audio = new Audio("./sounds/openInfo.wav");
    audio.play();
    audio.volume = 0.2;
    pokedexInfo.src = "./images/pokedexInfoPokemon.png";  
    pokedexInfo.style.display = 'inherit';
    typeContainer.style.display = 'inherit';
    stats.style.display = '';
  } else{
    pokedexInfo.src = "./images/pokedexInfoPokemon.png";
    var audio = new Audio("./sounds/closeInfo.wav");
    audio.play();
    audio.volume = 0.2;
    pokedexInfo.style.display = 'none';
    typeContainer.style.display = 'none';
    stats.style.display = 'none';
  }
}

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
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006524004363939870/ghost.png';
        break;
        case 'poison':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006527684010049596/ghost.png';
        break;
        case 'water':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006526844985688185/ghost.png';
        break;
        case 'fire':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006519390721802310/ghost.png';
        break;
        case 'fairy':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006519717768462377/ghost.png';
        break;
        case 'flying':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006519156855803925/ghost.png';
        break;
        case 'ghost':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006518782107328592/ghost.png';
        break;
        case 'electric':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006519920395304960/ghost.png';
        break;
        case 'dragon':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006520957848010762/ghost.png';
        break;
        case 'dark':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006522402114654218/ghost.png';
        break;
        case 'bug':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006523209694322738/ghost.png';
        break;
        case 'fight':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006523633914626088/ghost.png';
        break;
        case 'ground':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006524320815775865/ghost.png';
        break;
        case 'ice':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006524559899492422/ghost.png';
        break;
        case 'normal':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006525048573661236/ghost.png';
        break;
        case 'psychic':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006525946590941194/ghost.png';
        break;
        case 'rock':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006526192914018417/ghost.png';
        break;
        case 'steel':
          imageUrl = 'https://cdn.discordapp.com/attachments/905594842619469854/1006526676714410074/ghost.png';
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



buttonNext.onclick = function() {
  var audio = new Audio("soundfile.wav");
  audio.play();
}



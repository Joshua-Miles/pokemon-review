const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
	.then(function(response){
		return response.json()
	})
	.then(function(trainers){
        trainers.forEach( function(trainer){
            root.append( 
                renderTrainerCard(trainer)
            )
        })
    })
    

const root = document.querySelector('main')

function c(tagName){
    return document.createElement(tagName)
}

function renderTrainerCard(trainer){
    const trainerDiv = c('div')
    trainerDiv.className = 'card'

    trainerDiv.append( 
        renderTrainerName(trainer),
        renderAddPokemonButton(trainer),
        renderPokemonList(trainer) 
    )

    return trainerDiv
}

function renderPokemonList(trainer){
    const pokemonList = c('ul')
    pokemonList.className = 'pokemon-list'
    pokemonList.setAttribute('data-trainer-id', trainer.id)
    trainer.pokemons.forEach(function(pokemon){
        let pokemonListItem = renderPokemonListItem(pokemon)
        pokemonList.append(pokemonListItem )
    })
    return pokemonList
}

function renderTrainerName(trainer){
    const trainerNameP = c('p')
    trainerNameP.append( trainer.name )
    return trainerNameP
}

function renderAddPokemonButton(trainer){
    const addPokemonButton = c('button')
    addPokemonButton.append('Add Pokemon')
    addPokemonButton.addEventListener('click', function(){
        addPokemon(trainer)
    }) 
    return addPokemonButton
}

function addPokemon(trainer){
    const pokemonList = document.querySelector(`[data-trainer-id='${trainer.id}']`)
    if(pokemonList.children.length >= 6){
        throw Error('Nah')
    }
    fetch(POKEMONS_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainer.id
        })
    })
        .then(function(response){
            return response.json()
        })
        .then(function(pokemon){
            let pokemonListItem = renderPokemonListItem(pokemon)
            pokemonList.append(pokemonListItem)
        })
}


function renderPokemonListItem(pokemon){
    const pokemonListItem = c('li')
    const releasePokemonButton = c('button')

    pokemonListItem.append( 
        `${pokemon.nickname} (${pokemon.species})`, 
        releasePokemonButton 
    )
    
    releasePokemonButton.append( 'Release' )
    releasePokemonButton.className = 'release'

    releasePokemonButton.addEventListener('click', function(){
        fetch(`${POKEMONS_URL}/${pokemon.id}`,{
            method: 'DELETE'
        })
            .then(function(response){
                return response.json()
            })
            .then(function(pokemon){
                pokemonListItem.remove()
            })
    })

    return pokemonListItem
}
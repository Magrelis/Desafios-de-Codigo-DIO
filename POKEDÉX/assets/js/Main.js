
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMoreButton')
const DetailButton = document.getElementById('DetailButton')
const MaxRecords = 905;
const limit = 20;
let offset = 0;


function LoadPokemonItens(offset, limit) {
    pokeApi.GetPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `

            
             <li class="pokemon ${pokemon.type}">
             <span class="number">#${pokemon.numero}</span>
             <span class="name">${pokemon.name}</span>
        
             <div class="detail">
                 <ol class="types">
                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        
                 </ol>
        
                 <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
             </div>
           </li>
        
        `).join('')
        pokemonList.innerHTML += newHtml

    })

}

LoadPokemonItens(offset, limit)

LoadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= MaxRecords) {

        const newLimit = MaxRecords - offset
        LoadPokemonItens(offset, newLimit)

        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    } else {

        LoadPokemonItens(offset, limit)

    }

})


function LoadPokemonDetail(limit)
{
    
    const Durl = `https://pokeapi.co/api/v2/move/${limit}`
    fetch(Durl)
        .then((response) => response.json())
        console.log(Durl)
}

 LoadPokemonDetail(limit)

 DetailButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= MaxRecords) {

        const newLimit = MaxRecords - offset
        LoadPokemonDetail(offset, newLimit)
        console.log(LoadPokemonDetail(newLimit))

        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    } else {

        LoadPokemonDetail(offset, limit)
      

    }

})


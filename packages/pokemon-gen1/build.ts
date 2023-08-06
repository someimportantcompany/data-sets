import axios from 'axios';

async function fetchData() {
  const res = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    query: /* GraphQL */`
      query {
        pokemon: pokemon_v2_pokemonspecies(where: {
          pokemon_v2_generation: {
            name: { _eq: "generation-i" },
          },
        }, order_by: { id: asc }) {
          id
          name
        }
      }
    `,
  });
}

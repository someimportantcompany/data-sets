# @data-sets/pokemon

Static data-set of Gen 1 Pokemon (Kanto, #001-#151), with lookup methods for convenience.

## Install

```bash
npm install @data-sets/pokemon
# or
pnpm add @data-sets/pokemon
```

## Usage

```js
import { data, findById, findByName, findByType } from '@data-sets/pokemon';

// Find a Pokemon by Pokedex number
const bulbasaur = findById(1);
// { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], ... }

// Find a Pokemon by name (case-insensitive)
const pikachu = findByName('pikachu');
// { id: 25, name: 'Pikachu', types: ['Electric'], ... }

// Find all Pokemon of a given type
const fireTypes = findByType('Fire');
// [ { name: 'Charmander', ... }, { name: 'Charmeleon', ... }, ... ]
```

A default export is also available:

```js
import pokemon from '@data-sets/pokemon';

pokemon.findById(150);
```

## Data Shape

Each record has the following shape:

```ts
type PokemonType =
  | 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug'
  | 'Rock' | 'Ghost' | 'Dragon' | 'Fairy';

type PokemonRecord = {
  id: number;             // Pokedex number (1-151)
  name: string;
  types: PokemonType[];   // 1-2 types
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    speed: number;
  };
  height: number;         // Metres
  weight: number;         // Kilograms
  generation: number;     // Always 1
  category: string;       // e.g. "Seed Pokemon"
  description: string;
  evolvesFrom: number | null;
  evolvesTo: number[];
};
```

## Raw Data

You can also import the raw JSON directly:

```js
import data from '@data-sets/pokemon/data.json';
```

## License

MIT

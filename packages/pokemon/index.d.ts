export type PokemonType =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Grass'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Fairy';

export type BaseStats = {
  hp: number;
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

export type PokemonRecord = {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: BaseStats;
  height: number;
  weight: number;
  generation: number;
  category: string;
  description: string;
  evolvesFrom: number | null;
  evolvesTo: number[];
};

export const data: PokemonRecord[];

export function findById(id: number): PokemonRecord | undefined;
export function findByName(name: string): PokemonRecord | undefined;
export function findByType(type: PokemonType): PokemonRecord[];

declare const pokemon: {
  data: PokemonRecord[];
  findById: typeof findById;
  findByName: typeof findByName;
  findByType: typeof findByType;
};
export default pokemon;

import { describe, it, expect } from 'vitest';
import pokemon, { data, findById, findByName, findByType } from './index.js';
import type { PokemonRecord } from './index.d.ts';

describe('@data-sets/pokemon', () => {
  describe('data', () => {
    it('should export 151 records', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(151);
    });

    it('should have valid records', () => {
      for (const record of data) {
        expect(record).toSatisfy(
          (r) =>
            typeof r.id === 'number' &&
            r.id >= 1 &&
            r.id <= 151 &&
            typeof r.name === 'string' &&
            Array.isArray(r.types) &&
            r.types.length >= 1 &&
            r.types.length <= 2 &&
            typeof r.baseStats.hp === 'number' &&
            typeof r.baseStats.atk === 'number' &&
            typeof r.baseStats.def === 'number' &&
            typeof r.baseStats.spAtk === 'number' &&
            typeof r.baseStats.spDef === 'number' &&
            typeof r.baseStats.speed === 'number' &&
            typeof r.height === 'number' &&
            typeof r.weight === 'number' &&
            r.generation === 1 &&
            typeof r.category === 'string' &&
            typeof r.description === 'string' &&
            (r.evolvesFrom === null || typeof r.evolvesFrom === 'number') &&
            Array.isArray(r.evolvesTo),
        );
      }
    });

    it('should be sorted by id', () => {
      for (let i = 1; i < data.length; i++) {
        expect(data[i].id).toBeGreaterThan(data[i - 1].id);
      }
    });
  });

  describe('findById', () => {
    it('should find Bulbasaur by id 1', () => {
      const bulbasaur = findById(1);
      expect(bulbasaur).toBeDefined();
      expect(bulbasaur!.name).toBe('Bulbasaur');
      expect(bulbasaur!.types).toEqual(['Grass', 'Poison']);
    });

    it('should find Mew by id 151', () => {
      const mew = findById(151);
      expect(mew).toBeDefined();
      expect(mew!.name).toBe('Mew');
    });

    it('should return undefined for id 0', () => {
      expect(findById(0)).toBeUndefined();
    });

    it('should return undefined for id 152', () => {
      expect(findById(152)).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('should find Pikachu', () => {
      const pikachu = findByName('Pikachu');
      expect(pikachu).toBeDefined();
      expect(pikachu!.id).toBe(25);
      expect(pikachu!.types).toEqual(['Electric']);
    });

    it('should be case-insensitive', () => {
      const charizard = findByName('CHARIZARD');
      expect(charizard).toBeDefined();
      expect(charizard!.id).toBe(6);
    });

    it('should return undefined for unknown name', () => {
      expect(findByName('Agumon')).toBeUndefined();
    });
  });

  describe('findByType', () => {
    it('should find Fire types', () => {
      const fireTypes = findByType('Fire');
      expect(Array.isArray(fireTypes)).toBe(true);
      expect(fireTypes.length).toBeGreaterThan(0);
      for (const record of fireTypes) {
        expect(record.types).toContain('Fire');
      }
    });

    it('should return empty array for unknown type', () => {
      const result = findByType('Cosmic' as never);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('default export', () => {
    it('should have all named exports', () => {
      expect(pokemon.data).toBe(data);
      expect(pokemon.findById).toBe(findById);
      expect(pokemon.findByName).toBe(findByName);
      expect(pokemon.findByType).toBe(findByType);
    });
  });
});

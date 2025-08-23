'use server';

/**
 * @fileOverview Simulates Pokemon availability with a random chance.
 *
 * - simulatePokemonAvailability - A function that determines if a Pokemon is found or not.
 * - SimulatePokemonAvailabilityInput - The input type for the simulatePokemonAvailability function.
 * - SimulatePokemonAvailabilityOutput - The return type for the simulatePokemonAvailability function.
 */

import {z} from 'zod';

const SimulatePokemonAvailabilityInputSchema = z.object({
  pokemonName: z.string().describe('The name of the Pokemon to check availability for.'),
  pokemonId: z.number().describe('The ID of the Pokemon to check availability for.'),
});
export type SimulatePokemonAvailabilityInput = z.infer<typeof SimulatePokemonAvailabilityInputSchema>;

const SimulatePokemonAvailabilityOutputSchema = z.object({
  isFound: z.boolean().describe('Whether the Pokemon is found or not.'),
  message: z.string().describe('A message indicating the Pokemon availability.'),
});
export type SimulatePokemonAvailabilityOutput = z.infer<typeof SimulatePokemonAvailabilityOutputSchema>;

export async function simulatePokemonAvailability(input: SimulatePokemonAvailabilityInput): Promise<SimulatePokemonAvailabilityOutput> {
    SimulatePokemonAvailabilityInputSchema.parse(input);
    const isFound = input.pokemonId === 1;
    return Promise.resolve({
      isFound,
      message: isFound ? 'Founded' : 'Not Found',
    });
}

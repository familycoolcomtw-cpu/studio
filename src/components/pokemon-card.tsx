import Image from 'next/image';
import { simulatePokemonAvailability } from '@/ai/flows/simulate-pokemon-availability';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Pokemon } from '@/lib/pokemon';
import { MapPin } from 'lucide-react';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const formatDexNumber = (id: number) => `#${String(id).padStart(3, '0')}`;

export async function PokemonCard({ pokemon }: PokemonCardProps) {
  const availability = await simulatePokemonAvailability({ pokemonName: pokemon.name });
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold capitalize">{pokemon.name}</CardTitle>
          <CardDescription className="text-lg font-mono text-muted-foreground">{formatDexNumber(pokemon.id)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 flex-grow">
        <div className="relative w-48 h-48 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
          {availability.isFound ? (
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={300}
              height={300}
              className="object-contain"
              data-ai-hint="pokemon image"
            />
          ) : (
            <>
              <Image
                src={imageUrl}
                alt={pokemon.name}
                width={300}
                height={300}
                className="object-contain filter grayscale brightness-[30%] opacity-40"
                data-ai-hint="pokemon silhouette"
              />
              <span className="absolute text-8xl font-black text-card/50 select-none">?</span>
            </>
          )}
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>立農國小第1代</span>
          </div>
          
          <Badge className="w-full justify-center py-2 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 border-accent-foreground/20 border">
            {availability.message}
          </Badge>
          
        </div>
      </CardContent>
    </Card>
  );
}

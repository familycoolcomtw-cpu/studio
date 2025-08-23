'use client';

import { simulatePokemonAvailability } from '@/ai/flows/simulate-pokemon-availability';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Pokemon } from '@/lib/pokemon';
import { cn } from '@/lib/utils';
import { MapPin, User, Loader } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const formatDexNumber = (id: number) => String(id).padStart(3, '0');

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [availability, setAvailability] = useState<{ isFound: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const greenLightPokemonIds = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 24, 28, 31, 32, 33, 41, 45, 75, 86, 91, 92, 95];

  useEffect(() => {
    async function checkAvailability() {
      if (greenLightPokemonIds.includes(pokemon.id)) {
        setAvailability({ isFound: true, message: 'Founded' });
      } else {
        const result = await simulatePokemonAvailability({ pokemonName: pokemon.name, pokemonId: pokemon.id });
        setAvailability(result);
      }
    }

    const timer = setTimeout(() => {
      checkAvailability();
      setIsLoading(false);
    }, 1000); // Simulate loading for 1 second

    return () => clearTimeout(timer);
  }, [pokemon.id, pokemon.name]);

  if (isLoading) {
    return (
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold capitalize">{pokemon.name}</CardTitle>
            <CardDescription className="text-lg font-mono text-muted-foreground">{formatDexNumber(pokemon.id)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 flex-grow">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader className="w-6 h-6 animate-spin" />
            <span>載入中...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isGushijie = pokemon.id === 1;
  const isFound = availability?.isFound;
  const message = availability?.message || 'Not Found';
  
  const colorfulBgPokemonIds = [2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 24, 28, 31, 32, 33, 41, 45, 75, 86, 91, 92, 95];
  const isColorful = colorfulBgPokemonIds.includes(pokemon.id);
  const colors: { [key: number]: string } = {
    2: 'bg-[#48D1CC]',
    3: 'bg-[#FF4500]',
    4: 'bg-[#006400]',
    5: 'bg-[#1E90FF]',
    8: 'bg-[#00FFFF]',
    9: 'bg-[#008B8B]',
    10: 'bg-[#FFD700]',
    11: 'bg-[#32CD32]',
    12: 'bg-[#FF69B4]',
    15: 'bg-[#8A2BE2]',
    16: 'bg-[#A52A2A]',
    24: 'bg-[#BA55D3]',
    28: 'bg-[#6A5ACD]',
    31: 'bg-[#DEB887]',
    32: 'bg-[#F0E68C]',
    33: 'bg-[#7FFF00]',
    41: 'bg-[#D2691E]',
    45: 'bg-[#FF7F50]',
    75: 'bg-[#6495ED]',
    86: 'bg-teal-500',
    91: 'bg-orange-500',
    92: 'bg-red-500',
    95: 'bg-blue-500'
  };
  const colorClass = isColorful ? colors[pokemon.id] : '';

  return (
    <Card className={cn(
      "transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col bg-card/80 backdrop-blur-sm"
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold capitalize">{pokemon.name}</CardTitle>
          <CardDescription className="text-lg font-mono text-muted-foreground">{formatDexNumber(pokemon.id)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 flex-grow">
        <div 
          className={cn(
            "relative w-48 h-48 rounded-lg flex flex-col items-center justify-center overflow-hidden text-center",
            isGushijie ? "bg-[#00BFFF]" : "bg-muted/30",
            isColorful && colorClass
          )}
        >
            {isGushijie ? (
              <User className="w-24 h-24 text-white" />
            ) : isColorful ? (
              <User className="w-24 h-24 text-white" />
            ) : (
              <span className="text-5xl font-bold text-muted-foreground">{formatDexNumber(pokemon.id)}</span>
            )}
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>立農國小第1代</span>
          </div>
          
          <Badge className={cn("w-full justify-center py-2 text-base font-semibold border", 
            isFound ? "bg-green-500/90 text-primary-foreground hover:bg-green-500/80" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          )}>
            {message}
          </Badge>
          
        </div>
      </CardContent>
    </Card>
  );
}

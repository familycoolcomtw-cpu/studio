'use client';

import { simulatePokemonAvailability } from '@/ai/flows/simulate-pokemon-availability';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Pokemon } from '@/lib/pokemon';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const formatDexNumber = (id: number) => String(id).padStart(3, '0');

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [availability, setAvailability] = useState<{ isFound: boolean; message: string } | null>(null);

  useEffect(() => {
    async function checkAvailability() {
      const result = await simulatePokemonAvailability({ pokemonName: pokemon.name });
      setAvailability(result);
    }
    if (pokemon.id !== 1) {
      checkAvailability();
    }
  }, [pokemon.id, pokemon.name]);

  const isGushijie = pokemon.id === 1;
  const isFound = isGushijie || (availability?.isFound ?? false);
  const message = isGushijie ? 'Founded' : (availability?.message ?? '...');
  
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
            {isGushijie ? (
              <Image
                src="https://photos.fife.usercontent.google.com/pw/AP1GczPpABl-VddVT1JHwdI8y4c3rzfJkm9IiFYCBKQKGdqTxJL9jiJOMJQ=w685-h913-s-no-gm?authuser=0"
                alt="顧士傑"
                width={300}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint="person photo"
              />
            ) : (
              <span className="text-5xl font-bold text-muted-foreground">{formatDexNumber(pokemon.id)}</span>
            )}
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>立農國小第1代</span>
          </div>
          
          {isGushijie || availability ? (
            <Badge className={cn("w-full justify-center py-2 text-base font-semibold border", 
              isFound ? "bg-green-500/90 text-primary-foreground hover:bg-green-500/80" : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}>
              {message}
            </Badge>
          ) : (
            <div className="h-9 w-full animate-pulse rounded-full bg-muted" />
          )}
          
        </div>
      </CardContent>
    </Card>
  );
}

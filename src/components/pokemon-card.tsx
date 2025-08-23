'use client';

import { simulatePokemonAvailability } from '@/ai/flows/simulate-pokemon-availability';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Pokemon } from '@/lib/pokemon';
import { cn } from '@/lib/utils';
import { MapPin, User, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

type PokemonCardProps = {
  pokemon: Pokemon;
};

const formatDexNumber = (id: number) => String(id).padStart(3, '0');

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [availability, setAvailability] = useState<{ isFound: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAvailability() {
      if (pokemon.id === 1) {
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
  const isFound = isGushijie || (availability?.isFound && pokemon.id !== 1 ? false : availability?.isFound);
  const message = isGushijie ? 'Founded' : (availability?.message || 'Not Found');
  
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
            isGushijie ? "bg-[#00BFFF]" : "bg-muted/30"
          )}
        >
            {isGushijie ? (
              <>
                <User className="w-24 h-24 text-white" />
                <div className="mt-2 text-xs text-white">
                  <p>無法顯示影像</p>
                  <p>原因: 需要購買firebase儲存空間後再試</p>
                </div>
              </>
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

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
  const [availability, setAvailability] = useState<{ status: 'found' | 'not-found' | 'looked', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const greenLightPokemonIds = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 24, 28, 31, 32, 33, 35, 41, 45, 75, 80, 86, 91, 92, 95, 206, 208, 263, 450, 826, 845, 846, 848, 849, 853, 857, 859, 875, 876, 877, 878, 879, 880, 913, 914, 921, 924, 941, 942, 947, 948, 965, 967, 968, 971, 972, 973, 975, 976, 977, 978, 998, 1000];
  const yellowLightPokemonIds = [44, 57, 58, 62, 68, 69, 70, 79, 84, 85, 116, 157, 176, 183, 187, 217, 222];

  useEffect(() => {
    async function checkAvailability() {
      if (greenLightPokemonIds.includes(pokemon.id)) {
        setAvailability({ status: 'found', message: '已找到' });
      } else if (yellowLightPokemonIds.includes(pokemon.id)) {
        setAvailability({ status: 'looked', message: '已目擊' });
      } else {
        const result = await simulatePokemonAvailability({ pokemonName: pokemon.name, pokemonId: pokemon.id });
        setAvailability({ status: result.isFound ? 'found' : 'not-found', message: result.message });
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
  const status = availability?.status;
  const message = availability?.message || '未找到';
  
  const colorfulBgPokemonIds = [2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 24, 28, 31, 32, 33, 35, 41, 45, 75, 80, 86, 91, 92, 95, 206, 208, 263, 450, 826, 845, 846, 848, 849, 853, 857, 859, 875, 876, 877, 878, 879, 880, 913, 914, 921, 924, 941, 942, 947, 948, 965, 967, 968, 971, 972, 973, 975, 976, 977, 978, 998, 1000];
  const isColorful = colorfulBgPokemonIds.includes(pokemon.id);
  const showUserIcon = yellowLightPokemonIds.includes(pokemon.id) || greenLightPokemonIds.includes(pokemon.id);
  const showUserIconWithoutBg = yellowLightPokemonIds.includes(pokemon.id);

  const colors: { [key: number]: string } = {
    2: 'bg-[#48D1CC]',
    3: 'bg-[#FF4500]',
    4: 'bg-[#006400]',
    5: 'bg-[#1E90FF]',
    8: 'bg-[#00FFFF]',
    9: 'bg-[#008B8B]',
    10: 'bg-[#FF69B4]',
    11: 'bg-[#32CD32]',
    12: 'bg-[#4169E1]',
    15: 'bg-[#00FF00]',
    16: 'bg-[#EE82EE]',
    24: 'bg-[#BA55D3]',
    28: 'bg-[#6A5ACD]',
    31: 'bg-[#DEB887]',
    32: 'bg-[#FFD700]',
    33: 'bg-[#ADFF2F]',
    35: 'bg-purple-500',
    41: 'bg-[#00008B]',
    45: 'bg-[#FF7F50]',
    75: 'bg-[#6495ED]',
    80: 'bg-pink-500',
    86: 'bg-teal-500',
    91: 'bg-orange-500',
    92: 'bg-red-500',
    95: 'bg-blue-500',
    206: 'bg-lime-500',
    208: 'bg-cyan-500',
    263: 'bg-emerald-500',
    450: 'bg-amber-500',
    826: 'bg-yellow-600',
    845: 'bg-red-400',
    846: 'bg-orange-400',
    848: 'bg-yellow-400',
    849: 'bg-lime-400',
    853: 'bg-yellow-500',
    857: 'bg-green-400',
    859: 'bg-teal-400',
    875: 'bg-cyan-400',
    876: 'bg-sky-400',
    877: 'bg-blue-400',
    878: 'bg-indigo-400',
    879: 'bg-purple-400',
    880: 'bg-fuchsia-400',
    913: 'bg-pink-400',
    914: 'bg-rose-400',
    921: 'bg-red-500',
    924: 'bg-orange-500',
    941: 'bg-yellow-500',
    942: 'bg-lime-500',
    947: 'bg-green-500',
    948: 'bg-teal-500',
    965: 'bg-cyan-500',
    967: 'bg-sky-500',
    968: 'bg-blue-500',
    971: 'bg-indigo-500',
    972: 'bg-purple-500',
    973: 'bg-fuchsia-500',
    975: 'bg-pink-500',
    976: 'bg-rose-500',
    977: 'bg-red-600',
    978: 'bg-orange-600',
    998: 'bg-yellow-600',
    1000: 'bg-lime-600',
  };
  const colorClass = isColorful ? colors[pokemon.id] : '';

  const getGenerationTag = (id: number) => {
    if (id >= 1 && id <= 100) return '立農國小第1代';
    if (id >= 101 && id <= 240) return '立農國小第2代';
    if (id >= 241 && id <= 391) return '立農國小第3代';
    if (id >= 392 && id <= 540) return '立農國小第4代';
    if (id >= 541 && id <= 640) return '百齡國中第5代';
    if (id >= 641 && id <= 720) return '百齡國中第6代';
    if (id >= 721 && id <= 840) return '百齡國中第7代';
    if (id >= 841 && id <= 1000) return '五常國中第8代';
    return '';
  };

  return (
    <Card className={cn(
      "transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col bg-card/80 backdrop-blur-sm h-full"
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
            showUserIconWithoutBg ? "" : (isGushijie ? "bg-[#00BFFF]" : "bg-muted/30"),
            isColorful && colorClass
          )}
        >
            {showUserIcon ? (
              <User className={cn("w-24 h-24", showUserIconWithoutBg ? "text-foreground" : "text-white")} />
            ) : (
              <span className="text-5xl font-bold text-muted-foreground">{formatDexNumber(pokemon.id)}</span>
            )}
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto pt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{getGenerationTag(pokemon.id)}</span>
          </div>
          
          <Badge className={cn("w-full justify-center py-2 text-base font-semibold border", 
            status === 'found' ? "bg-green-500/90 text-primary-foreground hover:bg-green-500/80" : 
            status === 'looked' ? "bg-yellow-500/90 text-primary-foreground hover:bg-yellow-500/80" : 
            "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          )}>
            {message}
          </Badge>
          
        </div>
      </CardContent>
    </Card>
  );
}

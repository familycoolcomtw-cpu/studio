import { generation1 } from '@/lib/pokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { PokeTrackerLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, CheckCircle, Eye } from 'lucide-react';

export default function Home() {
  const greenLightPokemonIds = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 24, 28, 31, 32, 33, 35, 41, 45, 75, 80, 86, 91, 92, 95, 206, 208, 263, 450];
  const yellowLightPokemonIds = [44, 57, 58, 62, 68, 69, 70, 79, 84, 85];

  const foundCount = greenLightPokemonIds.length;
  const lookedCount = yellowLightPokemonIds.length;
  const totalLookedCount = foundCount + lookedCount;

  return (
    <div className="min-h-screen bg-background text-foreground" id="page-top">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4 px-4 shadow-md">
        <div className="flex justify-center items-center gap-4 mb-4">
          <PokeTrackerLogo className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold font-headline text-primary">家庭圖鑑</h1>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-4">
            <a href="#pokemon-1">
              <Button variant="outline" size="sm" className="text-sm bg-accent text-accent-foreground hover:bg-accent/90">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                立農國小第1代
              </Button>
            </a>
            <a href="#pokemon-101">
              <Button variant="outline" size="sm" className="text-sm bg-accent text-accent-foreground hover:bg-accent/90">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                立農國小第2代
              </Button>
            </a>
            <a href="#pokemon-241">
              <Button variant="outline" size="sm" className="text-sm bg-accent text-accent-foreground hover:bg-accent/90">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                立農國小第3代
              </Button>
            </a>
            <a href="#pokemon-392">
              <Button variant="outline" size="sm" className="text-sm bg-accent text-accent-foreground hover:bg-accent/90">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                立農國小第4代
              </Button>
            </a>
        </div>
        <div className="flex justify-center items-center gap-6 mt-4 text-lg">
          <div className="flex items-center gap-2 text-green-500 font-semibold">
            <CheckCircle className="h-6 w-6" />
            <span>已找到: {foundCount}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-500 font-semibold">
            <Eye className="h-6 w-6" />
            <span>已目擊: {totalLookedCount}</span>
          </div>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {generation1.map((pokemon) => (
            <div key={pokemon.id} id={`pokemon-${pokemon.id}`} className="scroll-mt-48">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>看完所有的內容，稍後會在發行新一代的圖鑑</p>
      </footer>
    </div>
  );
}

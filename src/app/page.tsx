import { generation1 } from '@/lib/pokemon';
import { PokemonCard } from '@/components/pokemon-card';
import { PokeTrackerLogo } from '@/components/logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 px-4 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          <PokeTrackerLogo className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold font-headline text-primary">PokeTracker</h1>
        </div>
        <p className="text-lg text-muted-foreground">Generation 1: 立農國小第1代</p>
      </header>
      <main className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {generation1.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>看完所有的內容，稍後會在發行新一代的圖鑑</p>
      </footer>
    </div>
  );
}

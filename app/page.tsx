import BingoMachine from './components/BingoMachine';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-center text-3xl font-bold my-8">
        ビンゴゲーム
      </h1>
      <BingoMachine />
    </main>
  );
}

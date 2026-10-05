'use client';
export default function Error({error}:{error:Error}){return <main className="grid min-h-screen place-items-center p-8"><h1 className="text-2xl">Something went wrong</h1><p className="mt-2 text-zinc-400">{error.message}</p></main>}

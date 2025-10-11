import Image from 'next/image';
import heroImg from '../assets/hero2.svg'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className='font-medium text-2xl mb-2 text-slate-600'>Gerencie sua empresa</h2>
      <h1 className='font-bold text-3xl mb-8 text-blue-600'>Atendimentos, clientes</h1>
      <Image 
        src={heroImg} 
        width={600} 
        alt='Hero da página' 
        className='max-w-sm md:max-xl mt-20'
      />
    </main>
  );
}

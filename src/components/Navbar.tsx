import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">ITSolution</h1>
        <div className="hidden space-x-8 md:flex">
          <Link href="#services" className="hover:text-accent">Services</Link>
          <Link href="#projects" className="hover:text-accent">Projects</Link>
          <Link href="#contact" className="rounded-lg bg-accent px-4 py-2 text-primary">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
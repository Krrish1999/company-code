import { services } from "../../data/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary text-white">
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold">Transform Your Business with Modern IT</h1>
        <p className="mt-4 text-xl text-gray-300">Enterprise-grade solutions for scalability and security.</p>
        <button className="mt-8 rounded-full bg-accent px-8 py-3 text-lg font-semibold text-primary">Schedule Demo</button>
      </section>
      <section className="container mx-auto px-6 py-20">
       <h2 className="mb-16 text-center text-4xl font-bold">Our Services</h2>
       <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-gray-800 bg-primary p-8">
              <h3 className="mb-4 text-xl font-bold">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Add other sections here */}
    </main>
  );
}
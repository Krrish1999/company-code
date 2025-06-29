'use client';

import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The Open Company transformed my career trajectory. I joined as a student and left with real-world experience, a strong network, and the confidence to tackle any project.",
    author: "Sarah Chen",
    role: "Full Stack Developer",
    company: "TechCorp",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    quote: "Working on open-source projects here gave me the practical skills I couldn't learn in school. The mentorship and collaboration opportunities are incredible.",
    author: "Marcus Johnson",
    role: "Software Engineer",
    company: "InnovateLab",
    rating: 5,
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    quote: "As a fresh graduate, I was nervous about entering the tech industry. The Open Company provided the support, experience, and connections I needed to succeed.",
    author: "Priya Patel",
    role: "Frontend Developer",
    company: "DesignHub",
    rating: 5,
    image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

const metrics = [
  { number: "50+", label: "Projects Completed", description: "Successfully delivered projects across various technologies" },
  { number: "200+", label: "Volunteers Onboarded", description: "Developers, students, and freshers who've grown with us" },
  { number: "15+", label: "Partner Organizations", description: "Collaborating with nonprofits and social enterprises" },
  { number: "95%", label: "Success Rate", description: "Volunteers who advance their careers after participating" }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-6">
        {/* Impact Metrics */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6 animate-fade-in-up">
            Our Impact
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200">
            Real numbers that showcase the meaningful change we're creating together
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl font-space font-bold text-accent mb-2">
                  {metric.number}
                </div>
                <div className="text-xl font-space font-semibold text-white mb-2">
                  {metric.label}
                </div>
                <div className="text-secondary">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-space font-bold text-white text-center mb-12 animate-fade-in-up">
            What Our Community Says
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="bg-primary rounded-xl p-6 border-l-4 border-accent card-hover animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 200}ms` }}
                role="region"
                aria-label={`Testimonial by ${testimonial.author}`}
              >
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-accent mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-white leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.author} profile`}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-space font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-secondary text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { Laptop, Users, Brain, Target, Heart, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Laptop,
    title: "Real Projects",
    description: "Work on meaningful projects that make a real impact in communities and businesses worldwide."
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with like-minded developers, mentors, and industry professionals to grow your network."
  },
  {
    icon: Brain,
    title: "Skill Growth",
    description: "Enhance your technical skills while learning from experienced developers and gaining practical experience."
  },
  {
    icon: Target,
    title: "Career Focus",
    description: "Build a portfolio of real-world projects that showcase your abilities to potential employers."
  },
  {
    icon: Heart,
    title: "Social Impact",
    description: "Contribute to causes you care about while making a positive difference in the world."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Explore cutting-edge technologies and innovative solutions in a collaborative environment."
  }
];

export default function OverviewSection() {
  return (
    <section id="about" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-space font-bold text-white mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            The Open Company is a nonprofit organization uniting developers, students, 
            and freshers to work on impactful projects while fostering learning, 
            professional growth, and meaningful connections in the tech community.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card rounded-2xl p-8 md:p-12 mb-16 animate-fade-in-up delay-200">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-space font-bold text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-secondary leading-relaxed max-w-4xl mx-auto">
              We believe that everyone deserves the opportunity to grow, learn, and make a difference. 
              Through collaborative open-source projects, mentorship programs, and community building, 
              we're creating a more inclusive and impactful tech ecosystem where innovation thrives 
              and meaningful change happens.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-card rounded-xl p-6 card-hover animate-fade-in-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
              role="region"
              aria-label={`Benefit: ${benefit.title}`}
            >
              <div className="flex items-center mb-4">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-space font-bold text-white">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up delay-1000">
          <button className="btn-primary text-lg px-8 py-4">
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
}
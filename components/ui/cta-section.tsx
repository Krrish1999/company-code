'use client';

import { ArrowRight, Mail, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-card to-accent/20">
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-space font-bold text-white mb-6 leading-tight">
            Ready to Make a{' '}
            <span className="text-accent">Difference?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our community of passionate developers, contribute to meaningful projects, 
            and accelerate your career while making a positive impact on the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4 shadow-lg">
              <Mail className="w-5 h-5" />
              Join Now
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-card/50 glassmorphism rounded-2xl p-8 max-w-2xl mx-auto animate-fade-in-up delay-400">
            <h3 className="text-2xl font-space font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-secondary mb-6">
              Get the latest updates on projects, events, and opportunities
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-primary border border-accent/20 text-white placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-secondary/80 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
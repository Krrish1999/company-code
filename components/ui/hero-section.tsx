'use client';

import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient">
        <div className="absolute inset-0 bg-primary/50"></div>
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-space font-bold text-white mb-6 leading-tight">
            Empowering Developers,{' '}
            <span className="text-accent">Transforming</span>{' '}
            Communities
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Join a community of tech enthusiasts building real-world solutions 
            and creating opportunities for growth through collaboration and learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Get Involved
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="animate-fade-in-up delay-200">
              <div className="text-4xl font-space font-bold text-accent mb-2">50+</div>
              <div className="text-secondary">Projects Completed</div>
            </div>
            <div className="animate-fade-in-up delay-400">
              <div className="text-4xl font-space font-bold text-accent mb-2">200+</div>
              <div className="text-secondary">Volunteers Onboarded</div>
            </div>
            <div className="animate-fade-in-up delay-600">
              <div className="text-4xl font-space font-bold text-accent mb-2">15+</div>
              <div className="text-secondary">Partner Organizations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-accent/30 rounded-full">
          <div className="w-1 h-8 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
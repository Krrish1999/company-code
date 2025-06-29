'use client';

import { Code, Mail, Twitter, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#volunteer', label: 'Volunteer' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Github, label: 'GitHub' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-card border-t border-accent/20" role="contentinfo">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-8 h-8 text-accent" />
              <span className="text-2xl font-space font-bold text-white">
                The Open Company
              </span>
            </div>
            <p className="text-secondary leading-relaxed mb-6 max-w-md">
              Empowering developers, students, and freshers to create meaningful 
              impact through collaborative open-source projects and community building.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-primary p-3 rounded-lg hover:bg-accent transition-colors duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-secondary group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-space font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary hover:text-accent transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-space font-bold text-white mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@theopencompany.co"
                className="flex items-center text-secondary hover:text-accent transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                contact@theopencompany.co
              </a>
              <div className="text-secondary">
                <p>Building a better future,</p>
                <p>one project at a time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary text-center md:text-left mb-4 md:mb-0">
              © {currentYear} The Open Company. Made with{' '}
              <Heart className="w-4 h-4 inline text-accent" />{' '}
              for the developer community.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-secondary hover:text-accent transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary hover:text-accent transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-secondary hover:text-accent transition-colors duration-200">
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
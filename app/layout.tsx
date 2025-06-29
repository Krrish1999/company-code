import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Oswald, Great_Vibes } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const greatVibes = Great_Vibes({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Open Company - Empowering Developers, Transforming Communities',
  description: 'Join a community of tech enthusiasts building real-world solutions and creating opportunities for growth. Nonprofit uniting developers, students, and freshers.',
  keywords: 'nonprofit, developers, open source, volunteering, tech community, students, freshers',
  authors: [{ name: 'The Open Company' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'The Open Company - Empowering Developers, Transforming Communities',
    description: 'Join a community of tech enthusiasts building real-world solutions and creating opportunities for growth.',
    type: 'website',
    url: 'https://theopencompany.co',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${oswald.variable} ${greatVibes.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
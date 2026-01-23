import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import MouseGlow from '@/components/MouseGlow';

const interTight = Inter_Tight({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SensAI | Video SEO Refined by Intelligence',
  description: 'Cognitive optimization for the era of visual search.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} antialiased`}>
      <body className="antialiased bg-charcoal text-white relative">
        <SmoothScroll>
          <MouseGlow />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/components/ToastContainer';
import { AiAssistantWidget } from '@/components/AiAssistantWidget';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'CIRCUVIA AI • Turn Waste Into Worth | AI Circular Resource Exchange',
  description:
    'Production-oriented AI Circular Resource Exchange Platform connecting large factories, small businesses, recyclers, and raw-material suppliers across India. Industrial by-products, secondary feedstocks, and zero-waste symbiosis.',
  keywords: [
    'circular economy',
    'industrial symbiosis',
    'waste exchange',
    'fly ash',
    'recycled plastics',
    'by-products exchange India',
    'zero waste platform',
    'CPCB ESG platform',
  ],
  authors: [{ name: 'CIRCUVIA AI Platform' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#072a1e] text-stone-100 font-sans selection:bg-emerald-500 selection:text-forest-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <AiAssistantWidget />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}

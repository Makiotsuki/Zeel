import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Luxury Hampers & Handcrafted Jewelry | Premium Gift Collections',
  description: 'Discover exquisite handcrafted hampers and jewelry. From chocolate collections to custom engagement trays, create unforgettable moments with our premium gift solutions.',
  keywords: 'luxury hampers, handcrafted jewelry, premium gifts, chocolate hampers, engagement trays, custom jewelry, anniversary gifts, birthday collections',
  authors: [{ name: 'Luxury Hampers & Jewelry' }],
  openGraph: {
    title: 'Luxury Hampers & Handcrafted Jewelry',
    description: 'Premium gift collections featuring exquisite hampers and handcrafted jewelry',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
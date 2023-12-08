import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LocalWallet } from './_context';
import SideBar from '@/components/sidebar';
import Header from '@/components/header';
import ConnectWallet from '@/components/account/connectWallet';
import RightSideBar from '@/components/right-sidebar';
import { GroupProvider } from './group/_context';

const inter = Inter({ subsets: ['latin'] });
const domain = 'http://localhost:3000/';
export const metadata: Metadata = {
  title: 'Table Banking',
  description: 'Empowering women through the blockchain',
  manifest: new URL(`${domain}site.webmanifest`),
  icons: [
    {
      url: `${domain}favicon_io/favicon.ico`,
      sizes: '48x48',
      type: 'image/x-icon',
    },
    {
      url: `${domain}favicon_io/apple-touch-icon.png`,
      sizes: '180x180',
      type: 'image/x-icon',
    },
    {
      url: `${domain}favicon_io/favicon-16x16.png`,
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: `${domain}favicon_io/favicon-32x32.png`,
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: `${domain}favicon_io/android-chrome-192x192.png`,
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: `${domain}favicon_io/android-chrome-512x512.png`,
      sizes: '512x512',
      type: 'image/png',
    },
    { url: `${domain}logo.png`, sizes: '78x66', type: 'image/png' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalWallet>
          <div
            id="home"
            className="flex flex-row relative bg-snow w-full h-screen overflow-hidden text-left text-[17.83px] text-black font-raleway"
          >
            <GroupProvider>
              <SideBar />
              <div className="flex flex-col mx-8">
                <Header />
                {children}
              </div>
              <RightSideBar />
              <ConnectWallet />
            </GroupProvider>
          </div>
        </LocalWallet>
      </body>
    </html>
  );
}

import { CreateProvider } from '@/components/create/_context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CreateProvider>{children}</CreateProvider>;
}

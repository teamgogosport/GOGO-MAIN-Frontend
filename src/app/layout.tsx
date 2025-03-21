import TanstackProviders from '@/shared/libs/TanstackProviders';
import ToastProvider from '@/shared/libs/ToastProvider';
import '../shared/styles/globals.css';
import { suit } from '@/shared/styles/fonts';
import { cn } from '@/shared/utils/cn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.variable}>
      <body className={cn('h-screen')}>
        <TanstackProviders>
          <ToastProvider>{children}</ToastProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}

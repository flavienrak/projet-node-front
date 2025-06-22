import './globals.css';
import { Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';

import ReduxProvider from '@/providers/Redux.provider';
import ThemeProvider from '@/providers/Theme.provider';
import SocketProvider from '@/providers/Socket.provider';
import ToastProvider from '@/providers/Toast.provider';
import UserProvider from '@/providers/User.provider';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'App',
  description: 'App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body cz-shortcut-listen="true" className={openSans.variable}>
        <ReduxProvider>
          <ThemeProvider>
            <SocketProvider>
              <ToastProvider>
                <UserProvider>{children}</UserProvider>
              </ToastProvider>
            </SocketProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

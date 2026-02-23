import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import './globals.css';

export const metadata = {
  title: 'iTunes Music App',
  description: 'Search and discover music from iTunes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
"use client";
import { useState, createContext, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from './layout.module.css';

export const ThemeContext = createContext();

function OfflineNotifier() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className={styles.offlineBanner}>
      ⚠️ Internet aloqasi uzildi! Tarix (History) bo'limidagi videolarni ko'rishingiz mumkin.
    </div>
  );
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <html lang="en" style={{ colorScheme: darkMode ? 'dark' : 'light' }}>
      <body className={`${styles.body} ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <OfflineNotifier />
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          <Header />
          <div className={styles.wrapper}>
            <Sidebar />
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
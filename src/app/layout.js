"use client";
import { useState, createContext } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from './layout.module.css';

export const ThemeContext = createContext();

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <html lang="en">
      <body className={`${styles.body} ${darkMode ? 'dark-theme' : 'light-theme'}`}>
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
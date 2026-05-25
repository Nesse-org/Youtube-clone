import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import styles from './layout.module.css';

export const metadata = {
  title: 'YouTube Premium Clone',
  description: 'Demo Day Special',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        <div className={styles.wrapper}>
          <Sidebar />
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
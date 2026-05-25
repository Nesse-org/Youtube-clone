import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.item}>🏠 <span className={styles.text}>Home</span></Link>
      <div className={styles.item}>🩳 <span className={styles.text}>Shorts</span></div>
      <div className={styles.item}>🔔 <span className={styles.text}>Subscriptions</span></div>
      <hr className={styles.hr} />
      <div className={styles.item}>📚 <span className={styles.text}>Library</span></div>
      <div className={styles.item}>⏳ <span className={styles.text}>History</span></div>
    </aside>
  );
}
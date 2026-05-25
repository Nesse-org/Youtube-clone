"use client";
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'login' }),
    });
    router.push('/');
    router.refresh();
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>▶</span>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.sub}>Use your Guest Session Account</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="email" placeholder="Email or phone" defaultValue="demoday@youtube.com" className={styles.field} required />
          <input type="password" placeholder="Enter password" defaultValue="******" className={styles.field} required />
          <button type="submit" className={styles.btn}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
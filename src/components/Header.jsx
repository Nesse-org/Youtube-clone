"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth').then(res => res.json()).then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.burger}>☰</span>
        <Link href="/" className={styles.logo}>
          <span className={styles.icon}>▶</span> YouTube <span className={styles.tag}>UZ</span>
        </Link>
      </div>
      
      <div className={styles.center}>
        <input type="text" placeholder="Search" className={styles.input} />
        <button className={styles.searchBtn}>🔍</button>
      </div>

      <div className={styles.right}>
        {user ? (
          <div className={styles.user}>
            <img src={user.avatar} className={styles.avatar} alt="" />
            <button onClick={handleLogout} className={styles.logoutBtn}>Sign Out</button>
          </div>
        ) : (
          <Link href="/login" className={styles.loginLink}>👤 Sign In</Link>
        )}
      </div>
    </header>
  );
}
"use client";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeContext } from '@/app/layout';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth').then(res => res.json()).then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.burger}>☰</span>
        <Link href="/" className={styles.logo}>
          <span className={styles.icon}>▶</span> YouTube <span className={styles.tag}>UZ</span>
        </Link>
      </div>
      
      <form onSubmit={handleSearch} className={styles.center}>
        <input 
          type="text" 
          placeholder="Search" 
          className={styles.input} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchBtn}>🔍</button>
      </form>

      <div className={styles.right}>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', marginRight: '15px' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
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
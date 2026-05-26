"use client";
import { useState, useEffect } from 'react';
import styles from './OfflineNotifier.module.css';

export default function OfflineNotifier() {
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
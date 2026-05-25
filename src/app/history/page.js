"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getHistory, clearHistory } from '@/hooks/useHistory';
import styles from './history.module.css';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleClear() {
    clearHistory();
    setHistory([]);
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Watch History</h1>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear all history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className={styles.empty}>No videos watched yet</p>
      ) : (
        <div className={styles.list}>
          {history.map(video => (
            <Link href={`/watch/${video.id}`} key={video.id + video.watchedAt} className={styles.card}>
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className={styles.thumb}
              />
              <div className={styles.info}>
                <p className={styles.videoTitle}>{video.title}</p>
                <p className={styles.views}>{video.views}</p>
                <p className={styles.watchedAt}>
                  {new Date(video.watchedAt).toLocaleString('ru-RU')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
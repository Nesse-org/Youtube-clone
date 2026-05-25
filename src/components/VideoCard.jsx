"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHistory } from '@/hooks/useHistory';
import styles from './VideoCard.module.css';

export default function VideoCard({ video }) {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const history = getHistory();
    setWatched(history.some(v => v.id === video.id));
  }, [video.id]);

  return (
    <Link href={`/watch/${video.id}`} className={styles.card}>
      <div className={styles.thumbContainer}>
        <img 
          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} 
          className={styles.thumb} 
          alt="" 
        />
        <span className={styles.duration}>{video.duration}</span>
        {watched && <span className={styles.watchedBadge}>✓ Watched</span>}
      </div>
      <div className={styles.details}>
        <div className={styles.avatar}>MB</div>
        <div className={styles.meta}>
          <h3 className={styles.title}>{video.title}</h3>
          <p className={styles.channel}>MrBeast ✔</p>
          <p className={styles.stats}>{video.views} • {video.time}</p>
        </div>
      </div>
    </Link>
  );
}
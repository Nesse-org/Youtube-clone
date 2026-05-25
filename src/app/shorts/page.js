"use client";
import { useEffect, useState } from 'react';
import styles from './shorts.module.css';

export default function Shorts() {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    fetch('/api/videos?type=shorts')
      .then(res => res.json())
      .then(data => setShorts(data));
  }, []);

  return (
    <div className={styles.shortsContainer}>
      {shorts.map(short => (
        <div key={short.id} className={styles.shortWrapper}>
          <div className={styles.videoBox}>
            <iframe
              src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${short.videoId}&modestbranding=1&rel=0`}
              title={short.title}
              className={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            <div className={styles.overlayInfo}>
              <div className={styles.authorRow}>
                <div className={styles.avatar}>MB</div>
                <span className={styles.channelName}>@MrBeast ✔</span>
                <button className={styles.subBtn}>Subscribe</button>
              </div>
              <p className={styles.shortTitle}>{short.title}</p>
            </div>
          </div>

          <div className={styles.actionSidebar}>
            <button className={styles.actionBtn}>
              <div className={styles.iconCircle}>👍</div>
              <span>{short.likes}</span>
            </button>
            <button className={styles.actionBtn}>
              <div className={styles.iconCircle}>👎</div>
              <span>Dislike</span>
            </button>
            <button className={styles.actionBtn}>
              <div className={styles.iconCircle}>💬</div>
              <span>78K</span>
            </button>
            <button className={styles.actionBtn}>
              <div className={styles.iconCircle}>↩</div>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
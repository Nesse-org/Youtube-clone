"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './watch.module.css';

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.filter(v => v.id !== id));
        setVideo(data.find(v => v.id === id));
      });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!video) return <div className={styles.loading}>⚡ Loading Stream...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.playerSection}>
        <div className={styles.frameWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className={styles.mainTitle}>{video.title}</h1>
        <div className={styles.bar}>
          <div className={styles.author}>
            <div className={styles.bigAvatar}>MB</div>
            <div>
              <p className={styles.name}>MrBeast ✔</p>
              <p className={styles.subs}>310M subscribers</p>
            </div>
            <button className={styles.subBtn}>Subscribe</button>
          </div>
          <div className={styles.actions}>
            <button className={styles.like}>👍 4.8M | 👎</button>
          </div>
        </div>
        <div className={styles.descBox}>
          <strong>{video.views} • {video.time}</strong>
          <p>Official Next.js Premium Frame Architecture deployment for Demo Day exhibition.</p>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <h2 className={styles.sideHeading}>Up Next</h2>
        {recommendations.map(v => (
          <Link href={`/watch/${v.id}`} key={v.id} className={styles.recCard}>
            <div className={styles.recThumb}>
              <img src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`} alt="" />
            </div>
            <div className={styles.recInfo}>
              <h3 className={styles.recTitle}>{v.title}</h3>
              <p className={styles.recChannel}>MrBeast ✔</p>
              <p className={styles.recViews}>{v.views}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
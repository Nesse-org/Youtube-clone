"use client";
import { useEffect, useState } from 'react';
import VideoCard from '@/components/VideoCard';
import styles from './page.module.css';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos').then(res => res.json()).then(data => setVideos(data));
  }, []);

  return (
    <div className={styles.grid}>
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
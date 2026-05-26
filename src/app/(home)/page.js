"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoCard from '@/components/VideoCard';
import styles from './page.module.css';

function HomeContent() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchInUrl = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        if (searchInUrl) {
          const filtered = data.filter(video => 
            video.title.toLowerCase().includes(searchInUrl.toLowerCase())
          );
          setVideos(filtered);
        } else {
          setVideos(data);
        }
        setLoading(false);
      });
  }, [searchInUrl]);

  if (loading) {
    return (
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ animation: 'pulse 1.5s infinite', background: '#333', height: '240px', borderRadius: '12px' }}></div>
        ))}
        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {videos.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#aaa' }}>Hech narsa topilmadi 😕</p>
      ) : (
        <div className={styles.grid}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <HomeContent />
    </Suspense>
  );
}
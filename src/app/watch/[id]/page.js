"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './watch.module.css';
import { addToHistory } from '@/hooks/useHistory';

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.filter(v => v.id !== id));
        const found = data.find(v => v.id === id);
        setVideo(found);
        if (found) addToHistory(found);
      });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(4800000);
  const [subscribed, setSubscribed] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Alex T.', text: 'This video is absolutely amazing! 🔥' },
    { id: 2, user: 'Sara M.', text: 'MrBeast never disappoints, love it! ❤️' },
  ]);

  const handleLike = () => {
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(prev => !prev);
  };

  const handleSubscribe = () => {
    setSubscribed(prev => !prev);
  };

  const handleCommentSubmit = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    setComments(prev => [{ id: Date.now(), user: 'You', text: trimmed }, ...prev]);
    setComment('');
  };

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
            <button
              className={`${styles.subBtn} ${subscribed ? styles.subscribed : ''}`}
              onClick={handleSubscribe}
            >
              {subscribed ? '✔ Subscribed' : 'Subscribe'}
            </button>
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.like} ${liked ? styles.likeActive : ''}`}
              onClick={handleLike}
            >
              👍 {likeCount >= 1000000 ? (likeCount / 1000000).toFixed(1) + 'M' : likeCount.toLocaleString()} | 👎
            </button>
          </div>
        </div>
        <div className={styles.descBox}>
          <strong>{video.views} • {video.time}</strong>
          <p>Official Next.js Premium Frame Architecture deployment for Demo Day exhibition.</p>
        </div>

        <div className={styles.commentsSection}>
          <h3 className={styles.commentsTitle}>💬 {comments.length} Comments</h3>
          <div className={styles.commentInputRow}>
            <div className={styles.commentAvatar}>You</div>
            <input
              type="text"
              className={styles.commentInput}
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCommentSubmit()}
              placeholder="Add a comment..."
            />
            <button
              className={comment.trim() ? styles.commentSubmitBtn : styles.commentSubmitBtnDisabled}
              onClick={handleCommentSubmit}
              disabled={!comment.trim()}
            >
              Comment
            </button>
          </div>
          <div className={styles.commentsList}>
            {comments.map(c => (
              <div key={c.id} className={styles.commentItem}>
                <div className={c.user === 'You' ? styles.commentAvatar : styles.commentAvatarGray}>
                  {c.user === 'You' ? 'You' : c.user.charAt(0)}
                </div>
                <div>
                  <p className={styles.commentUserName}>{c.user}</p>
                  <p className={styles.commentText}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
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
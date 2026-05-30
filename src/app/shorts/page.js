"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./shorts.module.css";

const shorts = [
  {
    id: 0,
    videoId: "l1dnqKGuezo",
    channel: "@NatureBeauty",
    ava: "NB",
    title: "Beautiful nature scenes — rivers, mountains & waterfalls 🌊",
    likes: "248K",
    comments: "12K",
    music: "Relaxing Nature Sounds — ambient",
  },
  {
    id: 1,
    videoId: "LXb3EKWsInQ",
    channel: "@EarthCapture",
    ava: "EC",
    title: "Amazing animal moments caught on camera in the wild 🦁",
    likes: "1.3M",
    comments: "44K",
    music: "Wild Africa — naturedocs",
  },
  {
    id: 2,
    videoId: "n_Dv4JMiwK8",
    channel: "@CosmicVibes",
    ava: "CV",
    title: "The most satisfying science experiments you will ever see ⚗️",
    likes: "892K",
    comments: "31K",
    music: "Science Beat — lofi.wav",
  },
  {
    id: 3,
    videoId: "hY7m5jjJ9mM",
    channel: "@FoodieWorld",
    ava: "FW",
    title: "Street food from Tokyo that you NEED to try 🍜🔥",
    likes: "567K",
    comments: "19K",
    music: "Tokyo Nights — citypop",
  },
];

export default function Shorts() {
  const [liked, setLiked] = useState({});
  const [disliked, setDisliked] = useState({});
  const [subscribed, setSubscribed] = useState({});

  function toggleLike(id) {
    setLiked((p) => ({ ...p, [id]: !p[id] }));
    if (disliked[id]) setDisliked((p) => ({ ...p, [id]: false }));
  }
  function toggleDislike(id) {
    setDisliked((p) => ({ ...p, [id]: !p[id] }));
    if (liked[id]) setLiked((p) => ({ ...p, [id]: false }));
  }
  function toggleSubscribe(id) {
    setSubscribed((p) => ({ ...p, [id]: !p[id] }));
  }

  return (
    <div className={styles.container}>
      {shorts.map((s) => (
        <ShortItem
          key={s.id}
          short={s}
          isLiked={!!liked[s.id]}
          isDisliked={!!disliked[s.id]}
          isSubscribed={!!subscribed[s.id]}
          onLike={() => toggleLike(s.id)}
          onDislike={() => toggleDislike(s.id)}
          onSubscribe={() => toggleSubscribe(s.id)}
        />
      ))}
    </div>
  );
}

function ShortItem({ short, isLiked, isDisliked, isSubscribed, onLike, onDislike, onSubscribe }) {
  const wrapperRef = useRef(null);
  const progRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startProg();
        else stopProg();
      },
      { threshold: 0.7 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); stopProg(); };
  }, []);

  function startProg() {
    stopProg();
    let p = 0;
    if (progRef.current) progRef.current.style.width = "0%";
    intervalRef.current = setInterval(() => {
      p += 100 / 600;
      if (p >= 100) { p = 100; stopProg(); }
      if (progRef.current) progRef.current.style.width = p + "%";
    }, 100);
  }

  function stopProg() {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }

  return (
    <div className={styles.shortWrapper} ref={wrapperRef}>
      <div className={styles.videoBox}>

        <iframe
          className={styles.iframe}
          src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&loop=1&playlist=${short.videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <div className={styles.gradient} />

        <div className={styles.topBar}>
          <div className={styles.topTitle}>
            <span className={styles.logo}>▶</span>
            Shorts
          </div>
          <div className={styles.topIcons}>
            <button className={styles.iconBtn}>🔍</button>
            <button className={styles.iconBtn}>📷</button>
          </div>
        </div>
 
        <div className={styles.overlay}>
          <div className={styles.authorRow}>
            <div className={styles.avatar}>{short.ava}</div>
            <span className={styles.channelName}>{short.channel} ✔</span>
            <button
              className={`${styles.subBtn} ${isSubscribed ? styles.subOn : ""}`}
              onClick={onSubscribe}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <p className={styles.title}>{short.title}</p>
          <div className={styles.musicRow}>
            <span>🎵</span>
            <span className={styles.musicLabel}>{short.music}</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} ref={progRef} />
        </div>
      </div>

      <div className={styles.sidebar}>
        <button
          className={`${styles.actionBtn} ${isLiked ? styles.liked : ""}`}
          onClick={onLike}
        >
          <div className={styles.iconCircle}>{isLiked ? "❤️" : "👍"}</div>
          <span className={styles.actionLabel}>{short.likes}</span>
        </button>
        <button className={styles.actionBtn} onClick={onDislike}>
          <div className={styles.iconCircle}>{isDisliked ? "✊" : "👎"}</div>
          <span className={styles.actionLabel}>Dislike</span>
        </button>
        <button className={styles.actionBtn}>
          <div className={styles.iconCircle}>💬</div>
          <span className={styles.actionLabel}>{short.comments}</span>
        </button>
        <button className={styles.actionBtn}>
          <div className={styles.iconCircle}>↗</div>
          <span className={styles.actionLabel}>Share</span>
        </button>
        <button className={styles.actionBtn}>
          <div className={styles.iconCircle}>⋯</div>
          <span className={styles.actionLabel}>More</span>
        </button>
      </div>
    </div>
  );
}
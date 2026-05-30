"use client";
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    });
    window.location.reload();
  };

  // live превью при вводе
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setPreviewVideos([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch(`/api/videos?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setPreviewVideos(data.slice(0, 4).map(v => ({
          id: { videoId: v.videoId },
          videoId: v.videoId,
          snippet: {
            title: v.title,
            channelTitle: v.channel || 'YouTube',
            thumbnails: {
              default: { url: `https://img.youtube.com/vi/${v.videoId}/default.jpg` },
              medium: { url: `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg` },
            },
          },
        })));
      } catch (e) { console.error(e); }
      setPreviewLoading(false);
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // полный поиск
  const searchVideos = useCallback(async (q) => {
    if (!q.trim()) return;
    setShow(false);
    setPreviewVideos([]);
    setLoading(true);
    try {
      const res = await fetch(`/api/videos?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.map(v => ({
        id: { videoId: v.videoId },
        videoId: v.videoId,
        snippet: {
          title: v.title,
          channelTitle: v.channel || 'YouTube',
          thumbnails: {
            medium: { url: `https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg` },
          },
        },
      })));
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  function highlight(text) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <strong style={{ color: "#fff" }}>{text.slice(idx, idx + query.length)}</strong>
        {text.slice(idx + query.length)}
      </>
    );
  }

  const showDropdown = show && query.length >= 2 &&
    (previewLoading || previewVideos.length > 0);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <span className={styles.burger}>☰</span>
          <Link href="/" className={styles.logo}>
            <span className={styles.icon}>▶</span> YouTube{" "}
            <span className={styles.tag}>UZ</span>
          </Link>
        </div>

        <div className={styles.center}>
          <div className={styles.searchWrapper}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск"
              className={styles.input}
              value={query}
              onChange={e => { setQuery(e.target.value); setShow(true); }}
              onFocus={() => setShow(true)}
              onBlur={() => setTimeout(() => setShow(false), 200)}
              onKeyDown={e => e.key === "Enter" && searchVideos(query)}
            />

            {showDropdown && (
              <div className={styles.dropdown}>
                <div style={{ padding: "8px 16px 4px", fontSize: 11, color: "#717171", textTransform: "uppercase", letterSpacing: 1 }}>
                  Видео по запросу
                </div>

                {previewLoading && (
                  <div style={{ padding: "12px 16px", color: "#717171", fontSize: 13 }}>
                    Загрузка...
                  </div>
                )}

                {!previewLoading && previewVideos.map((item, i) => (
                  <div
                    key={i}
                    className={styles.dropdownVideoItem}
                    onMouseDown={() => {
                      setShow(false);
                      window.location.href = `/watch/${item.videoId}`;
                    }}
                  >
                    <img
                      src={item.snippet.thumbnails.default.url}
                      alt=""
                      style={{ width: 80, height: 45, borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        color: "#fff", fontSize: 13, margin: "0 0 3px",
                        lineHeight: 1.3, overflow: "hidden",
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      }}>
                        {highlight(item.snippet.title)}
                      </p>
                      <p style={{ color: "#717171", fontSize: 11, margin: 0 }}>
                        {item.snippet.channelTitle}
                      </p>
                    </div>
                  </div>
                ))}

                {!previewLoading && previewVideos.length > 0 && (
                  <div
                    style={{ padding: "10px 16px", fontSize: 13, color: "#3ea6ff", cursor: "pointer", borderTop: "1px solid #303030" }}
                    onMouseDown={() => searchVideos(query)}
                  >
                    🔍 Показать все по «{query}»
                  </div>
                )}

                {!previewLoading && previewVideos.length === 0 && (
                  <div style={{ padding: "12px 16px", color: "#717171", fontSize: 13 }}>
                    Ничего не найдено
                  </div>
                )}
              </div>
            )}
          </div>

          <button className={styles.searchBtn} onClick={() => searchVideos(query)}>
            🔍
          </button>
        </div>

        <div className={styles.right}>
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

      {/* Полные результаты */}
      {(loading || results.length > 0) && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0, bottom: 0,
          background: "#0f0f0f", overflowY: "auto", padding: "24px 32px", zIndex: 90,
        }}>
          {loading ? (
            <p style={{ color: "#aaa", textAlign: "center", marginTop: 60, fontSize: 16 }}>
              Загрузка...
            </p>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>
                  Результаты: <strong style={{ color: "#fff" }}>{query}</strong>
                </p>
                <button
                  onClick={() => { setResults([]); setQuery(""); }}
                  style={{ background: "#272727", border: "none", color: "#fff", padding: "6px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}
                >
                  ✕ Закрыть
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {results.map((item, i) => (
                  <a
                    key={i}
                    href={`/watch/${item.videoId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{ background: "#181818", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#222"}
                      onMouseLeave={e => e.currentTarget.style.background = "#181818"}
                    >
                      <img
                        src={item.snippet.thumbnails.medium.url}
                        alt={item.snippet.title}
                        style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                      />
                      <div style={{ padding: "10px 12px 14px" }}>
                        <p style={{
                          color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: 1.4,
                          margin: "0 0 6px", display: "-webkit-box",
                          WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}>
                          {item.snippet.title}
                        </p>
                        <p style={{ color: "#aaa", fontSize: 12, margin: 0 }}>
                          {item.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
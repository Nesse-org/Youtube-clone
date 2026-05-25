const HISTORY_KEY = 'watch_history';

export function addToHistory(video) {
  try {
    const history = getHistory();
    const filtered = history.filter(v => v.id !== video.id);
    const updated = [{ ...video, watchedAt: Date.now() }, ...filtered].slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {}
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
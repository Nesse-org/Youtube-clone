export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const maxResults = searchParams.get('maxResults') || 8;

  if (!q) return Response.json({ items: [] });

  try {
    const res = await fetch(
      `https://invidious.io.lol/api/v1/search?q=${encodeURIComponent(q)}&type=video`
    );
    const data = await res.json();

    const items = data.slice(0, maxResults).map(video => ({
      id: { videoId: video.videoId },
      snippet: {
        title: video.title,
        channelTitle: video.author,
        thumbnails: {
          default: { url: `https://img.youtube.com/vi/${video.videoId}/default.jpg` },
          medium: { url: `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg` },
        },
      },
    }));

    return Response.json({ items });
  } catch (e) {
    console.error(e);
    return Response.json({ items: [] });
  }
}
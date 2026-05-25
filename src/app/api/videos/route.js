import { NextResponse } from 'next/server';

const openVideos = [
  { id: "1", title: "Google I/O Keynote - Tech Future Showcase", views: "12M views", time: "1 month ago", duration: "10:22", videoId: "XEzRP_Rz64E" },
  { id: "2", title: "Official Blender Animation - Big Buck Bunny 4K", views: "45M views", time: "3 years ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "3", title: "Chrome Dev Summit - Modern Web Performance", views: "5M views", time: "6 months ago", duration: "15:40", videoId: "4b97r7t3F7A" },
  { id: "4", title: "Tears of Steel - Open Source Sci-Fi Movie HD", views: "34M views", time: "4 years ago", duration: "12:14", videoId: "R6MlUcmO1A4" },
  { id: "5", title: "Android UI Development - Best Practices 2026", views: "8M views", time: "2 months ago", duration: "14:10", videoId: "fM5aInKWeG0" },
  { id: "6", title: "Sintel - 4K Open Cinematic Masterpiece", views: "89M views", time: "2 years ago", duration: "14:48", videoId: "eRsGyueVLvQ" },
  { id: "7", title: "Flutter Framework Showcase - Cross Platform Apps", views: "15M views", time: "1 year ago", duration: "11:25", videoId: "fq4N0hgOWzU" },
  { id: "8", title: "Cosmos Laundromat - Epic 3D Animated Film", views: "21M views", time: "9 months ago", duration: "12:10", videoId: "Y-rmzh0PII8" }
];

const openShorts = [
  { id: "s1", title: "4K Nature Relaxation Loop - Peaceful Stream", likes: "5M", videoId: "9xuR73_LpFM" },
  { id: "s2", title: "Satisfying Hydraulic Press vs Hard Objects", likes: "8M", videoId: "O91DRZ1CAs8" },
  { id: "s3", title: "Tokyo Street Lights - Hyperlapse Drive 4K", likes: "3M", videoId: "X8zLJlUf6wU" },
  { id: "s4", title: "Calm Ocean Waves and Sand Drone View", likes: "12M", videoId: "W0LHTWG-UmQ" },
  { id: "s5", title: "Synthwave Neon Grid Landscape Art Motion", likes: "7M", videoId: "4S1b9vSh0G0" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  
  if (type === 'shorts') {
    return NextResponse.json(openShorts);
  }
  return NextResponse.json(openVideos);
}
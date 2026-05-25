import { NextResponse } from 'next/server';

const openVideos = [
  { id: "1", title: "Official Blender Cinematic Animation - Spring", views: "55M views", time: "2 years ago", duration: "07:44", videoId: "CkWqChHaNMw" },
  { id: "2", title: "Sintel - Open Source HD Movie Project", views: "89M views", time: "3 years ago", duration: "14:48", videoId: "eRsGyueVLvQ" },
  { id: "3", title: "Big Buck Bunny - 4K Ultra HD Classic", views: "45M views", time: "5 years ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "4", title: "Tears of Steel - Sci-Fi VFX Showcase", views: "34M views", time: "4 years ago", duration: "12:14", videoId: "R6MlUcmO1A4" },
  { id: "5", title: "Cosmos Laundromat - Award Winning Short Animation", views: "12M views", time: "1 year ago", duration: "12:10", videoId: "Y-rmzh0PII8" },
  { id: "6", title: "Caminandes 3: Llamigos - Funny Cartoon Loop", views: "67M views", time: "8 months ago", duration: "02:30", videoId: "SkVqJ1SGeL0" },
  { id: "7", title: "Agent 327: Operation Barbershop Action Trailer", views: "15M views", time: "1 year ago", duration: "03:51", videoId: "mN0zPOpADL4" },
  { id: "8", title: "Glass Half - Full 3D Stylized Short Film", views: "21M views", time: "6 months ago", duration: "03:00", videoId: "Yd7788vscvE" }
];

const openShorts = [
  { id: "s1", title: "Nature Relaxation 4K Loop - Beautiful River", likes: "5M", videoId: "9xuR73_LpFM" },
  { id: "s2", title: "Satisfying Hydraulic Press vs Metal Objects", likes: "8M", videoId: "O91DRZ1CAs8" },
  { id: "s3", title: "Tokyo City Street Hyperlapse view", likes: "3M", videoId: "X8zLJlUf6wU" },
  { id: "s4", title: "Calm Ocean Waves and Sand Drone Shot", likes: "12M", videoId: "W0LHTWG-UmQ" },
  { id: "s5", title: "Synthwave Neon Grid Landscape Animation", likes: "7M", videoId: "4S1b9vSh0G0" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  
  if (type === 'shorts') {
    return NextResponse.json(openShorts);
  }
  return NextResponse.json(openVideos);
}
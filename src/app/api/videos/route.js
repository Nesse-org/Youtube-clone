import { NextResponse } from 'next/server';

const openVideos = [
  { id: "1", title: "Official Blender Animation - Big Buck Bunny 4K", views: "45M views", time: "3 years ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "2", title: "Sintel - 4K Open Cinematic Masterpiece", views: "89M views", time: "2 years ago", duration: "14:48", videoId: "eRsGyueVLvQ" },
  { id: "3", title: "Flutter Framework Showcase - Cross Platform Apps", views: "15M views", time: "1 year ago", duration: "11:25", videoId: "fq4N0hgOWzU" },
  { id: "4", title: "Blender Animation Project - Big Buck Bunny Classic", views: "12M views", time: "6 months ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "5", title: "Sintel - Open Source Cinematic Experience", views: "34M views", time: "8 months ago", duration: "14:48", videoId: "eRsGyueVLvQ" },
  { id: "6", title: "Building Cross Platform Mobile Apps with Flutter", views: "5M views", time: "3 weeks ago", duration: "11:25", videoId: "fq4N0hgOWzU" },
  { id: "7", title: "Epic Animated Showcase - Big Buck Bunny Movie", views: "23M views", time: "1 year ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "8", title: "Advanced Flutter Framework UI Tutorials", views: "8M views", time: "2 months ago", duration: "11:25", videoId: "fq4N0hgOWzU" }
];

const openShorts = [
  { id: "s1", title: "Calm Ocean Waves and Sand Drone Shot", likes: "12M", videoId: "W0LHTWG-UmQ" },
  { id: "s2", title: "Beautiful Ocean Waves - Relaxing Drone Loop", likes: "8M", videoId: "W0LHTWG-UmQ" },
  { id: "s3", title: "Calm Sea Waves & Sandy Beach View 4K", likes: "15M", videoId: "W0LHTWG-UmQ" },
  { id: "s4", title: "Relaxing Nature Drone Shot - Ocean Side", likes: "9M", videoId: "W0LHTWG-UmQ" },
  { id: "s5", title: "Cinematic Ocean Waves and Clean Sand", likes: "14M", videoId: "W0LHTWG-UmQ" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  
  if (type === 'shorts') {
    return NextResponse.json(openShorts);
  }
  return NextResponse.json(openVideos);
}
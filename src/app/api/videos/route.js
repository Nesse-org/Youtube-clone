import { NextResponse } from 'next/server';

const mrBeastVideos = [
  { id: "1", title: "I Survived 100 Days In An Absolute Wilderness", views: "142M views", time: "2 months ago", duration: "24:15", videoId: "iogcY_4xGjo" },
  { id: "2", title: "$1 vs $10,000,000 Flight Ticket!", views: "280M views", time: "5 months ago", duration: "18:40", videoId: "1XvK36_Cq2w" },
  { id: "3", title: "I Survived 7 Days In Solitary Confinement", views: "190M views", time: "8 months ago", duration: "20:05", videoId: "gHzuHo90wKM" },
  { id: "4", title: "Last To Leave Razor Wire Circle Wins $500,000", views: "115M views", time: "1 year ago", duration: "15:22", videoId: "dBxOYE2j55U" },
  { id: "5", title: "Ages 1 - 100 Fight For $500,000", views: "340M views", time: "1 year ago", duration: "28:11", videoId: "2isYuQZMbdU" },
  { id: "6", title: "I Built 100 Wells In Africa", views: "160M views", time: "6 months ago", duration: "12:04", videoId: "HwM62mvv_ms" },
  { id: "7", title: "1,000 Blind People See For The First Time", views: "185M views", time: "1 year ago", duration: "14:15", videoId: "TJ2ifmkGGus" },
  { id: "8", title: "World's Most Dangerous Trap!", views: "210M views", time: "9 months ago", duration: "19:50", videoId: "36S9s4mY488" }
];

const mrBeastShorts = [
  { id: "s1", title: "Would You Fly To Paris For A Baguette?", likes: "12M", videoId: "sh98mE34Yq0" },
  { id: "s2", title: "I Cleaned The World’s Dirtiest Beach", likes: "8.5M", videoId: "pT79xV_Ssh8" },
  { id: "s3", title: "Giving $10,000 To Random Streamers", likes: "15M", videoId: "vB-B_f0vR5g" },
  { id: "s4", title: "Train Vs Giant Pit - Epic Crash Test", likes: "9.1M", videoId: "fPp39fubP3E" },
  { id: "s5", title: "Hydraulic Press Vs Lamborghini experiment", likes: "14M", videoId: "ZpEon6VCH-g" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  
  if (type === 'shorts') {
    return NextResponse.json(mrBeastShorts);
  }
  return NextResponse.json(mrBeastVideos);
}
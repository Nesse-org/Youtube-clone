import { NextResponse } from 'next/server';

const mrBeastVideos = [
  { id: "1", title: "I Survived 100 Days In An Absolute Wilderness", views: "142M views", time: "2 months ago", duration: "24:15", videoId: "iogcY_4xGjo" },
  { id: "2", title: "I Opened A Restaurant That Pays You To Eat", views: "180M views", time: "5 months ago", duration: "13:31", videoId: "Dg86p9BdfqE" },
  { id: "3", title: "I Survived 7 Days In Solitary Confinement", views: "190M views", time: "8 months ago", duration: "20:05", videoId: "gHzuHo90wKM" },
  { id: "4", title: "Would You Press This Button For $1,000,000?", views: "215M views", time: "1 year ago", duration: "14:52", videoId: "fmfR-eJmrm8" },
  { id: "5", title: "Ages 1 - 100 Fight For $500,000", views: "340M views", time: "1 year ago", duration: "28:11", videoId: "2isYuQZMbdU" },
  { id: "6", title: "I Bought Everything In A Store", views: "260M views", time: "6 months ago", duration: "14:12", videoId: "Rj_vssRaZlQ" },
  { id: "7", title: "1,000 Blind People See For The First Time", views: "185M views", time: "1 year ago", duration: "14:15", videoId: "TJ2ifmkGGus" },
  { id: "8", title: "I Spent 24 Hours In A House Of Cards", views: "195M views", time: "9 months ago", duration: "12:50", videoId: "S87J89fS_H0" }
];

const mrBeastShorts = [
  { id: "s1", title: "Giving Away $10,000 If You Can Do This!", likes: "12M", videoId: "sh98mE34Yq0" },
  { id: "s2", title: "Testing World's Craziest Gadgets!", likes: "8.5M", videoId: "pT79xV_Ssh8" },
  { id: "s3", title: "He Passed The Hardest Challenge!", likes: "15M", videoId: "vB-B_f0vR5g" },
  { id: "s4", title: "World's Safest Safe vs Military Explosives!", likes: "9.1M", videoId: "fPp39fubP3E" },
  { id: "s5", title: "Will The Hydraulic Press Destroy This?", likes: "14M", videoId: "ZpEon6VCH-g" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  
  if (type === 'shorts') {
    return NextResponse.json(mrBeastShorts);
  }
  return NextResponse.json(mrBeastVideos);
}
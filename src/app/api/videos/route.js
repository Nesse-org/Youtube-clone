import { NextResponse } from 'next/server';

const mrBeastVideos = [
  { id: "1", title: "I Survived 100 Days In An Absolute Wilderness", views: "142M views", time: "2 months ago", duration: "24:15", videoId: "iogcY_4xGjo" },
  { id: "2", title: "$1 vs $10,000,000 Flight Ticket!", views: "280M views", time: "5 months ago", duration: "18:40", videoId: "1XvK36_Cq2w" },
  { id: "3", title: "I Survived 7 Days In Solitary Confinement", views: "190M views", time: "8 months ago", duration: "20:05", videoId: "gHzuHo90wKM" },
  { id: "4", title: "Last To Leave Razor Wire Circle Wins $500,000", views: "115M views", time: "1 year ago", duration: "15:22", videoId: "dBxOYE2j55U" },
  { id: "5", title: "Ages 1 - 100 Fight For $500,000", views: "340M views", time: "1 year ago", duration: "28:11", videoId: "2isYuQZMbdU" },
  { id: "6", title: "I Built 100 Wells In Africa", views: "160M views", time: "6 months ago", duration: "12:04", videoId: "HwM62mvv_ms" },
  { id: "7", title: "1,000 Blind People See For The First Time", views: "185M views", time: "1 year ago", duration: "14:15", videoId: "TJ2ifmkGGus" },
  { id: "8", title: "World's Most Dangerous Trap!", views: "210M views", time: "9 months ago", duration: "19:50", videoId: "36S9s4mY488" },
  { id: "9", title: "I Survived 7 Days Stranded At Sea", views: "255M views", time: "7 months ago", duration: "22:30", videoId: "788_0gN4eH8" },
  { id: "10", title: "Train Vs Giant Pit", views: "175M views", time: "11 months ago", duration: "13:55", videoId: "fPp39fubP3E" },
  { id: "11", title: "Hydraulic Press Vs Lamborghini", views: "130M views", time: "4 months ago", duration: "16:45", videoId: "ZpEon6VCH-g" },
  { id: "12", title: "$1 vs $500,000 Houses!", views: "310M views", time: "2 years ago", duration: "21:02", videoId: "kX3nB4PpJko" },
  { id: "13", title: "I Spent 50 Hours In Burial Alive", views: "295M views", time: "3 years ago", duration: "18:20", videoId: "9bqk6ZUsKyA" },
  { id: "14", title: "Would You Fly To Paris For A Baguette?", views: "98M views", time: "3 weeks ago", duration: "10:15", videoId: "sh98mE34Yq0" },
  { id: "15", title: "Surviving 24 Hours In A Lumber Mill", views: "120M views", time: "10 months ago", duration: "17:08", videoId: "x9U_C8G2Eeo" },
  { id: "16", title: "I Cleaned The World’s Dirtiest Beach", views: "145M views", time: "2 years ago", duration: "15:00", videoId: "pT79xV_Ssh8" },
  { id: "17", title: "Giving $10,000 To Random Streamers", views: "85M views", time: "4 years ago", duration: "23:40", videoId: "vB-B_f0vR5g" },
  { id: "18", title: "I Spent 24 Hours In A Desert", views: "155M views", time: "1 year ago", duration: "19:12", videoId: "k8Z_K4eBwH8" },
  { id: "19", title: "Extreme $1,000,000 Hide And Seek", views: "220M views", time: "2 years ago", duration: "25:30", videoId: "f07w7oE57gA" },
  { id: "20", title: "I Adopted Every Dog In A Shelter", views: "180M views", time: "3 years ago", duration: "16:18", videoId: "YQHsXMglC9A" }
];

export async function GET() {
  return NextResponse.json(mrBeastVideos);
}
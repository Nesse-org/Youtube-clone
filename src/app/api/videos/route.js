import { NextResponse } from 'next/server';

const openVideos = [
  { id: "1", title: "Big Buck Bunny 4K - Blender Open Movie", channel: "Blender Foundation", views: "45M views", time: "3 years ago", duration: "09:56", videoId: "aqz-KE-bpKQ" },
  { id: "2", title: "Sintel - Award Winning Short Film", channel: "Blender Institute", views: "89M views", time: "2 years ago", duration: "14:48", videoId: "eRsGyueVLvQ" },
  { id: "3", title: "Tears of Steel - Sci-Fi Short Film", channel: "Blender Foundation", views: "22M views", time: "4 years ago", duration: "12:10", videoId: "R6MlUcmOul8" },
  { id: "4", title: "Cosmos Laundromat - Blender Movie", channel: "Blender Institute", views: "18M views", time: "5 years ago", duration: "12:10", videoId: "Y-rmzh0PI3c" },
  { id: "5", title: "Elephants Dream - First Open Movie", channel: "Blender Foundation", views: "12M views", time: "6 years ago", duration: "10:54", videoId: "TLkA0RELQ1g" },
  { id: "6", title: "Flutter in 100 Seconds", channel: "Fireship", views: "5M views", time: "1 year ago", duration: "01:40", videoId: "lHhRsgVAd2E" },
  { id: "7", title: "How Does the Internet Work?", channel: "Kurzgesagt", views: "31M views", time: "2 years ago", duration: "08:22", videoId: "TNQsmPf24go" },
  { id: "8", title: "Glass Half - Blender Open Animation", channel: "Blender Open Movie", views: "7M views", time: "8 months ago", duration: "05:30", videoId: "WhWc3b3KhnY" }
];

const openShorts = [
  { id: "s1", title: "Ocean Waves Drone Shot 4K", likes: "12M", videoId: "W0LHTWG-UmQ" },
  { id: "s2", title: "Mountain Sunset Timelapse", likes: "8M", videoId: "9o_Yzp84wdI" },
  { id: "s3", title: "Avalanche in Slow Motion", likes: "15M", videoId: "TZyFALPbNEk" },
  { id: "s4", title: "Tropical Forest Drone Flyover", likes: "9M", videoId: "7C4p_HaILm8" },
  { id: "s5", title: "Northern Lights in Norway", likes: "21M", videoId: "86ZWsl3B_3g" }
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  if (type === 'shorts') {
    return NextResponse.json(openShorts);
  }
  return NextResponse.json(openVideos);
}

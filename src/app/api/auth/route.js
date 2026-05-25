import { NextResponse } from 'next/server';

let sessionUser = null;

export async function GET() {
  return NextResponse.json({ user: sessionUser });
}

export async function POST(req) {
  const { action } = await req.json();
  if (action === 'login') {
    sessionUser = { name: "Demo Guest", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" };
  } else if (action === 'logout') {
    sessionUser = null;
  }
  return NextResponse.json({ success: true, user: sessionUser });
}
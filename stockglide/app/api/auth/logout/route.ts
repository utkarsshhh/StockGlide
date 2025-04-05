import { NextRequest, NextResponse } from 'next/server';
import { logout } from '@/lib/auth';

export async function POST(): Promise<NextResponse> {
  logout();
  
  return NextResponse.json({
    success: true
  }, { status: 200 });
}
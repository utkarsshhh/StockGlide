import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { ApiResponse, User } from '@/types/api';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const body = await request.json();
    const user = await login(body);
    
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login'
    }, { status: 400 });
  }
}
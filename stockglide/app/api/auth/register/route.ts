import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/auth';
import { ApiResponse} from '@/types/api';
import { User } from '@/types/user';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const body = await request.json();
    const user = await register(body);
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during registration'
    }, { status: 400 });
  }
}
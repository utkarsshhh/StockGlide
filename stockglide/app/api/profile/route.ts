import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ApiResponse} from '@/types/api';
import { User } from '@/types/user';

export async function GET(): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: true,
      data: user,
    });
  }
  catch(error) {
    return NextResponse.json({
        success: false,
        error: String(error)
      }, { status: 500 });
  }
}
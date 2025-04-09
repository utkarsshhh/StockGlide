import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { ApiResponse } from '@/types/api';
import { User } from '@/types/user';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const body = await request.json();
    console.log("body ",body)
    const user = await login(body);
    console.log("user ",user)
    const res =  NextResponse.json({
      success: true,
      data: user,
    });
    res.cookies.set('token', user.token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60, // 1 hour
        secure: false,
        sameSite: 'lax',
        
      });
      res.cookies.set('user_id', user.user_id.toString(), {
        httpOnly: true, // can be read on frontend
        path: '/',
        maxAge: 60 * 60,
        secure: false,
        sameSite: 'lax',  //1 hour,
      });
      return res
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during login'
    }, { status: 400 });
  }
}
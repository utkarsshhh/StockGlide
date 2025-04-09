import { db } from './db';
import { cookies } from 'next/headers';
import { User, LoginCredentials, RegisterData } from '@/types/user';
import { validateLogin } from '@/app/api/login';

// For demo purposes only - in a real app, use a proper authentication library
export async function register(data: RegisterData): Promise<User | null> {
  const existingUser = await db.getUserByEmail(data.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // In a real app, hash the password before storing
  const user = await db.createUser({
    username: data.username,
    email: data.email,
    password: data.password, // This should be hashed
    name: data.name || data.username,
  });
  
  // Remove password before returning user data
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function login(credentials: LoginCredentials){
    try{
    const user = await validateLogin(credentials)
    console.log(user)
    const cookieStore = await cookies();
  console.log("user ",user)
//   cookieStore.set('session', user.user_id, { 
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24, // 1 week
//     path: '/',
//   });
//   cookieStore.set('token', user.token, {
//     httpOnly: true,
//     path: '/',
//     maxAge: 60 * 60 * 24, // 1 day
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//   });
//   cookieStore.set('user_id', user.user_id.toString(), {
//     httpOnly: false, // can be read on frontend
//     path: '/',
//     maxAge: 60 * 60 * 24,
//   });
  
  // Remove password before returning user data
//   const { password, ...userWithoutPassword } = user;
//   return userWithoutPassword;
    return user
    }
    catch(error){
        throw new Error('Invalid credentials');
    }

    
    
  
  
  // In a real app, use a proper session management system
  // For demo, we'll set a cookie with the user ID
  
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore =  await cookies();

  const user = cookieStore.get('user_id');
//   console.log(sessionCookie)
//   console.log("current user ")
//   if (!sessionCookie?.value) return null;
  
//   const user = await db.getUserById(sessionCookie.value);
  if (!user) return null;
  
  // Remove password before returning user data
//   const { password, ...userWithoutPassword } = user;
  return user;
}

export async function logout() {
const cookieStore = await cookies();
cookieStore.delete('token');
cookieStore.delete('user_id');
}
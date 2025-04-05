import { db } from './db';
import { cookies } from 'next/headers';
import { User, LoginCredentials, RegisterData } from '@/types/user';

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

export async function login(credentials: LoginCredentials): Promise<User | null> {
  const user = await db.getUserByEmail(credentials.email);
  
  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid credentials');
  }
  
  // In a real app, use a proper session management system
  // For demo, we'll set a cookie with the user ID
  const cookieStore = await cookies();
  cookieStore.set('session', user.id, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  // Remove password before returning user data
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie?.value) return null;
  
  const user = await db.getUserById(sessionCookie.value);
  if (!user) return null;
  
  // Remove password before returning user data
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function logout() {
const cookieStore = await cookies();
cookieStore.delete('session');
}
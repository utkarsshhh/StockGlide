import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileDisplay from '@/components/profile/ProfileDisplay';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Profile - StockGlide',
  description: 'Your StockGlide profile',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    
    
    <div>
      
      
      <ProfileDisplay user={user} />
    </div>
    
  );
}
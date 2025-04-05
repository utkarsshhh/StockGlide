import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileDisplay from '@/components/profile/ProfileDisplay';

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
      <ProfileDisplay user={user} />
    </div>
  );
}
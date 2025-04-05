import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard - StockGlide',
  description: 'Your StockGlide dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-lg font-medium mb-4">
          Welcome back, {user.name || user.username}!
        </div>
        <p className="text-gray-600 mb-4">
          This is your dashboard where you can track your stock portfolio and investments.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-500">
            This is a placeholder dashboard. In a complete application, you would see your portfolio summary, recent activities, market trends, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
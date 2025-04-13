'use client';

import React, { useState } from 'react';
import { User } from '@/types/user';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import Header from '../layout/Header';
import Link from 'next/link';

interface ProfileDisplayProps {
  user: User;
}
import { 
  BarChart3, 
  LineChart, 
  List, 
  Clock, 
  Briefcase, 
  Eye, 
  ArrowUp, 
  ArrowDown,
  Menu,
  Bell,
  Search,
  User
} from 'lucide-react';

function NavLink({ href, icon, active, children }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  );
}
const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name || '',
    username: user.username,
    email: user.email,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!userData.username) {
      newErrors.username = 'Username is required';
    } else if (userData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Profile update error:', error);
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">StockGlide</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <NavLink href="/dashboard" icon={<BarChart3 size={20} />} active>
              Dashboard
            </NavLink>
            <NavLink href="/portfolios" icon={<Briefcase size={20} />}>
              Portfolios
            </NavLink>
            <NavLink href="/watchlists" icon={<Eye size={20} />}>
              Watchlists
            </NavLink>
            <NavLink href="/transactions" icon={<Clock size={20} />}>
              Transactions
            </NavLink>
            <NavLink href="/discover" icon={<Search size={20} />}>
              Discover
            </NavLink>
          </div>
        </nav>
        <div className="px-6 py-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name || user.username}</p>
              <Link href="/settings" className="text-xs text-gray-500 hover:text-gray-700">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
    <Header user={user} />
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and account information
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      
      {successMessage && (
        <div className="m-4 bg-green-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {serverError && (
        <div className="m-4 bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                {serverError}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              label="Username"
              value={userData.username}
              onChange={handleChange}
              error={errors.username}
            />
            
            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              value={userData.name}
              onChange={handleChange}
              error={errors.name}
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={userData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setUserData({
                  name: user.name || '',
                  username: user.username,
                  email: user.email,
                });
                setErrors({});
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Username
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.username}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name || "-"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Member since
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDate(user.created_at)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProfileDisplay;
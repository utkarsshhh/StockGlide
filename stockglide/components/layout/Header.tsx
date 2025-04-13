import React from 'react';
import Navbar from '../ui/Navbar';
import { User } from '@/types/user';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header>
      <Navbar user={user} />
    </header>
  );
};

export default Header;
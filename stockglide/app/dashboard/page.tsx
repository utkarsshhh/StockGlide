import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
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

// Mock data - replace with actual data fetching
import { getPortfolios, getWatchlists, getRecentTransactions } from '@/lib/data-fetching';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Dashboard - StockGlide',
  description: 'Your StockGlide dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  // Fetch data (replace with your actual data fetching logic)
  const portfolios = await getPortfolios(user.id);
  const watchlists = await getWatchlists(user.id);
  const recentTransactions = await getRecentTransactions(user.id);
  
  // Calculate total portfolio value
  const totalPortfolioValue = portfolios.reduce((sum, portfolio) => sum + portfolio.value, 0);
  
  // Calculate total gain/loss
  const totalGainLoss = portfolios.reduce((sum, portfolio) => sum + portfolio.gainLoss, 0);
  const isPositive = totalGainLoss >= 0;
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user.name || user.username}! Here's your financial overview.
            </p>
          </div>
          
          {/* Portfolio summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard
              title="Total Portfolio Value"
              value={`$${totalPortfolioValue.toLocaleString()}`} 
              icon={<Briefcase className="text-blue-600" />}
            />
            <SummaryCard
              title="Today's Change"
              value={`${isPositive ? '+' : ''}$${Math.abs(totalGainLoss).toLocaleString()}`}
              change={`${isPositive ? '+' : '-'}${Math.abs((totalGainLoss / totalPortfolioValue) * 100).toFixed(2)}%`}
              trend={isPositive ? 'up' : 'down'}
              icon={isPositive ? <ArrowUp className="text-green-600" /> : <ArrowDown className="text-red-600" />}
            />
            <SummaryCard
              title="Active Portfolios"
              value={portfolios.length.toString()}
              icon={<List className="text-purple-600" />}
            />
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolios section */}
            <div className="bg-white rounded-lg shadow lg:col-span-2">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium">Your Portfolios</h2>
                <Link href="/portfolios" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="p-6">
                {portfolios.length > 0 ? (
                  <div className="space-y-4">
                    {portfolios.slice(0, 3).map((portfolio) => (
                      <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="You don't have any portfolios yet"
                    action="Create Portfolio"
                    href="/portfolios/new"
                  />
                )}
              </div>
            </div>
            
            {/* Watchlists section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium">Watchlists</h2>
                <Link href="/watchlists" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="p-6">
                {watchlists.length > 0 ? (
                  <div className="space-y-3">
                    {watchlists.slice(0, 5).map((watchlist) => (
                      <WatchlistItem key={watchlist.id} watchlist={watchlist} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No watchlists created"
                    action="Create Watchlist"
                    href="/watchlists/new"
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Recent transactions */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Recent Transactions</h2>
              <Link href="/transactions" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="p-6">
              {recentTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentTransactions.slice(0, 5).map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.symbol}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.price.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState
                  message="No recent transactions"
                  action="Record Transaction"
                  href="/transactions/new"
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Components
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

function SummaryCard({ title, value, change, trend, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className={`mt-1 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-2 bg-gray-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ portfolio }) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-medium">{portfolio.name}</h3>
        <p className="text-sm text-gray-500">{portfolio.stockCount} stocks</p>
      </div>
      <div className="text-right">
        <p className="font-medium">${portfolio.value.toLocaleString()}</p>
        <p className={`text-sm ${
          portfolio.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {portfolio.gainLoss >= 0 ? '+' : ''}
          ${Math.abs(portfolio.gainLoss).toLocaleString()} 
          ({portfolio.gainLossPercentage}%)
        </p>
      </div>
    </div>
  );
}

function WatchlistItem({ watchlist }) {
  return (
    <Link href={`/watchlists/${watchlist.id}`} className="block border rounded-lg p-3 hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{watchlist.name}</h3>
        <span className="text-xs text-gray-500">{watchlist.stockCount} stocks</span>
      </div>
    </Link>
  );
}

function EmptyState({ message, action, href }) {
  return (
    <div className="text-center py-6">
      <p className="text-gray-500 mb-4">{message}</p>
      <Link href={href} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        {action}
      </Link>
    </div>
  );
}
type Portfolio = {
    id: string;
    name: string;
    value: number;
    gainLoss: number;
    gainLossPercentage: string;
    stockCount: number;
  };
  
  type Watchlist = {
    id: string;
    name: string;
    stockCount: number;
  };
  
  type Transaction = {
    id: string;
    date: string;
    symbol: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    total: number;
  };
  
  // Mock data for demonstration
  const mockPortfolios: Portfolio[] = [
    { 
      id: '1', 
      name: 'Growth Portfolio', 
      value: 15437.82, 
      gainLoss: 1243.56, 
      gainLossPercentage: '+8.76%', 
      stockCount: 8 
    },
    { 
      id: '2', 
      name: 'Dividend Focus', 
      value: 24892.15, 
      gainLoss: -347.62, 
      gainLossPercentage: '-1.38%', 
      stockCount: 12 
    },
    { 
      id: '3', 
      name: 'Tech Stocks', 
      value: 8651.44, 
      gainLoss: 2318.91, 
      gainLossPercentage: '+36.67%', 
      stockCount: 5 
    }
  ];
  
  const mockWatchlists: Watchlist[] = [
    { id: '1', name: 'Tech Giants', stockCount: 5 },
    { id: '2', name: 'Renewable Energy', stockCount: 8 },
    { id: '3', name: 'Potential Buys', stockCount: 12 },
    { id: '4', name: 'IPO Tracking', stockCount: 6 }
  ];
  
  const mockTransactions: Transaction[] = [
    { 
      id: '1', 
      date: '2025-04-12', 
      symbol: 'AAPL', 
      type: 'buy', 
      quantity: 10, 
      price: 198.23, 
      total: 1982.30 
    },
    { 
      id: '2', 
      date: '2025-04-10', 
      symbol: 'MSFT', 
      type: 'buy', 
      quantity: 5, 
      price: 416.78, 
      total: 2083.90 
    },
    { 
      id: '3', 
      date: '2025-04-08', 
      symbol: 'TSLA', 
      type: 'sell', 
      quantity: 3, 
      price: 187.45, 
      total: 562.35 
    },
    { 
      id: '4', 
      date: '2025-04-05', 
      symbol: 'NVDA', 
      type: 'buy', 
      quantity: 2, 
      price: 892.67, 
      total: 1785.34 
    },
    { 
      id: '5', 
      date: '2025-04-02', 
      symbol: 'AMZN', 
      type: 'sell', 
      quantity: 8, 
      price: 182.36, 
      total: 1458.88 
    }
  ];
  
  export async function getPortfolios(userId: string): Promise<Portfolio[]> {
    // In a real app, you would fetch this data from your backend
    // For now, we'll return mock data
    return mockPortfolios;
  }
  
  export async function getWatchlists(userId: string): Promise<Watchlist[]> {
    // In a real app, you would fetch this data from your backend
    return mockWatchlists;
  }
  
  export async function getRecentTransactions(userId: string): Promise<Transaction[]> {
    // In a real app, you would fetch this data from your backend
    return mockTransactions;
  }
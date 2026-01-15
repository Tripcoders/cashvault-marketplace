
export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  badge?: string;
  successRate?: string;
  modules?: string;
  balance?: string;
  verified?: string;
  dataInfo?: string;
  price: number;
  priceType: 'subscription' | 'fixed' | 'premium';
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Stats {
  globalStock: string;
  activeUsers: string;
  volume24h: string;
  status: 'Operational' | 'Maintenance' | 'Down';
}

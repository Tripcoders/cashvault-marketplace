
import { Product, Stats } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SMS Interceptor v2',
    category: 'otp',
    type: 'OTP BOT',
    badge: 'TRENDING',
    successRate: '94%',
    modules: 'Bank, PP, Amz',
    price: 99.00,
    priceType: 'subscription',
    icon: 'smart_toy'
  },
  {
    id: '2',
    name: 'Aged Personal PP',
    category: 'paypal',
    type: 'United Kingdom • 2019',
    badge: 'ACTIVE',
    balance: '£420.00',
    verified: 'Bank + Card',
    price: 65.00,
    priceType: 'fixed',
    icon: 'payments'
  },
  {
    id: '3',
    name: 'Chase Business',
    category: 'bank',
    type: 'USA • Savings Account',
    badge: 'HIGH BALANCE',
    balance: '$12,450.00',
    dataInfo: 'Fullz + Cookies',
    price: 320.00,
    priceType: 'premium',
    icon: 'account_balance'
  },
  {
    id: '4',
    name: 'Wells Fargo Personal',
    category: 'bank',
    type: 'USA • Checking',
    balance: '$2,100.00',
    verified: 'Email Access',
    price: 150.00,
    priceType: 'fixed',
    icon: 'account_balance'
  },
  {
    id: '5',
    name: 'Windows RDP Admin',
    category: 'rdp',
    type: 'RDP/VPS',
    dataInfo: '16GB RAM • 8 vCPU',
    price: 45.00,
    priceType: 'subscription',
    icon: 'terminal'
  },
  {
    id: '6',
    name: 'Binance Verified Account',
    category: 'exchanges',
    type: 'Exchange Account',
    badge: 'KYC PASSED',
    verified: 'Full Access',
    price: 210.00,
    priceType: 'fixed',
    icon: 'currency_bitcoin'
  }
];

export const APP_STATS: Stats = {
  globalStock: '18,421',
  activeUsers: '4,812',
  volume24h: '$218.4k',
  status: 'Operational'
};

export const CATEGORIES = [
  { id: 'all', name: 'ALL ASSETS', icon: 'apps' },
  { id: 'bank', name: 'BANK LOGS', icon: 'account_balance' },
  { id: 'otp', name: 'OTP BOTS', icon: 'smart_toy' },
  { id: 'rdp', name: 'RDP/VPS', icon: 'terminal' },
  { id: 'paypal', name: 'PAYPAL', icon: 'payments' },
  { id: 'exchanges', name: 'EXCHANGES', icon: 'currency_bitcoin' },
];

export const CRYPTO_METHODS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
  { id: 'usdt', name: 'USDT (ERC20)', symbol: 'USDT', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png', address: 'LURv6XmUqMv6yW6Yq3vK5uE6ZqXy1qXy1q' },
];


import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import { PRODUCTS, APP_STATS, CATEGORIES, CRYPTO_METHODS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'select' | 'loading' | 'payment'>('select');
  const [selectedCrypto, setSelectedCrypto] = useState<typeof CRYPTO_METHODS[0] | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 20);
    };
    const mainEl = document.getElementById('main-scroll');
    mainEl?.addEventListener('scroll', handleScroll);
    return () => mainEl?.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Trigger small animation or toast here if needed
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const openCheckout = (product: Product) => {
    setCheckoutProduct(product);
    setCheckoutStep('select');
    setSelectedCrypto(null);
    setIsCheckoutOpen(true);
  };

  const handlePayNow = () => {
    if (!selectedCrypto) return;
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('payment');
    }, 2000);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex h-screen w-full bg-surface-dark transition-colors duration-500 overflow-hidden font-sans text-slate-100">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main id="main-scroll" className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative bg-[#020617]">

        {/* Urgent System Notice */}
        <div className="bg-primary/10 border-b border-primary/20 px-6 py-2.5 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
          <span className="material-symbols-outlined text-sm animate-pulse">warning</span>
          <span>Attention: Accounts with no top-up for 5+ days will be deleted. Minimum top-up is $150.00</span>
        </div>

        <header className={`sticky top-0 z-30 px-6 py-4 flex items-center justify-between transition-all duration-300 border-b ${scrolled ? 'bg-surface-dark/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent'}`}>
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-primary transition-colors">search</span>
              <input type="text" placeholder="Search accounts, bots, tools..." className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-surface-card border border-white/5 focus:bg-white/10 focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm text-white" />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <button onClick={toggleDarkMode} className="p-2.5 rounded-xl bg-surface-card text-slate-500 hover:text-white transition-all border border-white/5">
              <span className="material-symbols-outlined text-[22px]">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Cart Button */}
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2.5 rounded-xl bg-surface-card text-slate-500 hover:text-white transition-all border border-white/5">
              <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-surface-dark">
                  {cart.length}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Balance</span>
              <span className="text-white font-black text-sm">$1,240.00</span>
              <button className="bg-primary text-black p-1 rounded-lg hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-sm font-bold">add</span>
              </button>
            </div>

            <div className="relative cursor-pointer group">
              <div className="h-11 w-11 rounded-xl border-2 border-primary/20 overflow-hidden shadow-lg transition-transform group-hover:scale-105 active:scale-95">
                <img src="https://picsum.photos/100/100?random=88" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="p-3 border-b border-slate-100 dark:border-white/5 mb-2">
                  <p className="text-xs font-bold dark:text-white">Admin Account</p>
                  <p className="text-[10px] text-slate-500">Premium Member</p>
                </div>
                <div className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-bold transition-colors">Account Settings</div>
                <div className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-bold transition-colors">Order History</div>
                <div className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-bold transition-colors text-rose-500">Log Out</div>
              </div>
            </div>
          </div>
        </header>

        {/* Side Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-[#0a0f1d] shadow-2xl pointer-events-auto border-l border-white/5 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">Your Basket</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-4">shopping_bag</span>
                    <p className="text-sm font-bold uppercase tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-white/5 group">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold dark:text-white truncate">{item.name}</p>
                          <p className="text-xs text-slate-500 font-mono">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-rose-500 transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-white/5 bg-slate-50 dark:bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-xl font-black dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
                  onClick={() => {
                    setIsCartOpen(false);
                    openCheckout(cart[0]); // Default to first item for demo checkout
                  }}
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Crypto Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="bg-white dark:bg-[#0a0f1d] w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/10 animate-in zoom-in-95 duration-200">

              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Secure Payment</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Order #CV-{Math.floor(Math.random() * 90000 + 10000)}</p>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-8">
                {checkoutStep === 'select' && (
                  <div className="space-y-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Payment Method</p>
                    <div className="grid grid-cols-2 gap-4">
                      {CRYPTO_METHODS.map(method => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedCrypto(method)}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${selectedCrypto?.id === method.id ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                        >
                          <img src={method.icon} className="w-10 h-10 object-contain" alt={method.name} />
                          <span className="text-sm font-black dark:text-white uppercase">{method.symbol}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handlePayNow}
                      disabled={!selectedCrypto}
                      className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 mt-4"
                    >
                      Initialize Payment
                    </button>
                  </div>
                )}

                {checkoutStep === 'loading' && (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="relative w-24 h-24 mb-8">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-4xl">currency_bitcoin</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-black dark:text-white uppercase tracking-tight">Confirming Request</h4>
                    <p className="text-xs text-slate-500 mt-2">Connecting to secure blockchain gateway...</p>
                  </div>
                )}

                {checkoutStep === 'payment' && selectedCrypto && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col items-center text-center">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">Total Amount to Pay</p>
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-black dark:text-white">0.0024 {selectedCrypto.symbol}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 mt-2">≈ ${checkoutProduct?.price.toFixed(2)} USD</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Send funds to address below</p>
                      <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex items-center gap-4 group">
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Deposit Address ({selectedCrypto.name})</p>
                          <p className="text-xs font-mono dark:text-white truncate">{selectedCrypto.address}</p>
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 hover:bg-primary transition-colors group-hover:scale-105" title="Copy Address">
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setCheckoutStep('select')} className="flex-1 py-4 bg-white/5 hover:bg-white/10 dark:text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all">Go Back</button>
                      <button onClick={() => setIsCheckoutOpen(false)} className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/20">I Have Paid</button>
                    </div>
                    <p className="text-[9px] text-center text-slate-500 uppercase font-bold">Transaction will be confirmed after 3 network validations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {/* Categories Grid */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">Explore Categories</h3>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center justify-center h-28 rounded-2xl border transition-all duration-300 group ${selectedCategory === cat.id
                      ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                      : 'bg-surface-card border-white/5 hover:border-primary/40'
                    }`}
                >
                  <span className={`material-symbols-outlined mb-2 text-2xl transition-transform group-hover:scale-110 ${selectedCategory === cat.id ? 'text-primary fill-1 font-variation-fill-1' : 'text-slate-500 group-hover:text-primary'}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-[10px] font-bold tracking-wider ${selectedCategory === cat.id ? 'text-primary' : 'text-slate-500'}`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Hero Section */}
          <section className="mb-12 relative overflow-hidden rounded-[2.5rem] bg-surface-card border border-white/5 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
                THE <span className="text-primary">PLUG</span> YOU'VE BEEN <br /> LOOKING FOR.
              </h1>
              <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                Experience the next generation of digital asset trading. Real-time delivery, encrypted transactions, and 24/7 elite support.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">Start Browsing</button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Total Volume</p>
                    <p className="text-xl font-black text-white">$2.4M+</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
                </div>
              </div>
            </div>
          </section>

          {/* Trending Section Header */}
          <div className="flex items-center gap-6 mb-8 overflow-hidden">
            <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight whitespace-nowrap">
              {selectedCategory === 'all' ? 'All Active Assets' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="h-[2px] w-full bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 min-h-[400px]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onBuyNow={openCheckout}
                />
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-30">
                <span className="material-symbols-outlined text-6xl mb-4">inventory_2</span>
                <p className="text-lg font-black uppercase tracking-widest">No products found in this category</p>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-surface-card border border-white/5 rounded-[2rem]">
            <div>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Global Stock</span>
              <span className="text-white text-3xl font-extrabold tracking-tight">{APP_STATS.globalStock}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Active Users</span>
              <span className="text-white text-3xl font-extrabold tracking-tight">{APP_STATS.activeUsers}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">24h Volume</span>
              <span className="text-white text-3xl font-extrabold tracking-tight">{APP_STATS.volume24h}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">Network Status</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse"></div>
                <span className="text-emerald-500 text-xl font-black">{APP_STATS.status}</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="p-8 text-center text-slate-500 text-xs border-t border-white/5 mt-auto bg-surface-dark">
          <p>© 2025 CashVault Digital Asset Marketplace. All assets are subject to security verification.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateProductImage } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const generated = await generateProductImage(product.name);
      if (generated) setImageUrl(generated);
    };
    fetchImage();
  }, [product.name]);

  return (
    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl p-6 group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner overflow-hidden border border-primary/5">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-3xl">{product.icon}</span>
            )}
          </div>
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{product.type}</p>
          </div>
        </div>
        {product.badge && (
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-primary/20">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-3 mb-8 bg-slate-50/50 dark:bg-black/20 p-4 rounded-xl border border-slate-100 dark:border-white/5 transition-colors group-hover:bg-primary/[0.02]">
        {product.successRate && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Success Rate</span>
            <span className="text-emerald-500 font-black">{product.successRate}</span>
          </div>
        )}
        {product.modules && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Modules</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">{product.modules}</span>
          </div>
        )}
        {product.balance && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Balance</span>
            <span className="text-slate-900 dark:text-white font-bold font-mono text-sm">{product.balance}</span>
          </div>
        )}
        {product.verified && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Verified</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">{product.verified}</span>
          </div>
        )}
        {product.dataInfo && (
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">Data</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold line-clamp-1">{product.dataInfo}</span>
          </div>
        )}
      </div>

      <div className="mt-auto space-y-4">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {product.priceType === 'subscription' ? 'Subscription' : product.priceType === 'premium' ? 'Premium Price' : 'Fixed Price'}
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
            {product.priceType === 'subscription' && <span className="text-xs font-medium text-slate-500">/mo</span>}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white px-4 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5 group/btn"
          >
            <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:-translate-y-0.5">shopping_cart</span> Add
          </button>
          <button 
            onClick={() => onBuyNow(product)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-bold text-xs transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

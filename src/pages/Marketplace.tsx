/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  Copy,
  Sparkles,
  Download,
  IndianRupee,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import { storageService } from '../services/storageService';
import { GroceryItem } from '../types';

export default function Marketplace() {
  const [items, setItems] = useState<GroceryItem[]>(() => storageService.getGroceryList());
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<GroceryItem['category']>('Produce');
  const [copied, setCopied] = useState(false);

  const categories: GroceryItem['category'][] = [
    'Produce',
    'Grains & Seeds',
    'Legumes & Pulses',
    'Dairy & Plant Mylk',
    'Spices & Pantry',
  ];

  const handleToggle = (id: string) => {
    const updated = items.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it));
    setItems(updated);
    storageService.saveGroceryList(updated);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    storageService.saveGroceryList(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: GroceryItem = {
      id: `gro_custom_${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: '1 pack',
      checked: false,
      pcosFriendly: true,
      estimatedPriceINR: 80,
    };

    const updated = [newItem, ...items];
    setItems(updated);
    storageService.saveGroceryList(updated);
    setNewItemName('');
  };

  const handleCopyClipboard = () => {
    const text = items
      .map((it) => `${it.checked ? '[✓]' : '[ ]'} ${it.name} (${it.quantity}) - ${it.category}`)
      .join('\n');
    navigator.clipboard.writeText(`Flourish AI Grocery List:\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const totalEstimatedCost = items.reduce((acc, it) => acc + (it.estimatedPriceINR || 50), 0);
  const completedCount = items.filter((it) => it.checked).length;

  return (
    <div className="min-h-screen bg-[#FFF9FB] flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F9DCE7] text-[#C65B83] mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Smart Grocery & Pantry Planner</span>
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#382536]">
              Flourish Market • Shop With Your Flow
            </h1>
            <p className="text-xs text-[#897887]">
              Essential pantry and fresh foods automatically assembled from your cycle meal plan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyClipboard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#F9DCE7] text-[#382536] hover:bg-[#FFF9FB] transition shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy List'}</span>
            </button>
          </div>
        </div>

        {/* Budget & Progress Overview Card */}
        <div className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#897887]">
              Shopping Progress
            </span>
            <div className="text-xl font-bold text-[#382536]">
              {completedCount} of {items.length} items purchased
            </div>
            <div className="w-48 bg-[#F9DCE7] h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#C65B83] h-full transition-all duration-300"
                style={{ width: `${items.length > 0 ? (completedCount / items.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9FB] border border-[#F9DCE7] text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#897887] block">
              Estimated Total Basket
            </span>
            <div className="text-2xl font-serif-title font-bold text-[#C65B83]">
              ₹{totalEstimatedCost}
            </div>
            <span className="text-[10px] text-[#897887]">Regional Indian Average</span>
          </div>
        </div>

        {/* Add Item Form */}
        <form
          onSubmit={handleAddItem}
          className="p-4 rounded-2xl bg-white border border-[#F9DCE7] flex flex-col sm:flex-row items-center gap-3 shadow-xs"
        >
          <input
            type="text"
            placeholder="Add grocery item (e.g. Organic Chia Seeds, Pumpkin seeds, A2 Ghee)..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 w-full p-2.5 rounded-xl border border-[#F9DCE7] text-xs text-[#382536] outline-hidden focus:border-[#C65B83]"
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as any)}
            className="w-full sm:w-48 p-2.5 rounded-xl border border-[#F9DCE7] text-xs text-[#382536]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#C65B83] text-white hover:bg-[#8E2B54] transition shrink-0 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </form>

        {/* Items Grouped by Category */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const catItems = items.filter((it) => it.category === cat);
            if (catItems.length === 0) return null;

            return (
              <div
                key={cat}
                className="p-6 rounded-3xl bg-white border border-[#F9DCE7] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#F9DCE7]">
                  <h3 className="font-serif-title text-lg font-bold text-[#382536]">
                    {cat}
                  </h3>
                  <span className="text-xs text-[#897887]">{catItems.length} items</span>
                </div>

                <div className="divide-y divide-[#F9DCE7]">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <label className="flex items-center gap-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggle(item.id)}
                          className="w-4 h-4 accent-[#C65B83] rounded-md cursor-pointer"
                        />
                        <div className={item.checked ? 'line-through text-[#897887]' : 'text-[#382536]'}>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-[11px] text-[#897887] ml-2 font-mono">
                            ({item.quantity})
                          </span>
                          {item.sourceRecipeTitle && (
                            <span className="hidden sm:inline-block ml-2 text-[10px] text-[#C65B83] bg-[#F9DCE7]/50 px-2 py-0.5 rounded-full">
                              From: {item.sourceRecipeTitle}
                            </span>
                          )}
                        </div>
                      </label>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#897887]">
                          ₹{item.estimatedPriceINR}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded-md text-[#897887] hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

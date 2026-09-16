
import { useState, useEffect } from 'react';
import type { CategoryInfo } from '../types';
import { api } from '../services/api';
import { CategoryCard } from '../components/category/CategoryCard';
import { Compass, Search } from 'lucide-react';

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5" /> All Welfare Categories
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            Browse Schemes by Sector
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Find targeted subsidies, scholarships, pensions, and welfare assistance arranged by department.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

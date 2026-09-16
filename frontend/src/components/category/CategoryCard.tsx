
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryInfo } from '../../types';
import { ArrowRight } from 'lucide-react';

export const CategoryCard: FC<{ category: CategoryInfo }> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#CFC8BE] hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="w-13 h-13 rounded-2xl bg-[#F7F5F2] border border-[#E5E7EB] text-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#CFC8BE] transition-all">
          {category.icon}
        </div>
        <h3 className="font-serif font-bold text-[#1E3A5F] text-lg mb-2 group-hover:text-[#142842] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-[#374151] leading-relaxed line-clamp-2 mb-4 font-light">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
        <span className="text-[#1E3A5F] bg-[#F7F5F2] border border-[#E5E7EB] px-2.5 py-0.5 rounded-full font-medium">
          {category.schemesCount}+ Schemes
        </span>
        <span className="text-[#374151] group-hover:text-[#1E3A5F] flex items-center gap-1 transition-colors font-medium">
          Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};

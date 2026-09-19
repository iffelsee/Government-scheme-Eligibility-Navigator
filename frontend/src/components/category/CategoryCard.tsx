
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryInfo } from '../../types';
import { ArrowRight } from 'lucide-react';

export const CategoryCard: FC<{ category: CategoryInfo }> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="bg-[#F5F3EE] rounded-2xl border border-[#BDC4D4] p-6 hover:border-[#0F1A2B] hover:shadow-md transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="w-13 h-13 rounded-2xl bg-[#EBE8E1] border border-[#BDC4D4] text-2xl flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#0F1A2B] transition-all">
          {category.icon}
        </div>
        <h3 className="font-serif font-bold text-[#0F1A2B] text-lg mb-2 group-hover:text-[#1C2E4A] transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-[#52677D] leading-relaxed line-clamp-2 mb-4 font-light">
          {category.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#BDC4D4] flex items-center justify-between text-xs">
        <span className="text-[#0F1A2B] bg-[#EBE8E1] border border-[#BDC4D4] px-2.5 py-0.5 rounded-full font-medium">
          {category.schemesCount}+ Schemes
        </span>
        <span className="text-[#52677D] group-hover:text-[#0F1A2B] flex items-center gap-1 transition-colors font-medium">
          Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
};

import * as React from 'react';
import { Search, ChevronRight, BookOpen, Tag } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { ARTICLES } from '../data/articles';
import { Language } from '../data/translations';
import { cn } from '../lib/utils';

interface KnowledgeHubProps {
  lang: Language;
}

export const KnowledgeHub = ({ lang }: KnowledgeHubProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = ['solar', 'cooking', 'efficiency'];

  const filteredArticles = ARTICLES.filter(a => {
    const matchesSearch = a.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.content[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Hub</h1>
          <p className="text-sm text-gray-500 font-medium">Learn how to optimize your energy usage and stay safe.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                    !selectedCategory ? "bg-[#00A1DE] text-white" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  All Articles
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors",
                      selectedCategory === cat ? "bg-[#00A1DE] text-white" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#141414] text-white">
            <CardContent className="p-4 space-y-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[#00A1DE]">
                <BookOpen size={18} />
              </div>
              <h4 className="font-bold text-sm">Offline Access</h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                All these guides are available offline. You can read them even without an internet connection.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search guides, tips, and safety info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#00A1DE] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map(article => (
              <Card key={article.id} className="hover:border-[#00A1DE] transition-all cursor-pointer group">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  <div className={cn(
                    "w-full md:w-48 h-32 rounded-xl shrink-0 flex items-center justify-center",
                    article.category === 'solar' ? "bg-yellow-50 text-yellow-600" : 
                    article.category === 'cooking' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                  )}>
                    <BookOpen size={40} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md",
                        article.category === 'solar' ? "bg-yellow-100 text-yellow-700" : 
                        article.category === 'cooking' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                        <Tag size={10} />
                        {article.tags.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 group-hover:text-[#00A1DE] transition-colors">
                      {article.title[lang]}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {article.content[lang]}
                    </p>
                    <div className="flex items-center text-[#00A1DE] text-sm font-bold pt-2">
                      Read Full Guide <ChevronRight size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-medium">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

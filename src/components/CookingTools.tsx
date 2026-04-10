import * as React from 'react';
import { Flame, TrendingDown, Clock, Heart, Info, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { formatCurrency, cn } from '../lib/utils';

export const CookingTools = () => {
  const [charcoalSpend, setCharcoalSpend] = React.useState(15000);
  
  const lpgCost = charcoalSpend * 0.65;
  const epcCost = charcoalSpend * 0.45;
  const savings = charcoalSpend - lpgCost;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cooking Cost Calculator</h1>
        <p className="text-sm text-gray-500 font-medium">Compare the cost of different cooking fuels in Rwanda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Current Charcoal Spend</h3>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Monthly Spend (RWF)</label>
                  <span className="text-3xl font-black text-[#141414]">{formatCurrency(charcoalSpend)}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="100000" 
                  step="5000"
                  value={charcoalSpend}
                  onChange={(e) => setCharcoalSpend(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#141414]"
                />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                  <span>5,000 RWF</span>
                  <span>50,000 RWF</span>
                  <span>100,000 RWF</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm border-t-4 border-t-[#00A1DE]">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#00A1DE]/10 rounded-xl flex items-center justify-center text-[#00A1DE]">
                    <Flame size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">Recommended</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Switch to LPG (Gas)</h4>
                  <p className="text-xs text-gray-500 font-medium">Monthly cost: {formatCurrency(lpgCost)}</p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-emerald-600 font-bold">
                  <TrendingDown size={18} />
                  Save {formatCurrency(savings)} / month
                </div>
                <ul className="space-y-2 pt-2">
                  {['Faster cooking', 'No smoke', 'Better for health'].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                      <div className="w-1 h-1 rounded-full bg-[#00A1DE]" /> {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm border-t-4 border-t-[#20603D]">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#20603D]/10 rounded-xl flex items-center justify-center text-[#20603D]">
                    <Clock size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded uppercase">Most Efficient</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Switch to EPC</h4>
                  <p className="text-xs text-gray-500 font-medium">Monthly cost: {formatCurrency(epcCost)}</p>
                </div>
                <div className="pt-2 flex items-center gap-2 text-emerald-600 font-bold">
                  <TrendingDown size={18} />
                  Save {formatCurrency(charcoalSpend - epcCost)} / month
                </div>
                <ul className="space-y-2 pt-2">
                  {['90% energy efficient', 'Cook beans in 45 min', 'Automatic timers'].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                      <div className="w-1 h-1 rounded-full bg-[#20603D]" /> {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-rose-50">
            <CardContent className="p-6 space-y-4">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
                <Heart size={20} />
              </div>
              <h4 className="font-bold text-rose-900">Health Impact</h4>
              <p className="text-xs text-rose-800 leading-relaxed font-medium">
                Cooking with charcoal or wood indoors is equivalent to smoking 2 packs of cigarettes a day. 
                Switching to LPG or EPC eliminates harmful smoke and protects your family's lungs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="font-bold text-gray-900">Quick Comparison</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {[
                  { label: 'Charcoal', speed: 'Slow', cost: 'High', health: 'Poor' },
                  { label: 'LPG Gas', speed: 'Fast', cost: 'Medium', health: 'Good' },
                  { label: 'EPC', speed: 'Very Fast', cost: 'Low', health: 'Excellent' },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-900">{item.label}</span>
                    <div className="flex gap-4 text-[10px] font-bold uppercase">
                      <span className="text-gray-400">{item.speed}</span>
                      <span className={cn(
                        item.cost === 'Low' ? "text-emerald-500" : item.cost === 'High' ? "text-rose-500" : "text-blue-500"
                      )}>{item.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full flex items-center justify-between group">
            Find LPG Suppliers <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

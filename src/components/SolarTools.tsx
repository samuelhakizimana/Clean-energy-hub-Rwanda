import * as React from 'react';
import { Zap, Sun, TrendingUp, DollarSign, Battery, Info } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { MARKET_DATA } from '../data/marketData';
import { formatCurrency, cn } from '../lib/utils';

export const SolarTools = () => {
  const [consumption, setConsumption] = React.useState(100);
  
  const kits = [
    { id: 'basic', ...MARKET_DATA.solar.kitBasic },
    { id: 'medium', ...MARKET_DATA.solar.kitMedium },
    { id: 'large', ...MARKET_DATA.solar.kitLarge },
  ];

  const recommendedKit = consumption < 30 ? kits[0] : consumption < 150 ? kits[1] : kits[2];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Solar Sizing Tool</h1>
        <p className="text-sm text-gray-500 font-medium">Estimate the solar system size you need based on your usage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-gray-50">
              <h3 className="font-bold text-gray-900">1. Monthly Consumption</h3>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Monthly Usage (kWh)</label>
                  <span className="text-3xl font-black text-[#00A1DE]">{consumption} kWh</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00A1DE]"
                />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                  <span>10 kWh</span>
                  <span>250 kWh</span>
                  <span>500 kWh</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl flex gap-3">
                <Info className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Your monthly usage is usually found on your REG bill or token receipt. 
                  Higher usage requires more panels and larger batteries.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Available Solar Kits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kits.map(kit => (
                <Card 
                  key={kit.id} 
                  className={cn(
                    "border-2 transition-all",
                    recommendedKit.id === kit.id ? "border-[#00A1DE] ring-4 ring-[#00A1DE]/5" : "border-transparent"
                  )}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      recommendedKit.id === kit.id ? "bg-[#00A1DE] text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <Sun size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 capitalize">{kit.id} Kit</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{kit.capacityWatts}W Capacity</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed min-h-[40px]">
                      {kit.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-lg font-black text-gray-900">{formatCurrency(kit.estPrice)}</span>
                    </div>
                    {recommendedKit.id === kit.id && (
                      <div className="bg-[#00A1DE] text-white text-[10px] font-bold uppercase py-1 px-2 rounded text-center">
                        Recommended
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-[#141414] text-white">
            <CardHeader className="border-b border-white/10">
              <h3 className="font-bold">Estimated Impact</h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#FAD201]">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Monthly Savings</p>
                    <p className="text-lg font-bold">{formatCurrency(consumption * 249 * 0.8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#00A1DE]">
                    <Battery size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Grid Displacement</p>
                    <p className="text-lg font-bold">80% - 95%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Payback Period</p>
                    <p className="text-lg font-bold">~14 Months</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full bg-[#00A1DE] border-none py-6">
                Get Quotation
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-gray-900 flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" /> Why Solar?
              </h4>
              <ul className="space-y-3">
                {[
                  'No more monthly bills',
                  'Reliable power during outages',
                  'Environmentally friendly',
                  'Increases property value'
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A1DE] mt-1.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

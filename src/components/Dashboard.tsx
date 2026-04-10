import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Flame, Leaf, TrendingUp, 
  Download, MessageCircle, RefreshCw, 
  Search, ChevronRight, Info,
  ArrowUpRight, ArrowDownRight,
  MoreVertical, Calendar, Edit2,
  BrainCircuit
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent } from './ui/Card';
import { TRANSLATIONS, Language } from '../data/translations';
import { UserState, INITIAL_STATE, View } from '../lib/storageManager';
import { calculateKwhFromBill, calculateCookingComparison } from '../lib/billingEngine';
import { formatCurrency, cn } from '../lib/utils';
import { ARTICLES } from '../data/articles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DashboardProps {
  state: UserState;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
  lang: Language;
}

export const Dashboard = ({ state, setState, lang }: DashboardProps) => {
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = React.useState('');

  const { totalKwh, currentTier } = calculateKwhFromBill(state.monthlyBill);
  const cookingComp = calculateCookingComparison(state.cookingSpend, state.cookingFuel || '');
  
  const filteredArticles = ARTICLES.filter(a => 
    a.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  const setView = (view: View) => {
    setState(prev => ({ ...prev, activeView: view }));
  };

  const reset = () => {
    if (confirm('Are you sure you want to start a new assessment?')) {
      setState(INITIAL_STATE);
    }
  };

  const handleWhatsApp = () => {
    const message = t.consulting.whatsapp.replace('{bill}', state.monthlyBill.toString());
    window.open(`https://wa.me/250780000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Chart Data
  const barData = {
    labels: ['Charcoal', 'LPG', 'EPC'],
    datasets: [
      {
        label: 'Monthly Cost (RWF)',
        data: [state.cookingSpend, state.cookingSpend * 0.65, state.cookingSpend * 0.45],
        backgroundColor: ['#141414', '#00A1DE', '#20603D'],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ['Grid', 'Solar Potential'],
    datasets: [
      {
        data: [20, 80],
        backgroundColor: ['#FAD201', '#00A1DE'],
        borderWidth: 0,
      },
    ],
  };

  const stats = [
    { 
      label: 'Monthly Bill', 
      value: formatCurrency(state.monthlyBill), 
      trend: '+2.5%', 
      trendUp: true,
      icon: <Zap size={20} />,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      editable: true
    },
    { 
      label: 'Energy Usage', 
      value: `${Math.round(totalKwh)} kWh`, 
      trend: '-12%', 
      trendUp: false,
      icon: <TrendingUp size={20} />,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      editable: true
    },
    { 
      label: 'Cooking Cost', 
      value: formatCurrency(state.cookingSpend), 
      trend: 'Stable', 
      trendUp: null,
      icon: <Flame size={20} />,
      color: 'text-green-600',
      bg: 'bg-green-50',
      editable: true
    },
    { 
      label: 'CO2 Saved', 
      value: '12.4 kg', 
      trend: '+15%', 
      trendUp: true,
      icon: <Leaf size={20} />,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      editable: false
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Energy Overview</h1>
          <p className="text-sm text-gray-500 font-medium">Welcome back, here is your personalized energy report.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setState(prev => ({ 
              ...INITIAL_STATE, 
              language: prev.language, 
              activeView: 'dashboard' 
            }))}
            className="h-9 px-4 rounded-lg border-gray-200 hover:bg-gray-50 flex items-center gap-2"
          >
            <RefreshCw size={14} className="text-[#00A1DE]" />
            Renew Data
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-500">
            <Calendar size={14} />
            April 2026
          </div>
          <Button variant="primary" size="sm" className="h-9 px-4 rounded-lg shadow-sm shadow-[#00A1DE]/20">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Hero Action Card */}
      <Card className="border-none shadow-sm bg-gradient-to-r from-[#00A1DE] to-[#0081B2] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={120} />
        </div>
        <CardContent className="p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-black">Is your data up to date?</h2>
            <p className="text-sm text-blue-50 font-medium max-w-md">
              Market prices for LPG and Charcoal change frequently. Renew your assessment to get the most accurate savings projections.
            </p>
          </div>
          <Button 
            onClick={() => setState(prev => ({ 
              ...INITIAL_STATE, 
              language: prev.language, 
              activeView: 'dashboard' 
            }))}
            className="bg-white text-[#00A1DE] hover:bg-blue-50 border-none px-8 py-6 h-auto font-black text-lg shadow-xl"
          >
            Update My Info
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl", stat.bg, stat.color)}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1">
                  {stat.editable && (
                    <button 
                      onClick={() => setView('settings')}
                      className="p-1.5 text-gray-300 hover:text-[#00A1DE] hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Edit values"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  <button className="text-gray-300 hover:text-gray-500 p-1.5">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                {stat.trendUp !== null && (
                  <span className={cn(
                    "text-[10px] font-bold flex items-center mb-1",
                    stat.trendUp ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.trend}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50">
            <div>
              <h3 className="font-bold text-gray-900">Cooking Cost Comparison</h3>
              <p className="text-xs text-gray-400 font-medium">Comparison of monthly spend across fuels</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00A1DE]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">LPG</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#141414]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Charcoal</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 h-[300px] flex items-center justify-center">
            <Bar 
              data={barData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
              }} 
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Energy Source Split</h3>
            <p className="text-xs text-gray-400 font-medium">Potential grid displacement</p>
          </CardHeader>
          <CardContent className="p-6 h-[300px] flex flex-col items-center justify-center">
            <div className="w-48 h-48 relative">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  cutout: '75%',
                  plugins: { legend: { display: false } }
                }} 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900">80%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Solar</span>
              </div>
            </div>
            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A1DE]" />
                  <span className="text-xs font-semibold text-gray-600">Solar Potential</span>
                </div>
                <span className="text-xs font-bold text-gray-900">80%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FAD201]" />
                  <span className="text-xs font-semibold text-gray-600">Grid Reliance</span>
                </div>
                <span className="text-xs font-bold text-gray-900">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations & Knowledge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recommended Actions</h3>
            <button className="text-xs font-bold text-[#00A1DE] hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                title: 'Install 500W Solar Kit', 
                desc: 'Reduce your grid reliance by 80% and save 350k RWF annually.',
                icon: <Zap size={18} />,
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
              },
              { 
                title: 'Switch to LPG Cooking', 
                desc: 'Cleaner, faster, and 35% cheaper than charcoal over 12 months.',
                icon: <Flame size={18} />,
                color: 'text-orange-500',
                bg: 'bg-orange-50'
              },
            ].map((action, i) => (
              <Card key={i} className="border-none shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", action.bg, action.color)}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{action.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-gray-900">Consultation</h3>
          <Card className="bg-[#141414] text-white border-none shadow-xl shadow-gray-200">
            <CardContent className="p-6 space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MessageCircle size={24} className="text-[#00A1DE]" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Expert Guidance</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Connect with certified energy experts in Rwanda to implement your plan.
                </p>
              </div>
              <Button onClick={handleWhatsApp} variant="primary" className="w-full h-11 rounded-lg bg-[#00A1DE] hover:bg-[#0081B2] border-none">
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-50/50">
            <CardContent className="p-5 flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0" />
              <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                Your data is stored securely on this device. We use it only to generate these recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

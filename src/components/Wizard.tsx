import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Home, Briefcase, ArrowRight, ArrowLeft, Zap, Flame, Info } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { TRANSLATIONS, Language } from '../data/translations';
import { UserState } from '../lib/storageManager';
import { cn } from '../lib/utils';

interface WizardProps {
  state: UserState;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
  lang: Language;
}

export const Wizard = ({ state, setState, lang }: WizardProps) => {
  const t = TRANSLATIONS[lang];

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(0, prev.step - 1) }));

  const updateState = (updates: Partial<UserState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const steps = [
    // Step 0: Profile Selection
    <div key="step0" className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">{t.profile.question}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'urban', icon: <Home />, label: t.profile.urban },
          { id: 'rural', icon: <User />, label: t.profile.rural },
          { id: 'business', icon: <Briefcase />, label: t.profile.business },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => {
              updateState({ profile: p.id as any });
              nextStep();
            }}
            className={cn(
              "flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all duration-300",
              state.profile === p.id 
                ? "border-[#00A1DE] bg-[#00A1DE]/5 text-[#00A1DE]" 
                : "border-gray-100 hover:border-gray-200 bg-white"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              state.profile === p.id ? "bg-[#00A1DE] text-white" : "bg-gray-100 text-gray-500"
            )}>
              {p.icon}
            </div>
            <span className="font-bold text-sm text-center">{p.label}</span>
          </button>
        ))}
      </div>
    </div>,

    // Step 1: Electricity Bill
    <div key="step1" className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#FAD201] rounded-xl flex items-center justify-center text-[#141414]">
          <Zap size={24} />
        </div>
        <h2 className="text-2xl font-bold">{t.billing.question}</h2>
      </div>
      
      <div className="relative">
        <input
          type="number"
          value={state.monthlyBill || ''}
          onChange={(e) => updateState({ monthlyBill: Number(e.target.value) })}
          placeholder={t.billing.placeholder}
          className="w-full text-4xl font-bold p-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00A1DE] transition-all"
        />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">RWF</span>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-700 text-sm">
        <Info className="shrink-0" size={20} />
        <p>{t.common.privacy}</p>
      </div>

      <div className="flex justify-between pt-8">
        <Button variant="ghost" onClick={prevStep} className="flex items-center gap-2">
          <ArrowLeft size={18} /> {t.common.back}
        </Button>
        <Button onClick={nextStep} disabled={!state.monthlyBill} className="flex items-center gap-2">
          {t.common.next} <ArrowRight size={18} />
        </Button>
      </div>
    </div>,

    // Step 2: Cooking Fuel
    <div key="step2" className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#20603D] rounded-xl flex items-center justify-center text-white">
          <Flame size={24} />
        </div>
        <h2 className="text-2xl font-bold">{t.cooking.question}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'charcoal', label: t.cooking.charcoal },
          { id: 'lpg', label: t.cooking.lpg },
          { id: 'wood', label: t.cooking.wood },
          { id: 'epc', label: t.cooking.epc },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => updateState({ cookingFuel: f.id as any })}
            className={cn(
              "p-6 rounded-xl border-2 text-left transition-all duration-200",
              state.cookingFuel === f.id 
                ? "border-[#20603D] bg-[#20603D]/5 font-bold" 
                : "border-gray-100 bg-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {state.cookingFuel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-4"
        >
          <label className="block font-bold text-gray-700">{t.cooking.costQuestion}</label>
          <div className="relative">
            <input
              type="number"
              value={state.cookingSpend || ''}
              onChange={(e) => updateState({ cookingSpend: Number(e.target.value) })}
              placeholder="e.g. 5000"
              className="w-full text-2xl font-bold p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#20603D] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">RWF</span>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between pt-8">
        <Button variant="ghost" onClick={prevStep} className="flex items-center gap-2">
          <ArrowLeft size={18} /> {t.common.back}
        </Button>
        <Button 
          onClick={() => updateState({ isComplete: true })} 
          disabled={!state.cookingFuel || !state.cookingSpend} 
          className="flex items-center gap-2"
        >
          {t.common.finish} <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {state.step + 1} of {steps.length}</span>
          <span className="text-xs font-bold text-[#00A1DE] uppercase tracking-widest">{Math.round(((state.step + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00A1DE]"
            initial={{ width: 0 }}
            animate={{ width: `${((state.step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            {steps[state.step]}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

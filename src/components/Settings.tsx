import * as React from 'react';
import { Settings as SettingsIcon, User, Zap, Flame, Save, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { UserState, INITIAL_STATE } from '../lib/storageManager';
import { formatCurrency } from '../lib/utils';

interface SettingsProps {
  state: UserState;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
}

export const Settings = ({ state, setState }: SettingsProps) => {
  const [localBill, setLocalBill] = React.useState(state.monthlyBill);
  const [localCooking, setLocalCooking] = React.useState(state.cookingSpend);
  const [hasChanges, setHasChanges] = React.useState(false);

  const handleSave = () => {
    setState(prev => ({
      ...prev,
      monthlyBill: localBill,
      cookingSpend: localCooking
    }));
    setHasChanges(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setState(INITIAL_STATE);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <SettingsIcon className="text-gray-400" size={24} /> Account Settings
        </h1>
        <p className="text-sm text-gray-500 font-medium">Manage your energy profile and financial inputs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-gray-50 flex flex-row items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Zap size={18} className="text-[#00A1DE]" /> Electricity Profile
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-500 uppercase">Monthly Bill (RWF)</label>
                  <span className="text-xl font-black text-[#00A1DE]">{formatCurrency(localBill)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="1000"
                  value={localBill}
                  onChange={(e) => {
                    setLocalBill(Number(e.target.value));
                    setHasChanges(true);
                  }}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00A1DE]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Flame size={18} className="text-orange-500" /> Cooking Profile
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-500 uppercase">Monthly Cooking Spend (RWF)</label>
                  <span className="text-xl font-black text-orange-600">{formatCurrency(localCooking)}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="500"
                  value={localCooking}
                  onChange={(e) => {
                    setLocalCooking(Number(e.target.value));
                    setHasChanges(true);
                  }}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {hasChanges && (
            <div className="flex justify-end gap-3 animate-in slide-in-from-bottom-4">
              <Button variant="outline" onClick={() => {
                setLocalBill(state.monthlyBill);
                setLocalCooking(state.cookingSpend);
                setHasChanges(false);
              }}>
                Discard Changes
              </Button>
              <Button onClick={handleSave} className="bg-[#00A1DE] flex items-center gap-2">
                <Save size={18} /> Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b border-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <User size={18} className="text-gray-400" /> User Profile
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Profile Type</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{state.profile || 'Not Set'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Primary Language</p>
                <p className="text-sm font-bold text-gray-900 uppercase">{state.language}</p>
              </div>
              <div className="pt-4 space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => setState(prev => ({ 
                    ...INITIAL_STATE, 
                    language: prev.language, 
                    activeView: 'dashboard' 
                  }))}
                  className="w-full border-[#00A1DE]/20 text-[#00A1DE] hover:bg-[#00A1DE]/5 flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={16} /> Renew Assessment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="w-full border-rose-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={16} /> Reset All Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-2">Why update this?</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Updating your monthly spend ensures that the ROI calculations, solar sizing recommendations, and AI advisor insights are as accurate as possible for your current situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

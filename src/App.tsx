import * as React from 'react';
import { Layout } from './components/Layout';
import { Wizard } from './components/Wizard';
import { Dashboard } from './components/Dashboard';
import { KnowledgeHub } from './components/KnowledgeHub';
import { SolarTools } from './components/SolarTools';
import { CookingTools } from './components/CookingTools';
import { AIHelper } from './components/AIHelper';
import { Settings } from './components/Settings';
import { StorageManager, INITIAL_STATE, UserState, View } from './lib/storageManager';
import { Language } from './data/translations';
import { Button } from './components/ui/Button';
import { Sun, ArrowRight } from 'lucide-react';

export default function App() {
  const [state, setState] = React.useState<UserState>(() => {
    return StorageManager.load() || INITIAL_STATE;
  });
  const [isStarted, setIsStarted] = React.useState(false);

  // Sync state to local storage
  React.useEffect(() => {
    StorageManager.save(state);
  }, [state]);

  const setLang = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const setView = (view: View) => {
    setState(prev => ({ ...prev, activeView: view }));
  };

  // Welcome Screen
  if (!isStarted && state.step === 0 && !state.isComplete) {
    return (
      <Layout 
        lang={state.language} 
        setLang={setLang} 
        activeView={state.activeView} 
        setView={setView}
      >
        <div className="max-w-4xl mx-auto text-center py-12 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A1DE]/10 text-[#00A1DE] rounded-full font-bold text-sm uppercase tracking-widest">
            <Sun size={16} /> Clean Energy Hub Rwanda
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#141414] leading-[0.9]">
            TRANSITION TO <br />
            <span className="text-[#00A1DE]">CLEAN ENERGY</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Assess your energy bills, compare technologies, and get a personalized plan to save money and the environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              onClick={() => {
                if (state.step === 0) {
                  setState(prev => ({ ...INITIAL_STATE, language: prev.language, activeView: prev.activeView }));
                }
                setIsStarted(true);
              }} 
              className="w-full sm:w-auto flex items-center gap-2"
            >
              {state.step > 0 ? 'Resume Assessment' : 'Start Assessment'} <ArrowRight size={20} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => { setView('knowledge'); setIsStarted(true); }} className="w-full sm:w-auto">
              Browse Guides
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16">
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-[#FAD201]">80%</h3>
              <p className="text-sm font-bold text-gray-400 uppercase">Potential Savings</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-[#20603D]">100%</h3>
              <p className="text-sm font-bold text-gray-400 uppercase">Offline Capable</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-[#00A1DE]">0%</h3>
              <p className="text-sm font-bold text-gray-400 uppercase">Data Shared</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const renderView = () => {
    if (!state.isComplete && state.activeView === 'dashboard') {
      return <Wizard state={state} setState={setState} lang={state.language} />;
    }

    switch (state.activeView) {
      case 'dashboard':
        return <Dashboard state={state} setState={setState} lang={state.language} />;
      case 'knowledge':
        return <KnowledgeHub lang={state.language} />;
      case 'solar':
        return <SolarTools />;
      case 'cooking':
        return <CookingTools />;
      case 'ai_helper':
        return <AIHelper state={state} setState={setState} />;
      case 'settings':
        return <Settings state={state} setState={setState} />;
      default:
        return <Dashboard state={state} setState={setState} lang={state.language} />;
    }
  };

  return (
    <Layout 
      lang={state.language} 
      setLang={setLang} 
      activeView={state.activeView} 
      setView={setView}
    >
      {renderView()}
    </Layout>
  );
}

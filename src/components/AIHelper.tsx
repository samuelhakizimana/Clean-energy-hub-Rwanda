import * as React from 'react';
import { Sparkles, Send, Bot, User, Loader2, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { UserState, INITIAL_STATE } from '../lib/storageManager';
import { MARKET_DATA } from '../data/marketData';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIHelperProps {
  state: UserState;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
}

export const AIHelper = ({ state, setState }: AIHelperProps) => {
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm your Clean Energy Advisor. Based on your profile and current market prices in Rwanda, I can help you decide which energy source is best for your home or business. What would you like to know?" 
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const context = `
        User Profile: ${state.profile}
        Monthly Electricity Bill: ${state.monthlyBill} RWF
        Current Cooking Fuel: ${state.cookingFuel}
        Monthly Cooking Spend: ${state.cookingSpend} RWF
        
        Market Prices in Rwanda:
        - Electricity (REG): ${MARKET_DATA.reg.lifeline.rate} RWF/kWh (Lifeline), ${MARKET_DATA.reg.tier3.rate} RWF/kWh (Standard)
        - Charcoal: ${MARKET_DATA.charcoal.pricePerSack / 30} RWF/kg (Approx)
        - LPG (Gas): ${MARKET_DATA.lpg.pricePerKg} RWF/kg
        - Pellets: ~150-200 RWF/kg (Estimate)
        - Solar Kits: Basic (${MARKET_DATA.solar.kitBasic.estPrice} RWF), Medium (${MARKET_DATA.solar.kitMedium.estPrice} RWF)
        
        Task: Provide a concise, expert recommendation on whether the user should switch to Solar, LPG, Pellets, or stay with their current setup. 
        Focus on cost savings, health benefits, and environmental impact. 
        Keep the tone professional, helpful, and localized to Rwanda.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: context + "\n\nUser Question: " + userMessage }] }
        ],
        config: {
          systemInstruction: "You are an expert Clean Energy Advisor for Rwanda. You help citizens transition from charcoal/wood to clean energy like Solar, LPG, and EPCs. You use current market data to provide accurate financial advice."
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("AI Helper Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my brain right now. Please check your internet connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-[#00A1DE]" size={24} /> AI Energy Advisor
          </h1>
          <p className="text-sm text-gray-500 font-medium">Personalized recommendations based on real-time market data.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'assistant' ? "bg-[#00A1DE] text-white" : "bg-gray-100 text-gray-500"
                )}>
                  {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'assistant' ? "bg-gray-50 text-gray-800 rounded-tl-none" : "bg-[#00A1DE] text-white rounded-tr-none"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg bg-[#00A1DE] text-white flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 text-gray-400 rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative flex items-center gap-2">
              <input 
                type="text"
                placeholder="Ask about solar kits, LPG prices, or energy savings..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#00A1DE] transition-all text-sm"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-1 w-10 h-10 p-0 rounded-lg bg-[#00A1DE] hover:bg-[#0081B0]"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="border-none shadow-sm bg-[#141414] text-white">
            <CardHeader className="border-b border-white/10">
              <h3 className="font-bold flex items-center gap-2">
                <BrainCircuit size={18} className="text-[#00A1DE]" /> Advisor Intelligence
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                I analyze your profile against the latest REG tariffs and fuel prices to provide the most accurate financial advice.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[10px] font-bold text-[#00A1DE] uppercase">Current Electricity</p>
                  <p className="text-sm font-bold">{MARKET_DATA.reg.tier3.rate} RWF/kWh</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-[10px] font-bold text-[#FAD201] uppercase">Charcoal Price</p>
                  <p className="text-sm font-bold">{MARKET_DATA.charcoal.pricePerSack} RWF/Sack</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setState(prev => ({ 
                    ...INITIAL_STATE, 
                    language: prev.language, 
                    activeView: 'dashboard' 
                  }))}
                  className="w-full border-white/10 text-white hover:bg-white/5 text-xs h-9"
                >
                  Renew My Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-gray-900">Suggested Questions</h4>
              <div className="space-y-2">
                {[
                  "Is LPG cheaper than charcoal?",
                  "How much can I save with solar?",
                  "Are pellets available in Kigali?",
                  "What is the best EPC for a family of 4?"
                ].map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(q)}
                    className="w-full text-left p-2 text-xs text-gray-500 hover:text-[#00A1DE] hover:bg-blue-50 rounded-lg transition-all font-medium border border-gray-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

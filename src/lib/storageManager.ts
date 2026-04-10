export type View = 'dashboard' | 'knowledge' | 'solar' | 'cooking' | 'ai_helper' | 'settings';

export interface UserState {
  profile: 'urban' | 'rural' | 'business' | null;
  monthlyBill: number;
  cookingFuel: 'charcoal' | 'lpg' | 'wood' | 'epc' | null;
  cookingSpend: number;
  language: 'en' | 'rw';
  step: number;
  isComplete: boolean;
  activeView: View;
}

const STORAGE_KEY = 'cehr_session';

export const INITIAL_STATE: UserState = {
  profile: null,
  monthlyBill: 0,
  cookingFuel: null,
  cookingSpend: 0,
  language: 'en',
  step: 0,
  isComplete: false,
  activeView: 'dashboard',
};

export const StorageManager = {
  save: (state: UserState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  load: (): UserState | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};

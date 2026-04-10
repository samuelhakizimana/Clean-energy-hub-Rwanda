export type Language = 'en' | 'rw';

export const TRANSLATIONS = {
  en: {
    title: "Clean Energy Hub Rwanda",
    tagline: "Your path to affordable, sustainable energy",
    startAssessment: "Start Assessment",
    resumeAssessment: "Resume Assessment",
    language: "Language",
    profile: {
      urban: "Urban Dweller (Kigali/Cities)",
      rural: "Rural Farmer (Provinces)",
      business: "Small Business Owner",
      question: "Which profile best describes you?",
    },
    billing: {
      question: "How much is your monthly electricity bill (RWF)?",
      placeholder: "e.g. 15000",
      result: "Based on your bill, you consume approximately {kwh} kWh per month.",
      tier: "Current Tariff Tier: {tier}",
    },
    cooking: {
      question: "What is your primary cooking fuel?",
      charcoal: "Charcoal",
      lpg: "Gas (LPG)",
      wood: "Firewood",
      epc: "Electric Pressure Cooker",
      costQuestion: "How much do you spend on cooking fuel per month?",
    },
    solar: {
      recommendation: "Solar Recommendation",
      potential: "You could save up to {savings}% on your grid bill with solar.",
    },
    impact: {
      trees: "By switching, you save {count} trees per year.",
    },
    consulting: {
      cta: "Get Expert Help",
      whatsapp: "Hi CEH Rwanda, my assessment shows I spend {bill} RWF on grid and want to switch to Solar. Can you help?",
    },
    common: {
      next: "Next",
      back: "Back",
      finish: "Finish",
      save: "Save Plan",
      privacy: "All data stays on your phone. No data is sent to our servers until you click 'Consult Expert'.",
    }
  },
  rw: {
    title: "Clean Energy Hub Rwanda",
    tagline: "Inzira yawe yo kubona ingufu zihendutse kandi zirambye",
    startAssessment: "Tangira Isuzuma",
    resumeAssessment: "Komeza Isuzuma",
    language: "Ururimi",
    profile: {
      urban: "Utuye mu Mujyi (Kigali/Imijyi)",
      rural: "Umuhinzi-Mworozi (Mu Ntara)",
      business: "Rwiyemezamirimo Muto",
      question: "Ni iyihe miterere ikubwiye neza?",
    },
    billing: {
      question: "Uwishyura angahe ku kwezi ku mashanyarazi (RWF)?",
      placeholder: "urugero: 15000",
      result: "Dushingiye ku fagitire yawe, ukoresha hafi {kwh} kWh ku kwezi.",
      tier: "Icyiciro cy'igiciro urimo: {tier}",
    },
    cooking: {
      question: "Ni izihe ngufu ukoresha cyane mu guteka?",
      charcoal: "Amakara",
      lpg: "Gazi (LPG)",
      wood: "Inkwi",
      epc: "Inkono y'Amashanyarazi (EPC)",
      costQuestion: "Ukoresha angahe ku kwezi ku ngufu zo guteka?",
    },
    solar: {
      recommendation: "Inama ku Mirasire y'Izuba",
      potential: "Wazigama kugeza kuri {savings}% kuri fagitire yawe ukoresheje imirasire y'izuba.",
    },
    impact: {
      trees: "Guhindura ingufu bizatuma urokora ibiti {count} buri mwaka.",
    },
    consulting: {
      cta: "Gisha Inama Inzobere",
      whatsapp: "Muraho CEH Rwanda, isuzuma ryanjye ryerekanye ko nishyura {bill} RWF ku mashanyarazi kandi nifuza gukoresha imirasire y'izuba. Mwanyfasha?",
    },
    common: {
      next: "Ibikurikira",
      back: "Subira inyuma",
      finish: "Soza",
      save: "Bika Umugambi",
      privacy: "Amakuru yawe yose aguma kuri terefone yawe. Nta makuru yoherezwa kuri seriveri zacu kugeza ukanze 'Gisha Inama Inzobere'.",
    }
  }
};

export interface Article {
  id: string;
  title: { en: string; rw: string };
  category: 'solar' | 'cooking' | 'efficiency';
  content: { en: string; rw: string };
  tags: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 'solar-maintenance',
    title: {
      en: "How to Maintain Your Solar Panels",
      rw: "Uko wafata neza imirasire yawe y'izuba"
    },
    category: 'solar',
    content: {
      en: "Keep your panels clean from dust and bird droppings. Check the battery water levels monthly if using lead-acid batteries...",
      rw: "Guma usukura imirasire yawe uyikuraho ibitaka n'imyanda y'inyoni. Jya ugenzura amazi ya batiri buri kwezi niba ukoresha batiri zisanzwe..."
    },
    tags: ['solar', 'maintenance', 'cleaning']
  },
  {
    id: 'lpg-safety',
    title: {
      en: "Safety Tips for Using LPG Gas",
      rw: "Inama zo kwirinda ukoresha gazi (LPG)"
    },
    category: 'cooking',
    content: {
      en: "Always keep the cylinder upright. Check for leaks using soapy water. Ensure good ventilation in the kitchen...",
      rw: "Buri gihe guma uhagaritse icupa rya gazi. Genzura niba hari aho ivubira ukoresheje amazi arimo isabune. Menya ko mu gikoni hari umwuka uhagije..."
    },
    tags: ['cooking', 'gas', 'safety']
  },
  {
    id: 'epc-benefits',
    title: {
      en: "Why Use an Electric Pressure Cooker (EPC)?",
      rw: "Kuki ukwiye gukoresha inkono y'amashanyarazi (EPC)?"
    },
    category: 'efficiency',
    content: {
      en: "EPCs are 90% efficient and can cook beans in 45 minutes, saving you both time and money compared to charcoal.",
      rw: "EPC zikoresha 90% by'ingufu kandi zishobora guteka ibishyimbo mu minota 45, bikakuzigamira igihe n'amafaranga ugereranyije n'amakara."
    },
    tags: ['cooking', 'electricity', 'savings']
  }
];

import { MARKET_DATA } from '../data/marketData';

/**
 * Calculates kWh from a RWF bill amount based on REG tiered tariffs.
 * 
 * REG Tariffs (Residential):
 * 0-15 kWh: 89 RWF/kWh
 * 15-50 kWh: 212 RWF/kWh
 * >50 kWh: 249 RWF/kWh
 * VAT (15%) applies to non-lifeline consumption (Tier 2 and 3).
 */
export function calculateKwhFromBill(billAmount: number) {
  const { reg } = MARKET_DATA;
  let remainingAmount = billAmount;
  let totalKwh = 0;
  let currentTier = 1;

  // Tier 1: Lifeline (0-15 kWh)
  const tier1MaxCost = reg.lifeline.max * reg.lifeline.rate;
  if (remainingAmount <= tier1MaxCost) {
    totalKwh = remainingAmount / reg.lifeline.rate;
    return { totalKwh, currentTier: 1, effectiveRate: reg.lifeline.rate };
  }

  totalKwh += reg.lifeline.max;
  remainingAmount -= tier1MaxCost;
  currentTier = 2;

  // Tier 2: 15-50 kWh (35 kWh range)
  // VAT applies here
  const tier2RateWithVat = reg.tier2.rate * (1 + reg.vat);
  const tier2Range = reg.tier2.max - reg.lifeline.max;
  const tier2MaxCost = tier2Range * tier2RateWithVat;

  if (remainingAmount <= tier2MaxCost) {
    totalKwh += remainingAmount / tier2RateWithVat;
    return { totalKwh, currentTier: 2, effectiveRate: tier2RateWithVat };
  }

  totalKwh += tier2Range;
  remainingAmount -= tier2MaxCost;
  currentTier = 3;

  // Tier 3: >50 kWh
  const tier3RateWithVat = reg.tier3.rate * (1 + reg.vat);
  totalKwh += remainingAmount / tier3RateWithVat;

  return { 
    totalKwh, 
    currentTier: 3, 
    effectiveRate: billAmount / totalKwh 
  };
}

/**
 * Calculates cooking costs comparison
 */
export function calculateCookingComparison(monthlySpend: number, currentFuel: string) {
  const { lpg, charcoal, firewood, epc } = MARKET_DATA;
  
  // This is a simplified model for comparison
  // In a real app, we'd use energy requirements (MJ)
  
  let savings = 0;
  let recommendation = '';

  if (currentFuel === 'charcoal') {
    // LPG is typically 30-40% cheaper than charcoal in Rwanda for the same energy output
    savings = monthlySpend * 0.35;
    recommendation = 'lpg';
  } else if (currentFuel === 'wood') {
    savings = 0; // Wood is "free" or very cheap but high health cost
    recommendation = 'lpg';
  }

  return { savings, recommendation };
}

/**
 * ROI Calculation
 */
export function calculateROI(investment: number, monthlySavings: number) {
  if (monthlySavings <= 0) return Infinity;
  return investment / monthlySavings; // Months to payback
}

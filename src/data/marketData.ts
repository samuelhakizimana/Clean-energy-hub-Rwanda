/**
 * Market Data for Rwanda Energy Sector
 * Prices in RWF as of April 2026 (Estimated/Current)
 */

export const MARKET_DATA = {
  // REG Residential Tariffs (RWF per kWh)
  // Lifeline: 0-15 kWh
  // Tier 2: 15-50 kWh
  // Tier 3: >50 kWh
  reg: {
    lifeline: { max: 15, rate: 89 },
    tier2: { max: 50, rate: 212 },
    tier3: { rate: 249 },
    vat: 0.15, // 15% VAT for non-lifeline
    fixedFee: 0, // Fixed monthly fee if any
  },

  // Cooking Fuel Prices
  lpg: {
    pricePerKg: 1200, // RWF
    energyDensity: 46, // MJ/kg
    efficiency: 0.6, // 60% efficiency for modern stoves
  },
  
  charcoal: {
    pricePerSack: 15000, // RWF (approx 30kg)
    pricePerBucket: 1500, // RWF
    energyDensity: 30, // MJ/kg
    efficiency: 0.15, // 15% efficiency for traditional stoves
  },

  firewood: {
    pricePerBundle: 500, // RWF
    energyDensity: 16, // MJ/kg
    efficiency: 0.1, // 10% efficiency for traditional open fire
  },

  epc: {
    efficiency: 0.9, // 90% efficiency for Electric Pressure Cookers
  },

  // Solar Data
  solar: {
    avgSunHours: 5, // Peak sun hours in Rwanda
    kitBasic: {
      capacityWatts: 100,
      estPrice: 250000,
      description: "Basic lighting, phone charging, small radio",
    },
    kitMedium: {
      capacityWatts: 500,
      estPrice: 1200000,
      description: "Lighting, TV, Fridge, Fans",
    },
    kitLarge: {
      capacityWatts: 1000,
      estPrice: 2500000,
      description: "Full home power including small appliances",
    }
  },

  // Environmental Impact
  impact: {
    co2PerKwhGrid: 0.5, // kg CO2 per kWh (Mix of hydro/methane/diesel)
    treesSavedPerTonCo2: 50,
  }
};

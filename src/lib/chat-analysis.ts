interface Analysis {
  intent: string;
  preferences: {
    style?: string;
    propertyType?: string;
    area?: string;
    budget?: string;
    timeline?: string;
  };
  keywords: string[];
}

export function analyzeUserInput(input: string): Analysis {
  const lowercaseInput = input.toLowerCase();
  const words = lowercaseInput.split(/\s+/);
  
  const analysis: Analysis = {
    intent: 'general',
    preferences: {},
    keywords: [],
  };

  // Style detection
  const styles = {
    moderno: ['moderno', 'contemporâneo', 'atual'],
    clássico: ['clássico', 'tradicional', 'elegante'],
    minimalista: ['minimalista', 'clean', 'simples'],
    industrial: ['industrial', 'urbano', 'loft'],
    rústico: ['rústico', 'campo', 'fazenda'],
    luxuoso: ['luxo', 'luxuoso', 'sofisticado'],
  };

  // Property type detection
  const propertyTypes = {
    casa: ['casa', 'residência', 'moradia'],
    apartamento: ['apartamento', 'apto', 'flat'],
    escritório: ['escritório', 'comercial', 'sala'],
    loja: ['loja', 'comércio', 'ponto'],
  };

  // Intent detection
  const intents = {
    pricing: ['preço', 'custo', 'valor', 'orçamento', 'investimento'],
    timeline: ['prazo', 'tempo', 'duração', 'quando'],
    examples: ['exemplo', 'modelo', 'referência', 'inspiração'],
    information: ['como', 'qual', 'onde', 'porque', 'por que'],
  };

  // Analyze each word
  words.forEach(word => {
    // Check styles
    Object.entries(styles).forEach(([style, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        analysis.preferences.style = style;
        analysis.keywords.push(style);
      }
    });

    // Check property types
    Object.entries(propertyTypes).forEach(([type, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        analysis.preferences.propertyType = type;
        analysis.keywords.push(type);
      }
    });

    // Check intents
    Object.entries(intents).forEach(([intent, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        analysis.intent = intent;
      }
    });
  });

  // Area detection (m² or metros quadrados)
  const areaMatch = input.match(/(\d+)\s*(m2|m²|metros quadrados)/i);
  if (areaMatch) {
    analysis.preferences.area = `${areaMatch[1]}m²`;
    analysis.keywords.push(`${areaMatch[1]}m²`);
  }

  // Budget detection
  const budgetMatch = input.match(/R\$\s*(\d+(?:\.\d{3})*(?:,\d{2})?|\d+)/);
  if (budgetMatch) {
    analysis.preferences.budget = budgetMatch[0];
    analysis.keywords.push(budgetMatch[0]);
  }

  // Timeline detection
  const timeMatch = input.match(/(\d+)\s*(meses|mes|mês|semanas|dias)/i);
  if (timeMatch) {
    analysis.preferences.timeline = `${timeMatch[1]} ${timeMatch[2]}`;
    analysis.keywords.push(`${timeMatch[1]} ${timeMatch[2]}`);
  }

  return analysis;
}
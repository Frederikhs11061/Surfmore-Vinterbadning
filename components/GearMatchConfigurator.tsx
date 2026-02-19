'use client';

import { useState } from 'react';
import QuizStep from './QuizStep';
import Results from './Results';

export interface Question {
  id: string;
  question: string;
  type: 'single' | 'multiple';
  options: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  essential: boolean;
  url: string;
}

const questions: Question[] = [
  {
    id: 'experience',
    question: 'Hvor erfaren er du med vinterbadning?',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Nybegynder - Første gang', icon: '🌊' },
      { value: 'some', label: 'Lidt erfaring - Nogle gange', icon: '🏊' },
      { value: 'experienced', label: 'Erfaren - Regelmæssigt', icon: '❄️' },
    ],
  },
  {
    id: 'frequency',
    question: 'Hvor ofte planlægger du at bade?',
    type: 'single',
    options: [
      { value: 'rarely', label: 'Sjældent - Nogle gange om måneden', icon: '🌙' },
      { value: 'weekly', label: 'Ugentligt - 1-2 gange', icon: '📅' },
      { value: 'daily', label: 'Dagligt - Hver dag', icon: '🔥' },
    ],
  },
  {
    id: 'location',
    question: 'Hvor bader du typisk?',
    type: 'single',
    options: [
      { value: 'beach', label: 'Strand', icon: '🏖️' },
      { value: 'harbor', label: 'Havn', icon: '⚓' },
      { value: 'lake', label: 'Sø', icon: '🌊' },
      { value: 'pool', label: 'Svømmebassin', icon: '🏊' },
    ],
  },
  {
    id: 'needs',
    question: 'Hvad er vigtigst for dig? (Vælg alle der passer)',
    type: 'multiple',
    options: [
      { value: 'warmth', label: 'Varme og isolering', icon: '🔥' },
      { value: 'comfort', label: 'Komfort og let at komme i/til', icon: '✨' },
      { value: 'protection', label: 'Beskyttelse mod elementerne', icon: '🛡️' },
      { value: 'dry', label: 'Blive tør hurtigt efter', icon: '☀️' },
      { value: 'storage', label: 'Opbevaring af tøj/telefon', icon: '🎒' },
    ],
  },
];

const products: Product[] = [
  {
    id: 'neopren-sko',
    name: 'Neopren-sko',
    description: 'Vigtige for at holde fødderne varme og beskytte mod skarpe sten og skaller',
    category: 'footwear',
    essential: true,
    url: 'https://surfmore.dk/collections/badesko-vinterbadning/products/surfmore-neopren-sko-3-mm',
  },
  {
    id: 'badeponcho',
    name: 'Badeponcho',
    description: 'Hurtig omklædning og varme efter badet. Perfekt til at holde varmen',
    category: 'warmth',
    essential: true,
    url: 'https://surfmore.dk/collections/vinterbadning-haandklaede-poncho/products/surfmore-haandklaede-poncho-bomuld',
  },
  {
    id: 'drybag',
    name: 'Drybag',
    description: 'Vandtæt opbevaring til tøj, telefon og værdigenstande',
    category: 'storage',
    essential: true,
    url: 'https://surfmore.dk/products/surfmore-drybag-10l',
  },
  {
    id: 'mikrofiberhåndklæde',
    name: 'Mikrofiberhåndklæde',
    description: 'Super absorberende og hurtigt tørrende. Perfekt til vinterbadning',
    category: 'dry',
    essential: true,
    url: 'https://surfmore.dk/products/surfmore-mikrofiber-haandklaede',
  },
  {
    id: 'neopren-handsker',
    name: 'Neopren-handsker',
    description: 'Hold hænderne varme i koldt vand',
    category: 'warmth',
    essential: false,
    url: 'https://surfmore.dk/collections/vinterbadning-neopren-handsker/products/surfmore-neopren-handsker-15-mm',
  },
  {
    id: 'neopren-hue',
    name: 'Neopren-hue',
    description: 'Vigtig for at holde hovedet varmt - op til 30% af varmen går gennem hovedet',
    category: 'warmth',
    essential: false,
    url: 'https://surfmore.dk/collections/vinterbade-hue/products/surfmore-neopren-hue-2-5mm',
  },
];

export default function GearMatchConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string | string[]) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    const newAnswer: Answer = { questionId, value };

    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getCurrentAnswer = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer?.value;
  };

  const calculateRecommendations = (): Product[] => {
    const recommended: Product[] = [];
    const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

    // Always include essential products
    recommended.push(...products.filter(p => p.essential));

    // Add products based on answers
    const needs = answerMap.get('needs');
    if (needs) {
      const needsArray = Array.isArray(needs) ? needs : [needs];
      
      if (needsArray.includes('warmth')) {
        const warmthProducts = products.filter(p => 
          p.category === 'warmth' && !recommended.find(r => r.id === p.id)
        );
        recommended.push(...warmthProducts);
      }
      
      if (needsArray.includes('storage')) {
        const storageProducts = products.filter(p => 
          p.category === 'storage' && !recommended.find(r => r.id === p.id)
        );
        recommended.push(...storageProducts);
      }
      
      if (needsArray.includes('dry')) {
        const dryProducts = products.filter(p => 
          p.category === 'dry' && !recommended.find(r => r.id === p.id)
        );
        recommended.push(...dryProducts);
      }
    }

    const experience = answerMap.get('experience');
    if (experience === 'beginner') {
      // Beginners get more protection items
      const protectionProducts = products.filter(p => 
        p.category === 'warmth' && !recommended.find(r => r.id === p.id)
      );
      recommended.push(...protectionProducts.slice(0, 2));
    }

    return recommended;
  };

  if (showResults) {
    return <Results products={calculateRecommendations()} onRestart={handleRestart} />;
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-4 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-surfmore-navy mb-2 tracking-tight">
          🌊 Surfmore Gear Match
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4 font-medium">
          Hvad skal jeg bruge til vinterbadning?
        </p>
        
        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2 mb-3">
          <div
            className="bg-surfmore-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Spørgsmål {currentStep + 1} af {questions.length}
        </p>
      </div>

      {/* Quiz Step - Flex grow to fill space */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <QuizStep
            question={currentQuestion}
            answer={getCurrentAnswer()}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={currentStep === 0}
            isLast={currentStep === questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

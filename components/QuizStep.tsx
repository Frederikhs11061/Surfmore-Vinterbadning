'use client';

import { Question, Answer } from './GearMatchConfigurator';

interface QuizStepProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function QuizStep({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuizStepProps) {
  const handleOptionClick = (value: string) => {
    if (question.type === 'multiple') {
      const currentAnswers = Array.isArray(answer) ? answer : [];
      if (currentAnswers.includes(value)) {
        onAnswer(question.id, currentAnswers.filter(a => a !== value));
      } else {
        onAnswer(question.id, [...currentAnswers, value]);
      }
    } else {
      onAnswer(question.id, value);
    }
  };

  const isSelected = (value: string) => {
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-surfmore-navy mb-6 md:mb-8 text-center tracking-tight">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`
              p-5 md:p-6 rounded-lg border-2 transition-all duration-200 text-left
              hover:shadow-md
              ${
                isSelected(option.value)
                  ? 'border-surfmore-blue bg-surfmore-blue/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-surfmore-blue/50 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-2xl md:text-3xl flex-shrink-0">{option.icon}</span>
              <span className="text-base md:text-lg font-semibold text-surfmore-navy flex-1 leading-tight">
                {option.label}
              </span>
              {isSelected(option.value) && (
                <span className="text-surfmore-blue text-xl md:text-2xl flex-shrink-0 font-bold">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-3 md:gap-4">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`
            px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base border
            ${
              isFirst
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
            }
          `}
        >
          ← Tilbage
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed()}
          className={`
            px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-white transition-all text-sm md:text-base shadow-sm
            ${
              canProceed()
                ? 'bg-surfmore-blue hover:bg-surfmore-navy shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isLast ? 'Se resultater →' : 'Næste →'}
        </button>
      </div>
    </div>
  );
}

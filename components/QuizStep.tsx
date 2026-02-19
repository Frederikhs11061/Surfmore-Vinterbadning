'use client';

import { useMemo } from 'react';
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

  const isSelected = useMemo(() => {
    return (value: string) => {
      if (question.type === 'multiple') {
        return Array.isArray(answer) && answer.includes(value);
      }
      return answer === value;
    };
  }, [question.type, answer]);

  const canProceed = useMemo(() => {
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  }, [question.type, answer]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 w-full">
      <h2 className="text-lg md:text-xl font-bold text-surfmore-navy mb-4 md:mb-6 text-center tracking-tight">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 md:mb-6">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-left
              hover:shadow-md
              ${
                isSelected(option.value)
                  ? 'border-surfmore-blue bg-surfmore-blue/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-surfmore-blue/50 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <span className="text-sm md:text-base font-semibold text-surfmore-navy flex-1 leading-tight">
                {option.label}
              </span>
              {isSelected(option.value) && (
                <span className="text-surfmore-blue text-xl flex-shrink-0 font-bold">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`
            px-5 py-2 rounded-lg font-semibold transition-all text-sm border
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
              disabled={!canProceed}
          className={`
            px-6 py-2 rounded-lg font-bold text-white transition-all text-sm shadow-sm
            ${
              canProceed
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

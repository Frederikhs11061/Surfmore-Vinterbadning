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
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-surfmore-dark mb-8 text-center">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`
              p-6 rounded-xl border-2 transition-all duration-200 text-left
              hover:scale-105 hover:shadow-lg
              ${
                isSelected(option.value)
                  ? 'border-surfmore-blue bg-surfmore-light shadow-md'
                  : 'border-gray-200 bg-white hover:border-surfmore-blue/50'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{option.icon}</span>
              <span className="text-lg font-medium text-gray-800 flex-1">
                {option.label}
              </span>
              {isSelected(option.value) && (
                <span className="text-surfmore-blue text-xl">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all
            ${
              isFirst
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          ← Tilbage
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed()}
          className={`
            px-8 py-3 rounded-lg font-medium text-white transition-all
            ${
              canProceed()
                ? 'bg-surfmore-blue hover:bg-surfmore-dark shadow-lg hover:shadow-xl'
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

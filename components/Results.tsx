'use client';

import { useMemo } from 'react';
import { Product } from './GearMatchConfigurator';

interface ResultsProps {
  products: Product[];
  onRestart: () => void;
}

export default function Results({ products, onRestart }: ResultsProps) {
  const essentialProducts = useMemo(() => 
    products.filter(p => p.essential), 
    [products]
  );
  const additionalProducts = useMemo(() => 
    products.filter(p => !p.essential), 
    [products]
  );

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header */}
      <div className="text-center pt-4 pb-3 px-4 flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-bold text-surfmore-navy mb-1 tracking-tight">
          🎯 Dit personlige udstyr
        </h1>
        <p className="text-base md:text-lg text-gray-700 font-medium">
          Baseret på dine svar, her er hvad vi anbefaler til din vinterbadning
        </p>
      </div>

      {/* Content - Fills remaining space dynamically */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Essential Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-4 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-surfmore-navy mb-4 flex items-center gap-2">
              <span>⭐</span>
              <span>Essentielt udstyr</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {essentialProducts.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-surfmore-blue rounded-lg p-4 bg-white hover:bg-gray-50 hover:border-surfmore-navy transition-all cursor-pointer group shadow-sm"
            >
              <h3 className="text-base md:text-lg font-bold text-surfmore-navy mb-1.5 group-hover:text-surfmore-blue transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-2 text-xs md:text-sm leading-relaxed">{product.description}</p>
              <span className="text-surfmore-blue text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                Se produkt
                <span>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>

          {/* Additional Products */}
          {additionalProducts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-4 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-surfmore-navy mb-4 flex items-center gap-2">
                <span>✨</span>
                <span>Ekstra komfort</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalProducts.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 hover:border-surfmore-blue transition-all cursor-pointer group shadow-sm"
              >
                <h3 className="text-base md:text-lg font-bold text-surfmore-navy mb-1.5 group-hover:text-surfmore-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2 text-xs md:text-sm leading-relaxed">{product.description}</p>
                <span className="text-surfmore-blue text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                  Se produkt
                  <span>→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

          {/* Bundle Suggestion */}
          <div className="bg-gradient-to-r from-surfmore-blue to-surfmore-navy rounded-xl border border-surfmore-blue shadow-lg p-4 md:p-6 mb-4 text-white">
            <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
              <span>🎁</span>
              <span>Komplet Bundle</span>
            </h2>
            <p className="text-sm md:text-base mb-3 opacity-95 font-medium">
              Få hele pakken med rabat! Vores vinterbadning bundle inkluderer alt det essentielle udstyr du har brug for.
            </p>
            <div className="bg-white/15 rounded-lg p-3 mb-3 backdrop-blur-sm">
              <p className="font-bold mb-1.5 text-xs md:text-sm">Bundle inkluderer:</p>
              <ul className="list-disc list-inside space-y-0.5 opacity-95 text-xs md:text-sm">
                {essentialProducts.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
            <a
              href="https://surfmore.dk/collections/vinterbadning-haandklaede-poncho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-surfmore-blue px-5 md:px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg text-xs md:text-sm"
            >
              Se Bundle →
            </a>
          </div>

          {/* CTA Section */}
          <div className="text-center pb-2">
            <button
              onClick={onRestart}
              className="px-5 md:px-6 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-xs md:text-sm border border-gray-200"
            >
              Start forfra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

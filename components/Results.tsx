'use client';

import { Product } from './GearMatchConfigurator';

interface ResultsProps {
  products: Product[];
  onRestart: () => void;
}

export default function Results({ products, onRestart }: ResultsProps) {
  const essentialProducts = products.filter(p => p.essential);
  const additionalProducts = products.filter(p => !p.essential);

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-4 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-surfmore-navy mb-2 tracking-tight">
          🎯 Dit personlige udstyr
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium">
          Baseret på dine svar, her er hvad vi anbefaler til din vinterbadning
        </p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Essential Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-surfmore-navy mb-6 flex items-center gap-2">
              <span>⭐</span>
              <span>Essentielt udstyr</span>
            </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {essentialProducts.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-surfmore-blue rounded-lg p-5 bg-white hover:bg-gray-50 hover:border-surfmore-navy transition-all cursor-pointer group shadow-sm"
            >
              <h3 className="text-lg md:text-xl font-bold text-surfmore-navy mb-2 group-hover:text-surfmore-blue transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-3 text-sm md:text-base leading-relaxed">{product.description}</p>
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
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-surfmore-navy mb-6 flex items-center gap-2">
                <span>✨</span>
                <span>Ekstra komfort</span>
              </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalProducts.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-200 rounded-lg p-5 bg-white hover:bg-gray-50 hover:border-surfmore-blue transition-all cursor-pointer group shadow-sm"
              >
                <h3 className="text-lg md:text-xl font-bold text-surfmore-navy mb-2 group-hover:text-surfmore-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm md:text-base leading-relaxed">{product.description}</p>
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
          <div className="bg-gradient-to-r from-surfmore-blue to-surfmore-navy rounded-xl border border-surfmore-blue shadow-lg p-6 md:p-8 mb-6 text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🎁</span>
              <span>Komplet Bundle</span>
            </h2>
            <p className="text-base md:text-lg mb-4 opacity-95 font-medium">
              Få hele pakken med rabat! Vores vinterbadning bundle inkluderer alt det essentielle udstyr du har brug for.
            </p>
            <div className="bg-white/15 rounded-lg p-4 mb-4 backdrop-blur-sm">
              <p className="font-bold mb-2 text-sm md:text-base">Bundle inkluderer:</p>
              <ul className="list-disc list-inside space-y-1 opacity-95 text-sm md:text-base">
                {essentialProducts.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
            <a
              href="https://surfmore.dk/collections/vinterbadning-haandklaede-poncho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-surfmore-blue px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg text-sm md:text-base"
            >
              Se Bundle →
            </a>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={onRestart}
              className="px-6 md:px-8 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm md:text-base border border-gray-200"
            >
              Start forfra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-surfmore-dark mb-3">
          🎯 Dit personlige udstyr
        </h1>
        <p className="text-xl text-gray-600">
          Baseret på dine svar, her er hvad vi anbefaler til din vinterbadning
        </p>
      </div>

      {/* Essential Products */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-semibold text-surfmore-dark mb-6 flex items-center gap-2">
          <span>⭐</span>
          <span>Essentielt udstyr</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {essentialProducts.map((product) => (
            <div
              key={product.id}
              className="border-2 border-surfmore-blue rounded-xl p-5 bg-surfmore-light/30"
            >
              <h3 className="text-xl font-semibold text-surfmore-dark mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Products */}
      {additionalProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-semibold text-surfmore-dark mb-6 flex items-center gap-2">
            <span>✨</span>
            <span>Ekstra komfort</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalProducts.map((product) => (
              <div
                key={product.id}
                className="border-2 border-gray-200 rounded-xl p-5 hover:border-surfmore-blue/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-surfmore-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bundle Suggestion */}
      <div className="bg-gradient-to-r from-surfmore-blue to-surfmore-dark rounded-2xl shadow-xl p-6 md:p-8 mb-6 text-white">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span>🎁</span>
          <span>Komplet Bundle</span>
        </h2>
        <p className="text-lg mb-4 opacity-90">
          Få hele pakken med rabat! Vores vinterbadning bundle inkluderer alt det essentielle udstyr du har brug for.
        </p>
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="font-semibold mb-2">Bundle inkluderer:</p>
          <ul className="list-disc list-inside space-y-1 opacity-90">
            {essentialProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
        <button className="bg-white text-surfmore-blue px-8 py-3 rounded-lg font-semibold hover:bg-surfmore-light transition-colors shadow-lg">
          Se Bundle →
        </button>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          Start forfra
        </button>
      </div>
    </div>
  );
}

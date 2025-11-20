import React from 'react';

const RecipeCard = ({ recipe, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg text-gray-600">Generating your recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Recipe Yet</h3>
          <p className="text-gray-600 max-w-sm">
            Scan or upload a food image to get started with your personalized recipe
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
      <div>
        <span className="text-sm text-orange-400 font-semibold uppercase tracking-wide">
          Suggested Recipe
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1 mb-3">
          {recipe.title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{recipe.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 shrink-0" />
              <span className="text-gray-700">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Step Instructions</h3>
        <ol className="space-y-3">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 flex-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        className="w-full bg-linear-to-r from-orange-400 to-orange-300 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
        aria-label="Start cooking with this recipe"
      >
        Cook Now
      </button>
    </div>
  );
};

export default RecipeCard;
import React from 'react';

const RecipeCard = ({ recipe, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Generating recipe...</span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg mb-2">No recipe generated yet</p>
          <p className="text-sm">Upload or scan an image to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Recipe Header */}
      <div className="mb-6">
        <span className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
          Suggested Recipe
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
          {recipe.name}
        </h2>
      </div>

      {/* If recipe has text format (fallback) */}
      {recipe.text && !recipe.ingredients?.length && (
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap text-gray-700 font-sans">
            {recipe.text}
          </pre>
        </div>
      )}

      {/* Structured Recipe Format */}
      {recipe.ingredients?.length > 0 && (
        <>
          {/* Ingredients Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          {recipe.instructions?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Step Instructions
              </h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full font-semibold text-sm mr-3 shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeCard;
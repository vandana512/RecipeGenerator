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

  // Parse recipe if it's a string
  let parsedRecipe = recipe;

  if (typeof recipe === 'string') {
    try {
      // Remove markdown code blocks with regex
      let cleaned = recipe.trim();
      
      // Match and extract JSON from ```json {...} ``` or ``` {...} ```
      const jsonMatch = cleaned.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleaned = jsonMatch[1];
      } else {
        // Fallback: remove any remaining backticks or triple quotes
        cleaned = cleaned.replace(/```json|```|'''json|'''/gi, '').trim();
      }

      parsedRecipe = JSON.parse(cleaned);
      console.log('RecipeCard: Successfully parsed recipe:', parsedRecipe);
    } catch (e) {
      console.error('RecipeCard: Failed to parse recipe:', e);
      console.error('RecipeCard: Raw recipe data:', recipe);
      parsedRecipe = { text: recipe };
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Recipe Header */}
      <div className="mb-6">
        <span className="text-orange-500 text-sm font-semibold uppercase tracking-wide">
          Suggested Recipe
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
          {parsedRecipe.recipe_name || parsedRecipe.name || 'Generated Recipe'}
        </h2>
      </div>

      {/* If recipe has text format (fallback) */}
      {parsedRecipe.text && !parsedRecipe.ingredients?.length && (
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap text-gray-700 font-sans">
            {parsedRecipe.text}
          </pre>
        </div>
      )}

      {/* Structured Recipe Format */}
      {parsedRecipe.ingredients?.length > 0 && (
        <>
          {/* Ingredients Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {parsedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 shrink-0"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          {parsedRecipe.steps?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Instructions
              </h3>
              <ol className="space-y-3">
                {parsedRecipe.steps.map((step, index) => (
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
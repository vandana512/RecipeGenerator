const mockRecipes = [
  {
    title: 'Grilled Herb Chicken & Roasted Vegetables',
    description: 'A healthy and delicious meal featuring tender grilled chicken with perfectly roasted seasonal vegetables.',
    ingredients: [
      'Grilled Herb Chicken & Roasted vegetables',
      'Top to textillion tho br edses ii mp tntd ossert to out clolls',
    ],
    steps: [
      'Aroasth Herb Chicken & Roastel! i qniec itine vegetables',
      'Trd rnzone and welng oriddn & oo cnelsalxs',
      'Piroerntux bhittep ton ap epmorr ne ts am oottnn ktable',
    ],
  },
  {
    title: 'Mediterranean Quinoa Bowl',
    description: 'Fresh and vibrant quinoa bowl with cherry tomatoes, cucumber, and herbs.',
    ingredients: [
      '1 cup quinoa, cooked',
      '2 cups cherry tomatoes, halved',
      '1 cucumber, diced',
      'Fresh herbs (parsley, mint)',
      'Olive oil and lemon dressing',
    ],
    steps: [
      'Cook quinoa according to package instructions and let cool',
      'Chop all vegetables into bite-sized pieces',
      'Combine quinoa and vegetables in a bowl',
      'Drizzle with olive oil and lemon juice',
      'Garnish with fresh herbs and serve',
    ],
  },
  {
    title: 'Avocado Toast Supreme',
    description: 'Elevated avocado toast with perfectly seasoned avocado and fresh toppings.',
    ingredients: [
      '2 ripe avocados',
      '4 slices artisan bread, toasted',
      'Cherry tomatoes',
      'Red pepper flakes',
      'Sea salt and black pepper',
      'Olive oil drizzle',
    ],
    steps: [
      'Toast bread slices until golden brown',
      'Mash avocados with salt, pepper, and lemon juice',
      'Spread avocado mixture generously on toast',
      'Top with halved cherry tomatoes',
      'Sprinkle with red pepper flakes and drizzle olive oil',
    ],
  },
];

export const uploadImageToServer = async (dataUrl) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomRecipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
      resolve({
        success: true,
        recipe: randomRecipe,
      });
    }, 2000);
  });
};
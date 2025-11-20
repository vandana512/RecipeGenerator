import React from 'react';
import { RecipeProvider } from './context/RecipeContext';
import Home from './pages/Home';

function App() {
  return (
    <RecipeProvider>
      <Home />
    </RecipeProvider>
  );
}

export default App;
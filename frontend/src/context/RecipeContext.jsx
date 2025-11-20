import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const addImage = (image) => {
    const newImage = {
      id: Date.now() + Math.random(),
      ...image,
      timestamp: Date.now(),
    };
    setImages((prev) => [...prev, newImage]);
    return newImage.id;
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
  };

  const selectImage = (id) => {
    setSelectedImageId(id);
  };

  const updateRecipe = (newRecipe) => {
    setRecipe(newRecipe);
  };

  const updateLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <RecipeContext.Provider
      value={{
        images,
        selectedImageId,
        recipe,
        loading,
        addImage,
        removeImage,
        selectImage,
        setRecipe: updateRecipe,
        setLoading: updateLoading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
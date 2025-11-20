import React from 'react';
import { useRecipe } from '../context/RecipeContext';
import ScanCard from '../components/ScanCard/ScanCard';
import UploadCard from '../components/UploadCard/UploadCard';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { uploadImageToServer } from '../services/api';
import bgImage from '../assets/bg.png';

const Home = () => {
  const {
    images,
    selectedImageId,
    recipe,
    loading,
    addImage,
    removeImage,
    selectImage,
    setRecipe,
    setLoading,
  } = useRecipe();

  const handleGenerateRecipe = async (imageData) => {
    setLoading(true);
    setRecipe(null);
    
    try {
      const response = await uploadImageToServer(imageData);
      if (response.success) {
        setRecipe(response.recipe);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = (dataUrl) => {
    const imageId = addImage({ src: dataUrl, name: 'Camera Capture' });
    selectImage(imageId);
    handleGenerateRecipe(dataUrl);
  };

  const handleUpload = (imageData) => {
    const imageId = addImage(imageData);
    selectImage(imageId);
    handleGenerateRecipe(imageData.src);
  };

  const handleImageSelect = (id) => {
    selectImage(id);
    const selectedImage = images.find((img) => img.id === id);
    if (selectedImage) {
      handleGenerateRecipe(selectedImage.src);
    }
  };

  return (
    <div 
      className="min-h-screen bg-linear-to-br from-cream via-sand to-peach/20 p-4 md:p-8"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2" style={{ letterSpacing: '-0.02em' }}>
            AI Smart Recipe Generator
          </h1>
          <p className="text-gray-600">Scan or upload food images to get personalized recipes</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScanCard onCapture={handleCapture} />
              <UploadCard onUpload={handleUpload} />
            </div>
            
            {images.length > 0 && (
              <ImageGallery
                images={images}
                selectedId={selectedImageId}
                onSelect={handleImageSelect}
                onRemove={removeImage}
              />
            )}
          </div>

          <div>
            <RecipeCard recipe={recipe} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
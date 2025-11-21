const API_BASE_URL = 'http://localhost:8000'; // Update this to your FastAPI server URL

/**
 * Convert base64 or data URL to File object
 */
const dataURLtoFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * Upload image to server and get recipe
 * @param {string} imageData - Base64 encoded image or data URL
 * @returns {Promise<{success: boolean, recipe: object, ingredients: array, error?: string}>}
 */
export const uploadImageToServer = async (imageData) => {
  try {
    // Convert base64/data URL to File
    const file = dataURLtoFile(imageData, 'food-image.jpg');
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // Send to backend
    const response = await fetch(`${API_BASE_URL}/detect_and_generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if there's an error in the response
    if (data.error) {
      throw new Error(data.error);
    }

    // Format the response to match frontend expectations
    return {
      success: true,
      ingredients: data.ingredients || [],
      recipe: {
        name: data.recipe?.recipe_name || 'Generated Recipe',
        ingredients: data.recipe?.ingredients || [],
        instructions: data.recipe?.steps || [],
        // If the API returns recipe_text instead of structured data
        text: data.recipe?.recipe_text || null
      }
    };

  } catch (error) {
    console.error('Error uploading image to server:', error);
    return {
      success: false,
      error: error.message,
      recipe: null,
      ingredients: []
    };
  }
};

/**
 * Health check endpoint
 */
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
const fs = require('fs');
const path = require('path');

/**
 * Saves uploaded base64 images to disk and returns their URLs.
 * @param {Array} selectedImages
 * @param {String} baseURL
 * @returns {Array} 
 */
const saveUploadedImages = (selectedImages, baseURL) => {
  const imagePaths = [];

  if (selectedImages && selectedImages.length > 0) {
    try {
      for (let i = 0; i < selectedImages.length; i++) {
        // Since the image is already a Buffer, no need to split or decode again
        const imageBuffer = selectedImages[i].buffer;
        const imageFileName = `${Date.now()}_image_${i}.png`; 
        const imageFilePath = path.join(__dirname, '../../public/uploads', imageFileName); 

        fs.writeFileSync(imageFilePath, imageBuffer);

        const relativePath = `/uploads/${imageFileName}`;
        imagePaths.push(`${baseURL}${relativePath}`); 
      }
    } catch (err) {
      console.error('Error saving images:', err);
      throw new Error('Failed to save the images');
    }
  }

  return imagePaths;
};

module.exports = {
  saveUploadedImages,
};

import React from "react";

export default function PromptInput({ prompt, onPromptChange, onImageChange, onSubmit, imageFileName }) {
  const handleFileChange = (e) => {
    onImageChange(e);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Recipe Generator</h2>
      <p className="text-gray-600 mb-8 text-center">
        Upload an image of ingredients and we'll generate a delicious recipe for you!
      </p>

      {/* Image Upload Section */}
      <div className="mb-8">
        <label className="file-input-label flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-green-400 transition-colors duration-300">
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="file-input-icon text-green-500 mb-3">
            <i className={`fas ${imageFileName ? 'fa-check-circle text-green-600' : 'fa-cloud-upload-alt'} text-5xl`}></i>
          </div>
          <span className="text-lg font-medium text-gray-700"> Click to browse</span>
          
        </label>
        {imageFileName && (
          <div className="text-sm text-gray-500 mt-2 text-center">
            <i className="fas fa-check-circle text-green-500 mr-1"></i>
            <span>{imageFileName}</span>
          </div>
        )}
      </div>

 

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="submit-btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md flex items-center"
        >
          <i className="fas fa-magic mr-2"></i> Generate Recipe
        </button>
      </div>

      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 mt-6 text-center">
        <p className="text-xs text-gray-500">
          <i className="fas fa-info-circle mr-1"></i> Our AI will analyze your image and create a customized recipe
        </p>
      </div>
    </form>
  );
}

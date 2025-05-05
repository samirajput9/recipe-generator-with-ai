import React from "react";

export default function PromptdInput({ prompt, onPromptChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in p-8 max-w-2xl w-full"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Prompt-Based Recipe Generator</h2>

      {/* Prompt Input Only */}
      <div className="mb-6">
        <label htmlFor="promptOnly" className="block text-sm font-medium text-gray-700 mb-2">
          <i className="fas fa-keyboard mr-2 text-blue-500"></i>Enter Prompt
        </label>
        <div className="relative">
          <input
            type="text"
            id="promptOnly"
            name="prompt"
            placeholder="E.g. 'Make it high protein' or 'Create a keto dish'"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 pl-10"
          />
          <i className="fas fa-lightbulb absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="submit-btn bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md flex items-center"
        >
          <i className="fas fa-paper-plane mr-2"></i> Generate with Prompt
        </button>
      </div>

      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 mt-6 text-center">
        <p className="text-xs text-gray-500">
          <i className="fas fa-info-circle mr-1"></i> No image required — AI will generate recipe from your prompt
        </p>
      </div>
    </form>
  );
}

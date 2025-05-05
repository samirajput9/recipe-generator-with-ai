import React, { useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from "markdown-it";

const API_KEY = "API- KEY HERE";

export default function Genai() {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [output, setOutput] = useState("Results will appear here...");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOutput("Generating...");

    try {
      if (!imageFile) {
        setOutput("Please upload an image.");
        return;
      }

      const imageBase64 = await fileToBase64(imageFile);

      const contents = [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: imageFile.type, data: imageBase64 } },
            { text: prompt || "Make a recipe for this image." },
          ],
        },
      ];

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      let buffer = [];
      let md = new MarkdownIt();
      for await (let response of result.stream) {
        buffer.push(response.text());
        setOutput(md.render(buffer.join("")));
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4 pt-20">
 <h1 className="text-3xl font-bold mb-4 text-gray-800">Recipe Generator</h1>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fade-in">
        {/* Left Panel – Input Form */}
        <form onSubmit={handleSubmit} className="p-6 border-r border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:bg-green-100 hover:file:bg-green-200"
            />
            {imagePreviewUrl && (
              <div className="mt-4">
                <img src={imagePreviewUrl} alt="Preview" className="rounded-lg shadow w-full max-h-64 object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipe Instructions (optional)
            </label>
            <input
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. 'Make it vegetarian'"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1"
          >
            Generate Recipe
          </button>
        </form>

        {/* Right Panel – Output */}
        <div className="p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Output</h2>
          <div
            className="prose max-w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </div>
      </div>
    </div>
  );
}

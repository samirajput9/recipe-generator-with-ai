import React, { useState } from "react";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import PromptInput from "./PromptInput";
import ResultDisplay from "./ResultDisplay";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromptdInput from "./Promptres";

const API_KEY = "AIzaSyDSl-f4Ml6sjanUPIdRgwFhGCAfXIHbgqk";

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

  // For /picgen — with image and prompt
  const handleSubmitWithImage = async (e) => {
    e.preventDefault();
    setOutput("Generating...");

    if (!imageFile) {
      setOutput("Please upload an image.");
      return;
    }

    try {
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

  // For /promgen — prompt only
  const handlePromptOnlySubmit = async (e) => {
    e.preventDefault();
    setOutput("Generating...");

    if (!prompt.trim()) {
      setOutput("Please enter a prompt.");
      return;
    }

    try {
      const contents = [
        {
          role: "user",
          parts: [{ text: prompt }],
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
    <BrowserRouter>
      <Navbar />
      <div className="genai-container">
        <Routes>
          <Route
            path="/"
            element={
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onImageChange={handleImageChange}
                onSubmit={handleSubmitWithImage}
              />
            }
          />
          <Route
            path="/picgen"
            element={
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onImageChange={handleImageChange}
                onSubmit={handleSubmitWithImage}
              />
            }
          />
          <Route
            path="/promgen"
            element={
              <PromptdInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onSubmit={handlePromptOnlySubmit}
              />
            }
          />
        </Routes>
        <ResultDisplay imagePreviewUrl={imagePreviewUrl} output={output} />
      </div>
    </BrowserRouter>
  );
}

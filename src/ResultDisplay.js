import React from "react";

export default function ResultDisplay({ imagePreviewUrl, output }) {
  return (
    <div className="result-display">
      {imagePreviewUrl && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={imagePreviewUrl} alt="Preview" width="300" />
        </div>
      )}
      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </div>
  );
}

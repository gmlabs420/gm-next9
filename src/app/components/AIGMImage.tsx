"use client"; // Ensure this component is treated as a client component
import { useState, useEffect } from "react";
import ShareModal from './ShareModal'; // Adjust the path as necessary

export default function AIImageGenerator() {
  const [complexityLevel, setComplexityLevel] = useState(50);
  const [imageSize, setImageSize] = useState(1080); // default to 1080
  const [result, setResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async () => {
    const prompt = `Generate an image with complexity level ${complexityLevel} and size ${imageSize}x${imageSize}`;
    
    const response = await fetch('/api/openai-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, complexityLevel, imageSize }),
    });

    const data = await response.json();
    setResult(data.imageUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert('Image URL copied to clipboard!');
  };

  const handleShare = () => {
    setIsModalOpen(true);
  };

  const getSliderBackground = (value: number) => {
    const darkBlue = { r: 1, g: 93, b: 130 }; // #015D82
    const lightBlue = { r: 177, g: 199, b: 218 }; // #B1C7DA
    const lightOrange = { r: 240, g: 191, b: 140 }; // #F0BF8C

    const mixColor = (start, end, percentage) => {
      const r = start.r + percentage * (end.r - start.r);
      const g = start.g + percentage * (end.g - start.g);
      const b = start.b + percentage * (end.b - start.b);
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };

    const percentage = value / 100;

    const startColor = mixColor(darkBlue, lightBlue, percentage);
    const endColor = mixColor(lightBlue, lightOrange, percentage);

    return `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`;
  };

  useEffect(() => {
    const complexitySlider = document.getElementById('complexityLevel');
    if (complexitySlider) {
      const background = getSliderBackground(complexityLevel);
      complexitySlider.style.background = background;
    }
  }, [complexityLevel]);

  useEffect(() => {
    const sizeSlider = document.getElementById('imageSize');
    if (sizeSlider) {
      const background = getSliderBackground(imageSize / 20); // Adjust scale for size slider
      sizeSlider.style.background = background;
    }
  }, [imageSize]);

  return (
    <div className="machine">
      <span><h1>IMAGE</h1></span>
      <span><h2>AI GM Image Generator</h2></span>
      <div>
        <p>Generate AI images! Adjust the complexity and size with the sliders.</p>
        <div className="sliders-wrapper">
          <div className="slider-container">
            <input 
              type="range" 
              id="complexityLevel" 
              name="complexityLevel" 
              min="0" 
              max="100" 
              value={complexityLevel} 
              onChange={(e) => setComplexityLevel(parseInt(e.target.value))} 
            />
            <label htmlFor="complexityLevel">Complexity Level: {complexityLevel}</label>
          </div>
          <div className="slider-container">
            <input 
              type="range" 
              id="imageSize" 
              name="imageSize" 
              min="512" 
              max="2048" 
              step="128" 
              value={imageSize} 
              onChange={(e) => setImageSize(parseInt(e.target.value))} 
            />
            <label htmlFor="imageSize">Image Size: {imageSize}x{imageSize}</label>
          </div>
        </div>
      </div>
      <div className="recessed-field3">
        {result ? <img src={result} alt="Generated AI" id="aiGeneratedImage" /> : <p>Your generated image will appear here...</p>}
      </div>
      <div className="button-container">
        <button onClick={handleGenerate} className="action-button">
          Generate
        </button>
        <button onClick={handleCopy} className="action-button">
          Copy
        </button>
        <button onClick={handleShare} className="action-button">
          Share
        </button>
      </div>
      <ShareModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        url={typeof window !== 'undefined' ? window.location.href : ''} 
        text={result} 
      />
    </div>
  );
}

import React, { useRef, useState } from 'react';

const UploadCard = ({ onUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload({
        src: e.target.result,
        file,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileRead(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileRead(file);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full aspect-square flex flex-col items-center justify-center bg-linear-to-br from-orange-100 to-yellow-50 rounded-2xl cursor-pointer transition-all ${
          isDragging ? 'ring-4 ring-orange-400 shadow-xl scale-105' : 'hover:shadow-xl'
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload food image"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
      >
        <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow-md">
          <svg
            className="w-10 h-10 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold text-gray-700 mb-2">Upload Image</span>
        <span className="text-sm text-gray-500 text-center px-4">
          {isDragging ? 'Drop image here' : 'Click or drag & drop'}
        </span>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="File input for image upload"
      />
    </div>
  );
};

export default UploadCard;
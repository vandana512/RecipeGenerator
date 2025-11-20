import React from 'react';

const ImageGallery = ({ images, selectedId, onSelect, onRemove }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Image Gallery</h2>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative group aspect-square rounded-xl overflow-hidden cursor-pointer transition-all ${
              selectedId === image.id
                ? 'ring-4 ring-peach shadow-xl scale-105'
                : 'hover:shadow-lg hover:scale-105'
            }`}
            onClick={() => onSelect(image.id)}
            role="button"
            tabIndex={0}
            aria-label={`Select image ${image.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelect(image.id);
              }
            }}
          >
            <img
              src={image.src}
              alt={image.name || 'Food image'}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(image.id);
              }}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
              aria-label={`Remove image ${image.name}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
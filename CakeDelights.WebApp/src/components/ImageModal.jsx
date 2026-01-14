import { useState, useEffect } from 'react'

export default function ImageModal({ isOpen, imageUrl, imageName, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false)

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !imageUrl) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative z-51 bg-black rounded-lg overflow-hidden max-w-4xl max-h-screen w-11/12 h-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-52 bg-white hover:bg-gray-200 rounded-full p-2 transition transform hover:scale-110"
          aria-label="Close image"
        >
          <svg
            className="w-6 h-6 text-black"
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

        {/* Image Container */}
        <div className="relative bg-black flex items-center justify-center max-h-96 md:max-h-screen">
          <img
            src={imageUrl}
            alt={imageName}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`max-w-full max-h-96 md:max-h-screen object-contain cursor-zoom-in transition-transform ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
          />
        </div>

        {/* Info Section */}
        <div className="bg-white p-6 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{imageName}</h3>
          <p className="text-sm text-gray-600">
            Click the image to zoom in/out • Press ESC to close
          </p>
        </div>
      </div>
    </div>
  )
}

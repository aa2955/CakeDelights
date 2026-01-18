import { useState, useEffect } from 'react'

export default function CateringGallery({ galleryItems }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (galleryItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [galleryItems.length])

  if (galleryItems.length === 0) {
    return null
  }

  const currentItem = galleryItems[currentSlide]

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length)
  }

  return (
    <>
      <div className="mb-12 rounded-lg overflow-hidden card-shadow bg-white">
        {/* Main Slideshow */}
        <div className="relative bg-gray-100 h-96 flex items-center justify-center group">
          {currentItem.image ? (
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
              <p className="text-gray-500 text-lg">No image available</p>
            </div>
          )}

          {/* Navigation Arrows - Hidden until hovered */}
          {galleryItems.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100 text-2xl font-bold"
                aria-label="Previous slide"
              >
                ❮
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100 text-2xl font-bold"
                aria-label="Next slide"
              >
                ❯
              </button>
            </>
          )}

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-sm font-semibold">
            {currentSlide + 1} / {galleryItems.length}
          </div>
        </div>

        {/* Item Info */}
        <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100">
          <h2 className="text-3xl font-bold text-pink-700 mb-2">
            {currentItem.name}
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            {currentItem.description}
          </p>
          {currentItem.category && (
            <div className="inline-block bg-pink-200 text-pink-800 px-4 py-2 rounded-full text-sm font-semibold">
              Category: {currentItem.category}
            </div>
          )}
        </div>

        {/* Dot Indicators */}
        {galleryItems.length > 1 && (
          <div className="bg-white px-6 py-4 flex justify-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-pink-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

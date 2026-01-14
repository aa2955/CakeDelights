import { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { formatCurrency } from '../utils/helpers'
import ImageModal from './ImageModal'

export default function MenuCard({ item }) {
  const { isAdmin, deleteMenuItem } = useData()
  const [showImageModal, setShowImageModal] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden card-shadow card-hover">
        {/* Image Container */}
        {item.image && (
          <div
            className="w-full h-48 bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowImageModal(true)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Category Badge */}
          {item.category && (
            <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              {item.category}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Flavors */}
          {item.flavors && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">Flavors:</p>
              <p className="text-sm text-gray-600">{item.flavors}</p>
            </div>
          )}

          {/* Servings */}
          {item.servings && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">Servings:</p>
              <p className="text-sm text-gray-600">{item.servings}</p>
            </div>
          )}

          {/* Sizes & Prices */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 mb-4 border border-pink-100">
            <p className="text-xs font-bold text-pink-700 mb-3 uppercase tracking-wide">📦 Available Options</p>
            <div className="space-y-2">
              {item.sizes && item.sizes.map((size, index) => (
                <div key={index} className="bg-white rounded-lg p-3 hover:shadow-md transition">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{size.size}</p>
                      {size.servings && (
                        <p className="text-xs text-gray-500 mt-1">🍽️ {size.servings}</p>
                      )}
                    </div>
                    <div className="bg-pink-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                      {formatCurrency(size.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          {/* Admin actions removed - will be in admin panel only */}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        imageUrl={item.image}
        imageName={item.name}
        onClose={() => setShowImageModal(false)}
      />
    </>
  )
}

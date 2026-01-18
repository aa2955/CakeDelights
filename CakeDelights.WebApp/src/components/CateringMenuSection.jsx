import { useState } from 'react'
import { useData } from '../contexts/DataContext'
import { formatCurrency } from '../utils/helpers'
import CateringGallery from './CateringGallery'

export default function CateringMenuSection() {
  const { getItemsBySection, isAdmin, deleteMenuItem } = useData()
  const allItems = getItemsBySection('catering')

  // Get gallery items (items marked with isGalleryItem = true)
  const galleryItems = allItems.filter(item => item.isGalleryItem === true)
  
  // Get menu items (regular catering items - not gallery items)
  const menuItems = allItems.filter(item => item.isGalleryItem !== true)

  // Group menu items by category
  const categorizedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  // Sort categories alphabetically
  const sortedCategories = Object.keys(categorizedItems).sort()

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Gallery Section */}
      {galleryItems.length > 0 && (
        <CateringGallery galleryItems={galleryItems} />
      )}

      {/* Menu Items Section */}
      {menuItems.length === 0 && galleryItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No catering items available yet</p>
        </div>
      ) : (
        <div>
          {sortedCategories.map((category) => (
            <div key={category} className="mb-12">
              {/* Category Header */}
              <div className="mb-6 pb-3 border-b-3 border-pink-600">
                <h2 className="text-3xl font-bold text-pink-700">{category}</h2>
              </div>

              {/* Items in Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedItems[category].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden card-shadow hover:shadow-lg transition-shadow"
                  >
                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.name}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>
                      )}

                      {/* Sizes and Prices */}
                      <div className="mb-4 space-y-2">
                        {item.sizes && item.sizes.length > 0 ? (
                          <>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                              Available Sizes
                            </p>
                            {item.sizes.map((sizeOption, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center bg-pink-50 px-3 py-2 rounded text-sm"
                              >
                                <span className="font-medium text-gray-700">
                                  {sizeOption.size}
                                </span>
                                <span className="text-pink-700 font-bold">
                                  {formatCurrency(sizeOption.price)}
                                </span>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p className="text-pink-700 font-bold text-lg">
                            Price upon request
                          </p>
                        )}
                      </div>

                      {/* Admin Actions */}
                      {isAdmin && (
                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => handleDelete(item)}
                            className="flex-1 bg-red-500 text-white py-2 px-3 rounded font-semibold text-sm hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

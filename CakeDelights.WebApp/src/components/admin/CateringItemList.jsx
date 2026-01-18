import { useData } from '../../contexts/DataContext'
import { formatCurrency } from '../../utils/helpers'

export default function CateringItemList({ items, onEdit, editingId }) {
  const { deleteMenuItem } = useData()

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id)
    }
  }

  // Separate gallery and menu items
  const galleryItems = items.filter(item => item.isGalleryItem === true)
  const menuItems = items.filter(item => item.isGalleryItem !== true)

  // Group menu items by category
  const categorizedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  const sortedCategories = Object.keys(categorizedMenuItems).sort()

  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Catering Items</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No catering items yet. Create one using the form!</p>
      ) : (
        <div className="space-y-8">
          {/* Gallery Items Section */}
          {galleryItems.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-200">
                ✨ Gallery Items ({galleryItems.length})
              </h3>
              <div className="space-y-3">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`border-l-4 border-blue-500 pl-4 py-3 ${
                      editingId === item.id ? 'bg-yellow-50' : 'bg-blue-50 hover:bg-blue-100'
                    } rounded transition`}
                  >
                    {/* Image Preview */}
                    {item.image && (
                      <div className="mb-3 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-blue-300">
                        <img
                          src={item.image}
                          alt={item.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{item.title || '(Untitled Image)'}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                        <span className="inline-block text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded font-semibold mt-2">
                          Featured in Slideshow
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 border-t border-blue-200">
                      <button
                        onClick={() => onEdit(item)}
                        className={`flex-1 py-2 px-3 rounded font-semibold text-sm transition ${
                          editingId === item.id
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {editingId === item.id ? 'Editing...' : 'Edit'}
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 py-2 px-3 rounded font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Items Section */}
          {menuItems.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-pink-600 mb-3 pb-2 border-b-2 border-pink-200">
                🍽️ Menu Items ({menuItems.length})
              </h3>
              <div className="space-y-6">
                {sortedCategories.map((category) => (
                  <div key={category}>
                    <h4 className="text-md font-bold text-pink-600 mb-2">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {categorizedMenuItems[category].map((item) => (
                        <div
                          key={item.id}
                          className={`border-l-4 border-pink-500 pl-4 py-3 ${
                            editingId === item.id ? 'bg-yellow-50' : 'bg-gray-50 hover:bg-gray-100'
                          } rounded transition`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-800">{item.name}</h5>
                              {item.description && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                  {item.description}
                                </p>
                              )}
                              {item.sizes && item.sizes.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {item.sizes.map((size, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded"
                                    >
                                      {size.size}: {formatCurrency(size.price)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                            <button
                              onClick={() => onEdit(item)}
                              className={`flex-1 py-2 px-3 rounded font-semibold text-sm transition ${
                                editingId === item.id
                                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                            >
                              {editingId === item.id ? 'Editing...' : 'Edit'}
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="flex-1 py-2 px-3 rounded font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

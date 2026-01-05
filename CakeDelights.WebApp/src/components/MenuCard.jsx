import { useData } from '../contexts/DataContext'
import { formatCurrency } from '../utils/helpers'

export default function MenuCard({ item }) {
  const { isAdmin, deleteMenuItem } = useData()

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      deleteMenuItem(item.id)
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden card-shadow card-hover">
      {/* Image Container */}
      {item.image && (
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
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
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Sizes & Prices:</p>
          <div className="space-y-1">
            {item.sizes && item.sizes.map((size, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-medium">{size.size}</span>
                <span className="text-pink-600 font-bold">{formatCurrency(size.price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Actions */}
        {/* Admin actions removed - will be in admin panel only */}
      </div>
    </div>
  )
}

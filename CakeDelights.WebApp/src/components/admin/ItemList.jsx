import { useData } from '../../contexts/DataContext'
import { formatCurrency } from '../../utils/helpers'

export default function ItemList({ items, onEdit, editingId }) {
  const { deleteMenuItem } = useData()

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteMenuItem(id)
      } catch (error) {
        alert('Failed to delete item: ' + error.message)
      }
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 card-shadow text-center">
        <p className="text-gray-600 text-lg">No items in this section yet</p>
        <p className="text-gray-500 text-sm mt-2">Add your first item using the form on the left</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Items ({items.length})</h2>
      {items.map(item => (
        <div
          key={item.id}
          className={`bg-white rounded-lg p-4 card-shadow transition ${
            editingId === item.id ? 'ring-2 ring-pink-500 bg-pink-50' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              {item.category && (
                <span className="inline-block bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-semibold mt-1">
                  {item.category}
                </span>
              )}
            </div>
          </div>

          {item.image && (
            <div className="mb-3 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <p className="text-gray-600 text-sm mb-2">{item.description}</p>

          {item.flavors && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Flavors:</span> {item.flavors}
            </p>
          )}

          {item.servings && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Servings:</span> {item.servings}
            </p>
          )}

          <div className="bg-gray-50 rounded p-2 mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">Sizes & Prices:</p>
            <div className="space-y-1">
              {item.sizes.map((size, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600">
                  <span>{size.size}</span>
                  <span className="font-semibold">{formatCurrency(size.price)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDelete(item.id, item.name)}
              className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useData } from '../../contexts/DataContext'
import { convertImageToBase64, validateMenuItem } from '../../utils/helpers'

export default function ItemForm({ section, editingItem, onEditingComplete }) {
  const { addMenuItem, updateMenuItem } = useData()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    flavors: '',
    servings: '',
    sizes: [{ size: '', price: '' }],
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem)
      setImagePreview(editingItem.image)
    } else {
      resetForm()
    }
  }, [editingItem])

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      flavors: '',
      servings: '',
      sizes: [{ size: '', price: '' }],
      image: null
    })
    setImagePreview(null)
    setErrors([])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes]
    newSizes[index] = {
      ...newSizes[index],
      [field]: field === 'price' ? parseFloat(value) || '' : value
    }
    setFormData(prev => ({
      ...prev,
      sizes: newSizes
    }))
  }

  const addSizeOption = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', price: '' }]
    }))
  }

  const removeSizeOption = (index) => {
    if (formData.sizes.length > 1) {
      setFormData(prev => ({
        ...prev,
        sizes: prev.sizes.filter((_, i) => i !== index)
      }))
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const base64 = await convertImageToBase64(file)
        setFormData(prev => ({
          ...prev,
          image: base64
        }))
        setImagePreview(base64)
      } catch (err) {
        setErrors([err])
      }
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }))
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')

    const validationErrors = validateMenuItem(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const itemData = {
        ...formData,
        section: section
      }

      if (editingItem) {
        await updateMenuItem(editingItem.id, itemData)
        setSuccessMessage(`"${formData.name}" updated successfully!`)
      } else {
        await addMenuItem(itemData)
        setSuccessMessage(`"${formData.name}" added successfully!`)
      }

      setTimeout(() => {
        resetForm()
        onEditingComplete()
        setSuccessMessage('')
      }, 2000)
    } catch (err) {
      setErrors(['Failed to save item: ' + err.message])
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 card-shadow sticky top-20">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">
        {editingItem ? 'Edit Item' : 'Add New Item'}
      </h2>

      {errors.length > 0 && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Item Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Chocolate Cake"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Cakes, Pastries"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your item"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          />
        </div>

        {/* Flavors */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Available Flavors
          </label>
          <input
            type="text"
            name="flavors"
            value={formData.flavors}
            onChange={handleInputChange}
            placeholder="e.g., Vanilla, Chocolate, Strawberry"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Servings */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Servings
          </label>
          <input
            type="text"
            name="servings"
            value={formData.servings}
            onChange={handleInputChange}
            placeholder="e.g., 6-8 servings"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Sizes & Prices */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sizes & Prices *
          </label>
          <div className="space-y-2">
            {formData.sizes.map((size, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Size (e.g., 1kg)"
                    value={size.size}
                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={size.price}
                    onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    step="0.01"
                    min="0"
                  />
                </div>
                {formData.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeOption(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSizeOption}
            className="mt-2 text-sm text-pink-600 font-semibold hover:text-pink-700 transition"
          >
            + Add Another Size
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Image
          </label>
          {imagePreview ? (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <button
                type="button"
                onClick={removeImage}
                className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border-2 border-dashed border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 text-sm"
            />
          )}
          <p className="text-xs text-gray-500 mt-1">Max size: 5MB. JPG, PNG, GIF supported.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            {editingItem ? 'Update' : 'Add'} Item
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                resetForm()
                onEditingComplete()
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

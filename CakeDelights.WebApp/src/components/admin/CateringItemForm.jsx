import { useState, useEffect } from 'react'
import { useData } from '../../contexts/DataContext'
import { convertImageToBase64 } from '../../utils/helpers'

export default function CateringItemForm({ editingItem, onEditingComplete }) {
  const { addMenuItem, updateMenuItem } = useData()
  const [itemType, setItemType] = useState('menu') // 'menu' or 'gallery'
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    category: '',
    description: '',
    sizes: [{ size: '', price: '' }]
  })
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [defaultCategories, setDefaultCategories] = useState([
    'Italian',
    'Pizza',
    'Sandwiches',
    'Appetizers',
    'Pasta',
    'Salads',
    'Desserts'
  ])
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    if (editingItem) {
      setImagePreview(editingItem.image)
      if (editingItem.isGalleryItem) {
        setItemType('gallery')
        setGalleryFormData({
          title: editingItem.title || '',
          image: editingItem.image
        })
      } else {
        setItemType('menu')
        setMenuFormData({
          name: editingItem.name || '',
          category: editingItem.category || '',
          description: editingItem.description || '',
          sizes: editingItem.sizes || [{ size: '', price: '' }]
        })
      }
    } else {
      resetForm()
    }
  }, [editingItem])

  const resetForm = () => {
    setMenuFormData({
      name: '',
      category: '',
      description: '',
      sizes: [{ size: '', price: '' }]
    })
    setGalleryFormData({
      title: '',
      image: null
    })
    setImagePreview(null)
    setErrors([])
    setShowNewCategory(false)
    setNewCategory('')
    setItemType('menu')
  }

  const handleMenuInputChange = (e) => {
    const { name, value } = e.target
    setMenuFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGalleryInputChange = (e) => {
    const { name, value } = e.target
    setGalleryFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    if (value === '__new__') {
      setShowNewCategory(true)
      setMenuFormData(prev => ({
        ...prev,
        category: ''
      }))
    } else {
      setMenuFormData(prev => ({
        ...prev,
        category: value
      }))
      setShowNewCategory(false)
    }
  }

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      setDefaultCategories(prev => [...prev, newCategory])
      setMenuFormData(prev => ({
        ...prev,
        category: newCategory
      }))
      setNewCategory('')
      setShowNewCategory(false)
    }
  }

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...menuFormData.sizes]
    newSizes[index] = {
      ...newSizes[index],
      [field]: field === 'price' ? parseFloat(value) || '' : value
    }
    setMenuFormData(prev => ({
      ...prev,
      sizes: newSizes
    }))
  }

  const addSizeOption = () => {
    setMenuFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', price: '' }]
    }))
  }

  const removeSizeOption = (index) => {
    if (menuFormData.sizes.length > 1) {
      setMenuFormData(prev => ({
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
        if (itemType === 'gallery') {
          setGalleryFormData(prev => ({
            ...prev,
            image: base64
          }))
        }
        setImagePreview(base64)
      } catch (err) {
        setErrors([err.message])
      }
    }
  }

  const removeImage = () => {
    if (itemType === 'gallery') {
      setGalleryFormData(prev => ({
        ...prev,
        image: null
      }))
    }
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setSuccessMessage('')

    try {
      if (itemType === 'gallery') {
        // Gallery item validation
        if (!galleryFormData.image) {
          setErrors(['Gallery image is required'])
          return
        }

        const itemData = {
          title: galleryFormData.title || 'Gallery Image',
          image: galleryFormData.image,
          section: 'catering',
          isGalleryItem: true
        }

        if (editingItem) {
          await updateMenuItem(editingItem.id, itemData)
          setSuccessMessage('Gallery image updated successfully!')
        } else {
          await addMenuItem(itemData)
          setSuccessMessage('Gallery image added successfully!')
        }
      } else {
        // Menu item validation
        const validationErrors = []
        if (!menuFormData.name.trim()) validationErrors.push('Name is required')
        if (!menuFormData.category.trim()) validationErrors.push('Category is required')
        if (menuFormData.sizes.some(s => !s.size.trim() || !s.price)) {
          validationErrors.push('All sizes must have a name and price')
        }

        if (validationErrors.length > 0) {
          setErrors(validationErrors)
          return
        }

        const itemData = {
          ...menuFormData,
          section: 'catering',
          isGalleryItem: false
        }

        if (editingItem) {
          await updateMenuItem(editingItem.id, itemData)
          setSuccessMessage(`"${menuFormData.name}" updated successfully!`)
        } else {
          await addMenuItem(itemData)
          setSuccessMessage(`"${menuFormData.name}" added successfully!`)
        }
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
        {editingItem ? 'Edit Item' : 'Add Item'}
      </h2>

      {/* Item Type Selector */}
      {!editingItem && (
        <div className="mb-6 border-b-2 pb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">What are you adding?</p>
          <div className="flex gap-3 flex-col">
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-pink-50 rounded-lg border-2 transition" style={{borderColor: itemType === 'menu' ? '#ec4899' : '#e5e7eb'}}>
              <input
                type="radio"
                name="itemType"
                value="menu"
                checked={itemType === 'menu'}
                onChange={(e) => setItemType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-semibold text-gray-700">🍽️ Menu Item</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-blue-50 rounded-lg border-2 transition" style={{borderColor: itemType === 'gallery' ? '#3b82f6' : '#e5e7eb'}}>
              <input
                type="radio"
                name="itemType"
                value="gallery"
                checked={itemType === 'gallery'}
                onChange={(e) => setItemType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-semibold text-gray-700">🖼️ Gallery</span>
            </label>
          </div>
        </div>
      )}

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
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* GALLERY FORM */}
        {itemType === 'gallery' ? (
          <>
            {/* Gallery Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image *
              </label>
              {imagePreview ? (
                <div className="mb-3 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition">
                  <div className="text-gray-600">
                    <p className="font-semibold text-lg">📸 Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Optional Title */}
            <div>
              <label htmlFor="gallery-title" className="block text-sm font-semibold text-gray-700 mb-2">
                Optional Title
              </label>
              <input
                type="text"
                id="gallery-title"
                name="title"
                value={galleryFormData.title}
                onChange={handleGalleryInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="e.g., Featured Dish"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition"
            >
              {editingItem ? '✏️ Update Gallery Image' : '➕ Add to Gallery'}
            </button>
          </>
        ) : (
          <>
            {/* Menu Item Form */}
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={menuFormData.name}
                onChange={handleMenuInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                placeholder="e.g., Spaghetti Carbonara"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <div className="flex gap-2">
                <select
                  id="category"
                  value={showNewCategory ? '__new__' : menuFormData.category}
                  onChange={handleCategoryChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                >
                  <option value="">Select a category</option>
                  {defaultCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__new__">+ Add new category</option>
                </select>
              </div>

              {showNewCategory && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddNewCategory}
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={menuFormData.description}
                onChange={handleMenuInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                placeholder="e.g., Fresh pasta with creamy bacon sauce..."
              />
            </div>

            {/* Sizes and Prices */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sizes & Prices *
              </label>
              <div className="space-y-3">
                {menuFormData.sizes.map((sizeOption, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={sizeOption.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="Size (e.g., Small, Medium, Large)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none text-sm"
                    />
                    <input
                      type="number"
                      value={sizeOption.price}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none text-sm"
                    />
                    {menuFormData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeOption(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
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
                className="mt-3 text-pink-600 font-semibold text-sm hover:text-pink-700"
              >
                + Add another size
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 rounded-lg font-bold hover:from-pink-700 hover:to-pink-800 transition"
            >
              {editingItem ? '✏️ Update Menu Item' : '➕ Add Menu Item'}
            </button>
          </>
        )}

        {/* Cancel Button (when editing) */}
        {editingItem && (
          <button
            type="button"
            onClick={() => {
              resetForm()
              onEditingComplete()
            }}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

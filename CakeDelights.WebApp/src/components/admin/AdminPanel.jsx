import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import ItemForm from './ItemForm'
import ItemList from './ItemList'

export default function AdminPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('bakery')
  const [editingId, setEditingId] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const { menuItems, logout, getItemsBySection } = useData()

  const currentItems = menuItems.filter(item => item.section === activeTab)
  const bakeryCount = getItemsBySection('bakery').length
  const cateringCount = getItemsBySection('catering').length

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditingItem(item)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingItem(null)
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-pink-700 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your menu items</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Back to Menu
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
        <button
          onClick={() => {
            setActiveTab('bakery')
            handleCancelEdit()
          }}
          className={`pb-3 font-semibold text-lg transition ${
            activeTab === 'bakery'
              ? 'text-pink-600 border-b-4 border-pink-600'
              : 'text-gray-600 hover:text-pink-600'
          }`}
        >
          🍰 Bakery Items ({bakeryCount})
        </button>
        <button
          onClick={() => {
            setActiveTab('catering')
            handleCancelEdit()
          }}
          className={`pb-3 font-semibold text-lg transition ${
            activeTab === 'catering'
              ? 'text-pink-600 border-b-4 border-pink-600'
              : 'text-gray-600 hover:text-pink-600'
          }`}
        >
          🍽️ Catering Items ({cateringCount})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <ItemForm
            section={activeTab}
            editingItem={editingItem}
            onEditingComplete={handleCancelEdit}
          />
        </div>

        {/* Items List Section */}
        <div className="lg:col-span-2">
          <ItemList
            items={currentItems}
            onEdit={handleEdit}
            editingId={editingId}
          />
        </div>
      </div>
    </div>
  )
}


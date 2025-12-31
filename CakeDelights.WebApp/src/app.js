import React, { useState, useEffect, useId } from 'react';
import { Plus, Edit2, Trash2, X, LogOut, Lock, Upload } from 'lucide-react';

const CakeDelights = () => {
  const [activeSection, setActiveSection] = useState('bakery');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [bakeryItems, setBakeryItems] = useState([]);
  const [cateringItems, setCateringItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '' });
  const [editingSocial, setEditingSocial] = useState(false);

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    loadMenuItems();
    loadSocialLinks();
  }, []);

  const loadSocialLinks = () => {
    try {
      const stored = localStorage.getItem('social-links');
      if (stored) {
        setSocialLinks(JSON.parse(stored));
      }
    } catch (error) {
      console.log('No social links data');
    }
  };

  const saveSocialLinks = (links) => {
    try {
      localStorage.setItem('social-links', JSON.stringify(links));
      setSocialLinks(links);
    } catch (error) {
      console.error('Error saving social links:', error);
    }
  };

  const loadMenuItems = () => {
    try {
      const bakeryData = localStorage.getItem('bakery-menu');
      const cateringData = localStorage.getItem('catering-menu');
      
      if (bakeryData) {
        setBakeryItems(JSON.parse(bakeryData));
      }
      if (cateringData) {
        setCateringItems(JSON.parse(cateringData));
      }
    } catch (error) {
      console.log('No existing menu data');
    } finally {
      setLoading(false);
    }
  };

  const saveMenuItems = (section, items) => {
    try {
      localStorage.setItem(`${section}-menu`, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleAddItem = (formData) => {
    const newItem = {
      id: Date.now(),
      ...formData
    };

    if (activeSection === 'bakery') {
      const updated = [...bakeryItems, newItem];
      setBakeryItems(updated);
      saveMenuItems('bakery', updated);
    } else {
      const updated = [...cateringItems, newItem];
      setCateringItems(updated);
      saveMenuItems('catering', updated);
    }
    setShowAddForm(false);
  };

  const handleEditItem = (formData) => {
    const updatedItem = {
      ...editingItem,
      ...formData
    };

    if (activeSection === 'bakery') {
      const updated = bakeryItems.map(item => 
        item.id === editingItem.id ? updatedItem : item
      );
      setBakeryItems(updated);
      saveMenuItems('bakery', updated);
    } else {
      const updated = cateringItems.map(item => 
        item.id === editingItem.id ? updatedItem : item
      );
      setCateringItems(updated);
      saveMenuItems('catering', updated);
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    if (activeSection === 'bakery') {
      const updated = bakeryItems.filter(item => item.id !== id);
      setBakeryItems(updated);
      saveMenuItems('bakery', updated);
    } else {
      const updated = cateringItems.filter(item => item.id !== id);
      setCateringItems(updated);
      saveMenuItems('catering', updated);
    }
  };

  const MenuForm = ({ item, onSubmit, onCancel }) => {
    const fileInputId = useId();
    const [formData, setFormData] = useState({
      name: item?.name || '',
      description: item?.description || '',
      category: item?.category || '',
      sizes: item?.sizes || [{ size: '', price: '' }],
      servings: item?.servings || '',
      flavors: item?.flavors || '',
      image: item?.image || ''
    });

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 5000000) {
          alert('Image size should be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({...formData, image: reader.result});
        };
        reader.readAsDataURL(file);
      }
    };

    const addSizeOption = () => {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, { size: '', price: '' }]
      });
    };

    const updateSize = (index, field, value) => {
      const newSizes = [...formData.sizes];
      newSizes[index][field] = value;
      setFormData({...formData, sizes: newSizes});
    };

    const removeSize = (index) => {
      const newSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData({...formData, sizes: newSizes});
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.description) {
        alert('Please fill in name and description');
        return;
      }
      
      const validSizes = formData.sizes.filter(s => s.size && s.price);
      if (validSizes.length === 0) {
        alert('Please add at least one size with price');
        return;
      }

      onSubmit({...formData, sizes: validSizes});
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              {item ? 'Edit Item' : 'Add New Item'}
            </h3>
            <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 focus:outline-none transition">
              <X size={24} />
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="e.g., Chocolate Cake"
                aria-label="Item Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="e.g., Cakes, Pastries, Cookies"
                aria-label="Category"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                rows="3"
                placeholder="Describe your item..."
                aria-label="Description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Available Flavors</label>
              <input
                type="text"
                value={formData.flavors}
                onChange={(e) => setFormData({...formData, flavors: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="e.g., Vanilla, Chocolate, Strawberry"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Servings</label>
              <input
                type="text"
                value={formData.servings}
                onChange={(e) => setFormData({...formData, servings: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="e.g., Serves 10-12 people"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Sizes & Prices *</label>
              {formData.sizes.map((sizeOption, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={sizeOption.size}
                    onChange={(e) => updateSize(index, 'size', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                    placeholder="Size (e.g., 1kg, Small, 6 inch)"
                  />
                  <input
                    type="text"
                    value={sizeOption.price}
                    onChange={(e) => updateSize(index, 'price', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                    placeholder="Price (e.g., ₹500)"
                  />
                  {formData.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition"
                      aria-label="Remove size"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSizeOption}
                className="text-pink-600 hover:text-pink-700 text-sm font-semibold focus:outline-none transition"
              >
                + Add Another Size
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition">
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt={formData.name || 'Preview image'} className="max-h-48 mx-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="mt-2 text-red-500 hover:text-red-600 text-sm focus:outline-none transition"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto text-pink-400 mb-2" size={32} />
                    <p className="text-gray-600 mb-2">Click to upload image</p>
                    <input
                      id={fileInputId}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor={fileInputId}
                      className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 inline-block focus:outline-none transition"
                    >
                      Choose Image
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Max 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-lg hover:from-pink-600 hover:to-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
              >
                {item ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-400 transition focus:outline-none font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SocialLinksModal = () => {
    const [tempLinks, setTempLinks] = useState(socialLinks);

    const handleSave = () => {
      saveSocialLinks(tempLinks);
      setEditingSocial(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Edit Social Links</h3>
            <button type="button" onClick={() => setEditingSocial(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none transition">
              <X size={24} />
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Instagram URL</label>
              <input
                type="text"
                value={tempLinks.instagram}
                onChange={(e) => setTempLinks({...tempLinks, instagram: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="https://instagram.com/yourpage"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Facebook URL</label>
              <input
                type="text"
                value={tempLinks.facebook}
                onChange={(e) => setTempLinks({...tempLinks, facebook: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-lg hover:from-pink-600 hover:to-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingSocial(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-400 transition focus:outline-none font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginModal = () => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Admin Login</h3>
            <button type="button" onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none transition">
              <X size={24} />
            </button>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">Demo password: admin123</p>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 rounded-lg hover:from-pink-600 hover:to-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };

  const currentItems = activeSection === 'bakery' ? bakeryItems : cateringItems;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
        <div className="text-pink-600 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      <header className="relative bg-white shadow-md border-b border-pink-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-full p-3 shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
                    <circle cx="100" cy="140" r="50" fill="#FF1493" opacity="0.2"/>
                    <ellipse cx="100" cy="120" rx="60" ry="40" fill="#FF69B4"/>
                    <ellipse cx="100" cy="80" rx="50" ry="30" fill="#FFB6C1"/>
                    <circle cx="85" cy="60" r="8" fill="#FF1493"/>
                    <circle cx="115" cy="55" r="6" fill="#FF69B4"/>
                    <circle cx="100" cy="45" r="7" fill="#FF1493"/>
                    <path d="M 85 60 Q 85 30 85 25" stroke="#FF1493" strokeWidth="2" fill="none"/>
                    <path d="M 100 45 Q 100 20 100 15" stroke="#FF1493" strokeWidth="2" fill="none"/>
                    <path d="M 115 55 Q 115 30 115 28" stroke="#FF69B4" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'cursive' }}>
                  Cake Delights
                </h1>
                <p className="text-red-500 text-base font-medium italic tracking-wide">Delight in your Reality</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                🥬 100% Vegetarian
              </span>
              <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                🥚 Eggless
              </span>
              <span className="inline-flex items-center bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full">
                🚫 No Onion
              </span>
              <span className="inline-flex items-center bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                🚫 No Garlic
              </span>
            </div>

            <div className="absolute top-8 right-4">
              {isAdmin ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-full hover:from-pink-600 hover:to-pink-700 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-full hover:from-pink-600 hover:to-pink-700 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
                >
                  <Lock size={18} />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6">
            <button
              type="button"
              onClick={() => setActiveSection('bakery')}
              aria-pressed={activeSection === 'bakery'}
              className={`py-3 px-6 text-lg font-semibold transition rounded-t-md ${
                activeSection === 'bakery'
                  ? 'text-white border-b-4 border-white bg-pink-600/30'
                  : 'text-pink-100 hover:text-white'
              }`}
            >
              Bakery
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('catering')}
              aria-pressed={activeSection === 'catering'}
              className={`py-3 px-6 text-lg font-semibold transition rounded-t-md ${
                activeSection === 'catering'
                  ? 'text-white border-b-4 border-white bg-pink-600/30'
                  : 'text-pink-100 hover:text-white'
              }`}
            >
              Catering
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
            {activeSection === 'bakery' ? 'Bakery Menu' : 'Catering Menu'}
          </h2>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2.5 rounded-lg hover:from-pink-600 hover:to-pink-700 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 font-semibold"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </button>
          )}
        </div>

        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg font-medium">{isAdmin ? 'No items yet. Add your first item!' : 'No items available.'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transform transition duration-300">
                {item.image && (
                  <img src={item.image} alt={item.name || 'Item image'} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-pink-600">{item.name}</h3>
                      {item.category && (
                        <span className="inline-block bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 text-xs px-3 py-1 rounded-full mt-2 font-semibold">
                          {item.category}
                        </span>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingItem(item)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none transition"
                          aria-label="Edit item"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none transition"
                          aria-label="Delete item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  {item.flavors && (
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Flavors:</span>
                      <p className="text-gray-600 text-sm mt-1">{item.flavors}</p>
                    </div>
                  )}
                  
                  {item.servings && (
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Servings:</span>
                      <p className="text-gray-600 text-sm mt-1">{item.servings}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-700 mb-3 text-sm">Pricing:</p>
                    {item.sizes?.map((sizeOption, index) => (
                      <div key={index} className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-gray-700">{sizeOption.size}</span>
                        <span className="text-pink-600 font-bold text-lg">{sizeOption.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-pink-200 shadow-lg mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent mb-6">Follow Us</h3>
            <div className="flex gap-6 mb-8">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-4 rounded-full hover:scale-110 transition transform shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Instagram"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69"/>
                  </svg>
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-4 rounded-full hover:scale-110 transition transform shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Facebook"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {!socialLinks.instagram && !socialLinks.facebook && isAdmin && (
                <p className="text-gray-500 text-sm font-medium">Click "Edit Social Links" to add your social media</p>
              )}
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={() => setEditingSocial(true)}
                className="mb-6 text-sm bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2.5 rounded-lg hover:from-pink-600 hover:to-pink-700 transition font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Edit Social Links
              </button>
            )}

            <p className="text-gray-600 text-sm font-medium">© {new Date().getFullYear()} Cake Delights. All rights reserved.</p>
          </div
import React, { useState } from 'react'
import { useData } from '../contexts/DataContext'

export default function Footer() {
  const { socialLinks, isAdmin } = useData()
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <footer className="gradient-pink mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Social Media */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-pink-600 font-bold text-2xl hover:scale-110 transition"
                title="Instagram"
              >
                📷
              </a>
            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-pink-600 font-bold text-2xl hover:scale-110 transition"
                title="Facebook"
              >
                👍
              </a>
            )}
            {!socialLinks.instagram && !socialLinks.facebook && (
              <p className="text-white">Social media links coming soon</p>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="text-center mb-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition"
            >
              Edit Social Links
            </button>
          </div>
        )}

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-pink-400">
          <p className="text-white text-sm">
            © 2024 Cake Delights. All rights reserved. 🍰
          </p>
          <p className="text-pink-100 text-xs mt-1">
            100% Vegetarian • Eggless • No Onion • No Garlic
          </p>
        </div>
      </div>

      {showEditModal && (
        <SocialLinksModal
          onClose={() => setShowEditModal(false)}
        />
      )}
    </footer>
  )
}

function SocialLinksModal({ onClose }) {
  const { socialLinks, updateSocialLinks } = useData()
  const [instagram, setInstagram] = useState(socialLinks.instagram)
  const [facebook, setFacebook] = useState(socialLinks.facebook)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateSocialLinks({
        instagram,
        facebook
      })
      onClose()
    } catch (error) {
      alert('Failed to update social links: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full admin-modal">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">Social Media Links</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Instagram URL
            </label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/cakedelights"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Facebook URL
            </label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/cakedelights"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

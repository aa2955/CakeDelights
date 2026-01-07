import React, { useState } from 'react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { useData } from '../contexts/DataContext'

export default function Footer() {
  const { socialLinks, isAdmin } = useData()
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <footer className="bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Social Media */}
        <div className="text-center">
          <div className="flex justify-center gap-4 items-center">
            <span className="text-sm text-white font-medium">Follow Us</span>
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 backdrop-blur-sm flex items-center justify-center text-white text-lg hover:scale-110 hover:bg-opacity-30 transition-all duration-300 group"
                title="Instagram"
              >
                <FaInstagram className="group-hover:text-pink-300" />
              </a>
            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 backdrop-blur-sm flex items-center justify-center text-white text-lg hover:scale-110 hover:bg-opacity-30 transition-all duration-300 group"
                title="Facebook"
              >
                <FaFacebook className="group-hover:text-blue-300" />
              </a>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowEditModal(true)}
                className="text-white text-xs px-3 py-1 rounded border border-white border-opacity-50 hover:bg-white hover:bg-opacity-10 transition ml-2"
              >
                Edit
              </button>
            )}
          </div>
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

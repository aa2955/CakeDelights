import { useState } from 'react'
import { useData } from '../../contexts/DataContext'

export default function LoginModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useData()

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password === ADMIN_PASSWORD) {
      login()
      onSuccess()
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full admin-modal">
        <h2 className="text-3xl font-bold text-pink-700 mb-2 text-center">Admin Login</h2>
        <p className="text-gray-600 text-center mb-6">Enter your password to access the admin panel</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

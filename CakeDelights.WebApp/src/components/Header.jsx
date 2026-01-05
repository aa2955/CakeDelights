import { useData } from '../contexts/DataContext'
import CakeLogo from './CakeLogo'

export default function Header({ onAdminClick, isAdmin }) {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Logo and Branding */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <CakeLogo />
            </div>
            <div>
              <h1 className="text-4xl font-bold prose-display bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
                Cake Delights
              </h1>
            </div>
          </div>
          
          {/* Admin Button */}
          <button
            onClick={onAdminClick}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isAdmin
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isAdmin ? 'Admin Panel' : 'Admin'}
          </button>
        </div>

        {/* Tagline */}
        <p className="text-center text-xl font-bold text-red-600 mb-4">
          Delight in your Reality
        </p>

        {/* Brand Values Badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
            🥬 100% Vegetarian
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            🥚 Eggless
          </div>
          <div className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full">
            🚫 No Onion
          </div>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            🚫 No Garlic
          </div>
        </div>
      </div>
    </header>
  )
}

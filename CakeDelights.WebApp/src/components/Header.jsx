import { useData } from '../contexts/DataContext'
import logoImage from '../assets/logo.png'
import { FaInstagram, FaFacebook } from 'react-icons/fa'

export default function Header({ onAdminClick, isAdmin }) {
  const { socialLinks } = useData()

  return (
    <header className="bg-gradient-to-r from-white via-pink-50 to-white border-b border-pink-200 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-2 sm:gap-8">
          {/* Left: Logo and Branding */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="relative w-12 sm:w-16 h-12 sm:h-16 flex-shrink-0 transition-all duration-500 hover:scale-110 cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-red-200 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-all duration-500"></div>
              <img 
                src={logoImage} 
                alt="Cake Delights Logo" 
                className="w-full h-full object-contain relative"
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center min-w-0">
              <h1 className="text-2xl sm:text-4xl bg-gradient-to-r from-pink-600 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight truncate" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '800' }}>
                Cake Delights
              </h1>
              <p className="text-xs text-gray-500 tracking-widest uppercase font-bold hidden sm:block">
                Delight In Your Reality
              </p>
            </div>
          </div>

          {/* Center: Vegetarian Badge and Social Links */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Vegetarian Badge */}
            <div className="flex group bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-default">
              <span className="inline-block transition-transform group-hover:scale-125 group-hover:rotate-12 origin-center">🥬</span> <span className="hidden sm:inline ml-1">100% Vegetarian</span>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-2.5">
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-9 h-9 flex items-center justify-center transition-all duration-300"
                  title="Instagram"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200 group-hover:from-pink-500 group-hover:to-pink-600 group-hover:border-pink-500 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                    <FaInstagram className="text-pink-600 group-hover:text-white transition-colors" size={16} />
                  </div>
                </a>
              )}
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-9 h-9 flex items-center justify-center transition-all duration-300"
                  title="Facebook"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:border-blue-500 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                    <FaFacebook className="text-blue-600 group-hover:text-white transition-colors" size={16} />
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Right: Empty space - Hidden on mobile */}
          <div className="hidden sm:block w-12"></div>
        </div>
      </div>

      {/* Decorative bottom border with gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gradient-to-r from-pink-300 via-pink-200 to-transparent opacity-40"></div>
    </header>
  )
}

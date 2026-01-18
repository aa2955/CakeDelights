import { useState } from 'react'
import { DataProvider, useData } from './contexts/DataContext'
import Header from './components/Header'
import Navigation from './components/Navigation'
import ContactBanner from './components/ContactBanner'
import MenuSection from './components/MenuSection'
import CateringMenuSection from './components/CateringMenuSection'
import Footer from './components/Footer'
import AdminPanel from './components/admin/AdminPanel'
import LoginModal from './components/admin/LoginModal'

function AppContent() {
  const { isAdmin, loading } = useData()
  const [activeSection, setActiveSection] = useState('bakery')
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleAdminClick = () => {
    if (isAdmin) {
      setShowAdminPanel(!showAdminPanel)
    } else {
      setShowLoginModal(true)
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    setShowAdminPanel(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-pink-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Cake Delights...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-pink-light flex flex-col relative">
      <Header onAdminClick={handleAdminClick} isAdmin={isAdmin} />
      {!showAdminPanel && <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />}
      {!showAdminPanel && <ContactBanner />}
      
      <main className="flex-grow">
        {showAdminPanel ? (
          <AdminPanel onClose={() => setShowAdminPanel(false)} />
        ) : activeSection === 'catering' ? (
          <CateringMenuSection />
        ) : (
          <MenuSection section={activeSection} />
        )}
      </main>

      <Footer />

      {showLoginModal && (
        <LoginModal
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* Floating Admin Button */}
      <button
        onClick={handleAdminClick}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-xl hover:shadow-2xl hover:from-pink-700 hover:to-pink-800 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center z-40 group"
        title={isAdmin ? "Admin Panel" : "Admin Login"}
      >
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">⚙️</span>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  )
}

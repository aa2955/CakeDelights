import { useState } from 'react'
import { DataProvider, useData } from './contexts/DataContext'
import Header from './components/Header'
import Navigation from './components/Navigation'
import MenuSection from './components/MenuSection'
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
    <div className="min-h-screen bg-gradient-pink-light flex flex-col">
      <Header onAdminClick={handleAdminClick} isAdmin={isAdmin} />
      {!showAdminPanel && <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />}
      
      <main className="flex-grow">
        {showAdminPanel ? (
          <AdminPanel onClose={() => setShowAdminPanel(false)} />
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

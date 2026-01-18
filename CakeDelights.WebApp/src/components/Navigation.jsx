export default function Navigation({ activeSection, setActiveSection }) {
  return (
    <nav className="bg-pink-500 sticky top-0 z-40 shadow-md">
      <div className="px-4 flex">
        <div className="max-w-6xl mx-auto flex flex-1">
          <button
            onClick={() => setActiveSection('bakery')}
            className={`flex-1 py-4 text-center font-semibold text-lg transition ${
              activeSection === 'bakery'
                ? 'text-white border-b-4 border-white'
                : 'text-pink-100 hover:text-white'
            }`}
          >
            🍰 Bakery
          </button>
          <button
            onClick={() => setActiveSection('catering')}
            className={`flex-1 py-4 text-center font-semibold text-lg transition ${
              activeSection === 'catering'
                ? 'text-white border-b-4 border-white'
                : 'text-pink-100 hover:text-white'
            }`}
          >
            🍽️ Catering
          </button>
        </div>
      </div>
    </nav>
  )
}

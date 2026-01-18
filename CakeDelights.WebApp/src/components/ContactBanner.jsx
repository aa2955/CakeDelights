export default function ContactBanner() {
  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg border-2 border-pink-300 p-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="text-center">
          <p className="text-base font-semibold text-gray-800 mb-2">
            📧 <a href="mailto:cakedelightsinfo@gmail.com" className="text-pink-600 hover:text-pink-700 underline transition">cakedelightsinfo@gmail.com</a>
          </p>
          <p className="text-sm text-gray-600">
            🚚 Delivery available, please contact
          </p>
        </div>
      </div>
    </div>
  )
}

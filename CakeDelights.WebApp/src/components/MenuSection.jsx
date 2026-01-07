import { useData } from '../contexts/DataContext'
import MenuCard from './MenuCard'

export default function MenuSection({ section }) {
  const { getItemsBySection } = useData()
  const items = getItemsBySection(section)

  const sectionTitle = section === 'bakery' ? 'Bakery Menu' : 'Catering Menu'
  const sectionEmoji = section === 'bakery' ? '🍰' : '🍽️'

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-3">
          {sectionEmoji} {sectionTitle}
        </h2>
        <p className="text-gray-700 font-medium">
          {section === 'bakery'
            ? 'Browse our selection of delicious eggless, vegetarian baked goods'
            : 'Explore our catering options for your special events'}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No items available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

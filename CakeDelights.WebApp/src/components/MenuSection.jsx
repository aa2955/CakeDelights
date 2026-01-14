import { useData } from '../contexts/DataContext'
import MenuCard from './MenuCard'

export default function MenuSection({ section }) {
  const { getItemsBySection } = useData()
  const items = getItemsBySection(section)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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

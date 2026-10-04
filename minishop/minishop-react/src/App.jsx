import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Profile from './components/Profile'

const categories = ['All', 'beauty', 'fragrances', 'furniture', 'groceries']

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('')
  const [activeTab, setActiveTab] = useState('products')

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch(() => {
        setError('ไม่สามารถโหลดข้อมูลได้')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    )
  }

  const filteredProducts = products.filter((product) => {
    const productName = product.name || product.title || ''
    const matchesSearch = productName.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low') {
      return a.price - b.price
    }
    if (sortBy === 'high') {
      return b.price - a.price
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        cartCount={cartCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="max-w-7xl mx-auto p-10">
        {activeTab === 'profile' ? (
          <Profile />
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Products
            </h2>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="w-full border p-3 rounded-lg bg-white"
            />

            <div className="flex gap-2 my-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={category === cat ? "bg-blue-600 text-white px-4 py-2 rounded-lg" : "bg-white text-gray-700 px-4 py-2 rounded-lg border"}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSortBy('low')}
                className={sortBy === 'low' ? "bg-blue-600 text-white px-4 py-2 rounded-lg" : "bg-white text-gray-700 px-4 py-2 rounded-lg border"}
              >
                Sort Price Low → High
              </button>
              <button
                onClick={() => setSortBy('high')}
                className={sortBy === 'high' ? "bg-blue-600 text-white px-4 py-2 rounded-lg" : "bg-white text-gray-700 px-4 py-2 rounded-lg border"}
              >
                Sort Price High → Low
              </button>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center p-10">
                ไม่พบสินค้าที่ค้นหา
              </div>
            ) : (
              <ProductList
                products={sortedProducts}
                onAddToCart={() => setCartCount(cartCount + 1)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
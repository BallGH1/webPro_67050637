function Header({ cartCount, activeTab, setActiveTab }) {
  return (
    <header className="bg-white shadow p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        MiniShop
      </h1>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab('products')}
          className={activeTab === 'products' ? "text-blue-600 font-bold" : "text-gray-600"}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={activeTab === 'profile' ? "text-blue-600 font-bold" : "text-gray-600"}
        >
          Profile
        </button>
        <div className="text-xl font-bold text-gray-700">
          🛒 {cartCount}
        </div>
      </div>
    </header>
  )
}

export default Header
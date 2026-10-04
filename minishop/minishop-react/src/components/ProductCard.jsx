function ProductCard({ name, price, icon, image, category, onAddToCart }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
      <div>
        <div className="text-5xl text-center h-32 flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="h-28 object-contain mx-auto" />
          ) : (
            <span>{icon}</span>
          )}
        </div>
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">
          {category}
        </span>
        <h3 className="mt-2 text-xl font-bold">
          {name}
        </h3>
        <p className="mt-2 text-xl font-bold text-blue-600">
          ฿{price}
        </p>
      </div>
      <button
        onClick={onAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
import ProductCard from './ProductCard'

function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name || product.title}
          price={product.price}
          icon={product.icon}
          image={product.image || product.thumbnail}
          category={product.category}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
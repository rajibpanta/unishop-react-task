export default function ProductCard({ product, onAdd }) {
  const inStock = product.stock > 0;

  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className={`stock ${inStock ? "available" : "sold-out"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="product-body">
        <span className="category-label">{product.category}</span>
        <h2>{product.name}</h2>
        <p className="vendor">Sold by {product.vendor}</p>

        <div className="product-footer">
          <strong>NPR {product.price.toLocaleString()}</strong>
          <button disabled={!inStock} onClick={() => onAdd(product)}>
            {inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
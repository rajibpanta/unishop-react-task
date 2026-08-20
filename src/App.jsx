import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";

function loadSavedCart() {
  try {
    const saved = localStorage.getItem("unishop-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(loadSavedCart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Unable to load products.");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("We couldn't load the products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("unishop-cart", JSON.stringify(cart));
  }, [cart]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesName && matchesCategory;
    });
  }, [products, debouncedSearch, category]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const vendors = [...new Set(cart.map((item) => item.vendor))];
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    if (product.stock <= 0) return;

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock)
              }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function updateQuantity(id, quantity) {
    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== id) return item;
          const product = products.find((p) => p.id === id);
          const max = product?.stock ?? item.quantity;
          return { ...item, quantity: Math.max(1, Math.min(quantity, max)) };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">UNISHOP NEPAL</p>
            <h1>Discover products from local sellers.</h1>
            <p className="hero-copy">
              A simple vendor storefront prototype built with React.
            </p>
          </div>
          <div className="hero-mark">NPR</div>
        </section>

        <section className="toolbar">
          <label className="search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </label>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {loading && (
          <div className="state">
            <div className="spinner" />
            <p>Loading products...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state error">
            <strong>Something went wrong</strong>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try again</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-row">
              <p>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
              {debouncedSearch && <span>Searching for “{debouncedSearch}”</span>}
            </div>

            {filteredProducts.length ? (
              <section className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                  />
                ))}
              </section>
            ) : (
              <div className="state empty">
                <h2>No products found</h2>
                <p>Try a different search term or category.</p>
              </div>
            )}
          </>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        vendors={vendors}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
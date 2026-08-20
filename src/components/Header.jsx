export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-icon">U</div>
          <div>
            <strong>unishop</strong>
            <span>Nepal</span>
          </div>
        </div>

        <button className="cart-button" onClick={onCartClick} aria-label="Open cart">
          <span>Cart</span>
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </div>
    </header>
  );
}
export default function CartDrawer({
  open,
  items,
  vendors,
  subtotal,
  onClose,
  onUpdate,
  onRemove
}) {
  if (!open) return null;

  return (
    <div className="drawer-layer" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <p className="eyebrow">YOUR BAG</p>
            <h2>Shopping Cart</h2>
          </div>
          <button className="close" onClick={onClose}>×</button>
        </div>

        {vendors.length > 1 && (
          <div className="vendor-warning">
            <strong>Multiple vendors</strong>
            <span>
              Your cart contains items from multiple vendors — they’ll be
              shipped separately.
            </span>
          </div>
        )}

        {!items.length ? (
          <div className="cart-empty">
            <div>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add something you like from the store.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.vendor}</p>
                    <strong>NPR {item.price.toLocaleString()}</strong>

                    <div className="quantity-row">
                      <div className="quantity">
                        <button onClick={() => onUpdate(item.id, item.quantity - 1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdate(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <button className="remove" onClick={() => onRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <strong>NPR {subtotal.toLocaleString()}</strong>
              </div>
              <p>Taxes and shipping are calculated separately.</p>
              <button className="checkout" disabled>Checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
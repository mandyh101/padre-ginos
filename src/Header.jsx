import { useContext } from "react";
import { CartContext } from "./contexts";

export default function Header() {
  // no updating in header so no need for setCart
  const [cart] = useContext(CartContext);

  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}

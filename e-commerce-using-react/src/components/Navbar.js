import logo from "./logo.jpg";
import "../App.css";

export default function Navbar() {
  return (
    <div className="header">
      <img id="logo" src={logo} alt="Logo" />
      <h2>SHOPPING CART</h2>
    </div>
  );
}

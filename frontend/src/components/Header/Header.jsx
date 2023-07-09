import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <h2 className="header__logo">MiniMedium</h2>
      <nav className="header__nav">
        <ol className="header__nav-list">
          <li className="header__nav-list__item">
            <Link>write</Link>
          </li>
          <li className="header__nav-list__item">
            <Link>sign in</Link>
          </li>
          <li className="header__nav-list__item header-btn-cta">
            <Link>get started</Link>
          </li>
        </ol>
      </nav>
    </header>
  );
};

export default Header;

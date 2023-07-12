import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../helpers/Context";
import "./HomeNav.css";

const HomeNav = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  return (
    <header className="header">
      <h2 className="header__title">
        MiniMedium for {miniMediumUserData.firstName}{" "}
        {miniMediumUserData.lastName}
      </h2>
      <nav className="header__nav">
        <ol className="header__nav--list">
          <div className="header__middle">
            <li className="header__nav-item">
              <Link className="header__nav-item--link" to="/explore">
                Explore reads
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-item--link" to="/write">
                write
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-item--link" to="/saves">
                saves
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-item--link">my account</Link>
            </li>
          </div>
          <li className="header__nav-item__profile">
            <div className="header__nav--profile-photo">
              <img
                src={miniMediumUserData.profilePicture}
                alt="user profile photo"
              />
            </div>
            <p className="header-nav-username">{miniMediumUserData.username}</p>
          </li>
        </ol>
      </nav>
    </header>
  );
};
export default HomeNav;

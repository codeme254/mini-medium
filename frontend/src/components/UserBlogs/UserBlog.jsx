import { Link } from "react-router-dom";
import { apiDomain } from "../../utils/utils";
import { UserContext } from "../../helpers/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UserBlog.css";

const UserBlog = ({
  item_id,
  title,
  description,
  article_image,
  dateCreated,
  lastUpdated,
}) => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const username = miniMediumUserData.username;
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate(`/edit/${item_id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Delete item");
  };

  const handleBubble = (e) => e.preventDefault();

  return (
    <Link
      to={`/read/${item_id}`}
      className="save-wrapper"
      onClick={handleBubble}
    >
      <div className="save-item">
        <div className="save-item__texts">
          <h2 className="save-item__texts--title">{title}</h2>
          <p className="save-item__texts--description">{description}</p>
          <p className="save-item__texts--date">Published on: {dateCreated}</p>
          <p className="save-item__texts--date">
            Last updated on: {lastUpdated}
          </p>
          <button onClick={handleNavigate} className="edit-btn">
            Edit blog
          </button>
          <button className="remove-button" onClick={handleDelete}>
            Delete blog
          </button>
        </div>
        <img
          src={article_image}
          alt="article image"
          className="save-item__image"
        />
      </div>
    </Link>
  );
};
export default UserBlog;

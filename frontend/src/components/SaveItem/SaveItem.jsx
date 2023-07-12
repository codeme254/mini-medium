import "./SaveItem.css";
import { Link } from "react-router-dom";
import { apiDomain } from "../../utils/utils";
import { UserContext } from "../../helpers/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
const SaveItem = ({
  item_id,
  title,
  description,
  article_image,
  dateCreated,
  lastUpdated,
}) => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const username = miniMediumUserData.username;
  const handleRemoveFromSaves = async (e) => {
    e.preventDefault();
    if (!username && !item_id) {
      toast.error("Something went wrong, please try again later");
      return;
    }
    const response = await fetch(
      `${apiDomain}/favorites/${username}/${item_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      toast.success(responseData.message);
      location.reload();
    } else {
      toast.error(responseData.message);
    }
  };
  return (
    <Link to={`/read/${item_id}`} className="save-wrapper">
      <div className="save-item">
        <div className="save-item__texts">
          <h2 className="save-item__texts--title">{title}</h2>
          <p className="save-item__texts--description">{description}</p>
          <p className="save-item__texts--date">Published on: {dateCreated}</p>
          <p className="save-item__texts--date">
            Last updated on: {lastUpdated}
          </p>
          <button className="remove-button" onClick={handleRemoveFromSaves}>
            Remove from saves
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
export default SaveItem;

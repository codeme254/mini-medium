import "./SaveItem.css";
import { Link } from "react-router-dom";
const SaveItem = ({
  item_id,
  title,
  description,
  article_image,
  dateCreated,
  lastUpdated,
}) => {
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
          <button className="remove-button">Remove from saves</button>
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

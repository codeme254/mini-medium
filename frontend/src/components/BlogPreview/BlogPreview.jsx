import { Link } from "react-router-dom";
import { PiHandsClappingBold } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";
import "./BlogPreview.css";
import { UserContext } from "../../helpers/Context";
import { useContext } from "react";
import { apiDomain } from "../../utils/utils";
import { toast } from "react-toastify";

const BlogPreview = ({
  blogId,
  title,
  description,
  bloggerFirstName,
  bloggerLastName,
  coverPhoto,
  bloggerPhoto,
  datePosted,
  claps,
}) => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const username = miniMediumUserData.username;
  const handleAddToSaves = async (e) => {
    e.preventDefault();
    if (!username && !blogId) {
      toast.error("Something went wrong, please try again later");
      return;
    }
    const response = await fetch(`${apiDomain}/favorites/${username}`, {
      method: "POST",
      body: JSON.stringify({ article_id: blogId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }
  };
  return (
    <Link className="blog-wrapper" to={`/read/${blogId}`}>
      <div className="blog-preview">
        <div className="blog-preview__left">
          <div className="blog-preview__left-user">
            <div className="blog-preview__left--user-photo">
              <img src={bloggerPhoto} alt="blogger avatar" />
            </div>
            <p className="blog-preview__left--username">
              By: {bloggerFirstName} {bloggerLastName}
            </p>
            <p className="blog-preview__left--date">
              Published On {datePosted}
            </p>
          </div>
          <h2 className="blog-preview__title">{title}</h2>
          <p className="blog-preview__description">{description}</p>
          <div className="blog-preview__controls">
            <button
              className="blog-preview__button-controls"
              onClick={handleAddToSaves}
            >
              <MdFavorite />
              save
            </button>
            <button className="blog-preview__button-controls">
              {" "}
              <PiHandsClappingBold />
              clap
            </button>
            <p className="claps">{claps} claps</p>
          </div>
        </div>
        <img
          src={coverPhoto}
          alt="blog cover"
          className="blog-preview__image--img"
        />
      </div>
    </Link>
  );
};
export default BlogPreview;

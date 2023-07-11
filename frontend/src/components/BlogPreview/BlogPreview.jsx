import { Link } from "react-router-dom";
import { PiHandsClappingBold } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";
import "./BlogPreview.css";

const BlogPreview = ({
  title,
  description,
  bloggerFirstName,
  bloggerLastName,
  coverPhoto,
  bloggerPhoto,
  datePosted,
  claps,
}) => {
  return (
    <Link className="blog-wrapper">
      <div className="blog-preview">
        <div className="blog-preview__left">
          <div className="blog-preview__left-user">
            <div className="blog-preview__left--user-photo">
              <img src={bloggerPhoto} alt="blogger avatar" />
            </div>
            <p className="blog-preview__left--username">
              By: {bloggerFirstName} {bloggerLastName}
            </p>
            <p className="blog-preview__left--date">Published On {datePosted}</p>
          </div>
          <h2 className="blog-preview__title">{title}</h2>
          <p className="blog-preview__description">{description}</p>
          <div className="blog-preview__controls">
            <button className="blog-preview__button-controls">
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

import BlogPreview from "../BlogPreview/BlogPreview";
import exampleCover from "../../assets/images/fantasy.jpg";
import exampleProfilePhot from "../../assets/images/user-6.jpg";
import "./BlogPreviews.css";
import { useEffect, useState } from "react";
import { apiDomain } from "../../utils/utils";

const BlogPreviews = () => {
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(`${apiDomain}/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const articles = await response.json();
      setPreviews(articles);
    };
    getArticles();
  }, [previews]);
  return (
    <div className="previews">
      {Array.isArray(previews) &&
        (previews.length > 0 ? (
          previews.map((preview, i) => (
            <BlogPreview
              bloggerFirstName={preview.articleAuthor.firstName}
              bloggerLastName={preview.articleAuthor.lastName}
              title={preview.title}
              description={preview.description}
              coverPhoto={preview.article_image}
              bloggerPhoto={preview.articleAuthor.profilePicture}
              datePosted={new Date(preview.dateCreated).toLocaleString()}
              claps={preview.claps}
            />
          ))
        ) : (
          <h1>No articles found at this moment</h1>
        ))}
      <BlogPreview
        bloggerFirstName="melinda"
        bloggerLastName="gates"
        title="How each and everyone of us can take care of nature"
        description="walk with me down this path as we look at how we can take care of nature"
        coverPhoto={exampleCover}
        bloggerPhoto={exampleProfilePhot}
        datePosted="4th Jan 2023"
      />
    </div>
  );
};

export default BlogPreviews;

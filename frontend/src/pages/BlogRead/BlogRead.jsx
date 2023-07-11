import { useParams } from "react-router-dom";
import { apiDomain } from "../../utils/utils";
import { useEffect, useState } from "react";
import "./BlogRead.css";
import HomeNav from "../../components/HomeNav/HomeNav";

const BlogRead = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const response = await fetch(`${apiDomain}/articles/${blogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setBlogData(responseData);
    };
    fetchBlogData();
  }, [blogId]);
  return (
    <div className="blog-read">
      <HomeNav />
      {!blogData ? null : (
        <div className="blog-body">
          <h3>{blogData.title}</h3>
          <img src={blogData.article_image} alt="article image" />
          <p className="blog-read-description">{blogData.description}</p>
          <p
            dangerouslySetInnerHTML={{ __html: blogData.text }}
            className="blog-text"
          />
        </div>
      )}
    </div>
  );
};

export default BlogRead;

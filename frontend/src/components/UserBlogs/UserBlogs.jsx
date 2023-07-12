import UserBlog from "./UserBlog";
import { UserContext } from "../../helpers/Context";
import { apiDomain } from "../../utils/utils";
import { useState, useEffect, useContext } from "react";
import "./UserBlogs.css";

const UserBlogs = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const username = miniMediumUserData.username;

  useEffect(() => {
    if (!username) return;
    const fetchUserBlogs = async () => {
      const userBlogs = await fetch(`${apiDomain}/articles/${username}`, {
        method: "POST",
        body: JSON.stringify({ emailAddress: miniMediumUserData.emailAddress }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUserBlogs = await userBlogs.json();
      setUserBlogs(allUserBlogs);
    };
    fetchUserBlogs();
  }, [miniMediumUserData]);
  return (
    <div className="user-blogs">
      {Array.isArray(userBlogs) &&
        (userBlogs.length <= 0 ? (
          <h2 className="use-blogs__title">
            You have not written any blogs, start writing to share your idea
            today
          </h2>
        ) : (
          <div>
            <h1 className="use-blogs__title">Your blogs</h1>
            {userBlogs.map((blog) => (
              <UserBlog
                key={blog._id}
                item_id={blog._id}
                title={blog.title}
                description={blog.description}
                article_image={blog.article_image}
                dateCreated={new Date(blog.dateCreated).toLocaleString()}
                lastUpdated={new Date(blog.lastUpdated).toLocaleString()}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default UserBlogs;

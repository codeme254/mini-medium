import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import HomeNav from "../../components/HomeNav/HomeNav";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiDomain } from "../../utils/utils";
import { toast } from "react-toastify";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const EditBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const { blogId } = useParams();
  useEffect(() => {
    if (!blogId) return;
    const fetchBlogData = async () => {
      const blog = await fetch(`${apiDomain}/articles/${blogId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const blogData_ = await blog.json();
      if (!blogData_) return;
      setBlogData(blogData_);
      setTitle(blogData_.title);
      setDescription(blogData_.description);
      setBody(blogData_.text);
    };
    fetchBlogData();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && body && description) {
      const newBody = { title, text: body, description };
      const response = await fetch(`${apiDomain}/articles/${blogId}`, {
        method: "PATCH",
        body: JSON.stringify(newBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Updating the post");
      } else {
        toast.error(responseData.message);
      }
    } else {
      toast.error("One of the fields is missing");
    }
  };

  return (
    <div className="edit-blog">
      <HomeNav />

      {blogData && (
        <form className="write-form">
          <div className="write-form-group">
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title: eg how to implement a linked list in Ruby"
              className="form-write-text-input"
              defaultValue={blogData.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="write-form-group">
            <label htmlFor="description">add your blog description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="title: eg in this blog, we understand how we can efficiently implement a linked list in ruby"
              className="form-write-text-input"
              defaultValue={blogData.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="write-form-group">
            <label htmlFor="synopsis" className="">
              Write your blog
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="editor"
              name="body"
              value={body}
              onChange={(content) => setBody(content)}
              defaultValue={blogData.text}
            ></ReactQuill>
          </div>

          <button
            type="submit"
            className="write-btn form-publish-btn"
            onClick={handleSubmit}
          >
            Publish
          </button>
          <button className="write-btn form-cancel-btn">cancel</button>
        </form>
      )}
    </div>
  );
};

export default EditBlog;

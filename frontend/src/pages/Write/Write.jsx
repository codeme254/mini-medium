import HomeNav from "../../components/HomeNav/HomeNav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.css";
import { useState, useContext } from "react";
import { UserContext } from "../../helpers/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import BeatLoader from "react-spinners/BeatLoader";
import { apiDomain } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

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

const Write = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [body, setBody] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  const uploadImage = () => {
    if (!imageUpload) return Promise.resolve(null);

    const imageRef = ref(storage, `article_images/${imageUpload.name + v4()}`);
    return uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .catch((error) => {
        console.log("Error occurred while uploading the avatar:", error);
        return null;
      });
  };

  const handleSubmit = async (e) => {
    setIsPublishing(true);
    e.preventDefault();
    if (title && description && body) {
      try {
        const article_image = await uploadImage();
        if (article_image) {
          const author = miniMediumUserData.emailAddress;
          const data = {
            title,
            description,
            article_image,
            text: body,
            author,
          };
          const response = await fetch(`${apiDomain}/articles`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const responseData = await response.json();
          if (response.ok) {
            toast.success("Your blog has been successfully published");
            navigate("/explore");
          } else {
            toast.error(responseData.message);
          }
        } else {
          toast.error(
            "There was an error uploading image, please try publishing again"
          );
        }
      } catch (e) {
        console.log("There was an error uploading image");
        console.log(e);
      }
    } else {
      toast.error("One of the fields is missing");
    }
    setIsPublishing(false);
  };
  return (
    <div>
      <HomeNav />
      <div className="write-window">
        {isPublishing ? (
          <div className="load-window">
            <BeatLoader />
            <h3>Publishing your blog, please wait</h3>
          </div>
        ) : null}
        <form className="write-form">
          <div className="write-form-group">
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title: eg how to implement a linked list in Ruby"
              className="form-write-text-input"
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="write-form-group">
            <label htmlFor="article_image">
              every good blog has an image, upload your blog image
            </label>
            <input
              type="file"
              name="article_image"
              id="article_image"
              placeholder="upload a file"
              className="form-write-text-input"
              onChange={(event) => setImageUpload(event.target.files[0])}
              required
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
      </div>
    </div>
  );
};
export default Write;

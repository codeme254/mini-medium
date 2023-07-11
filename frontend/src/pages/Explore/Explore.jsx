import { useContext } from "react";
import { UserContext } from "../../helpers/Context";
import HomeNav from "../../components/HomeNav/HomeNav";
import BlogPreviews from "../../components/BlogPreviews/BlogPreviews";
import "./Explore.css";

const Explore = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  console.log(miniMediumUserData);
  if (!miniMediumUserData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HomeNav />
      <div className="explore">
        <BlogPreviews />
      </div>
    </div>
  );
};

export default Explore;

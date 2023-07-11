import { useContext } from "react";
import { UserContext } from "../../helpers/Context";
import HomeNav from "../../components/HomeNav/HomeNav";

const Explore = () => {
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  console.log(miniMediumUserData);
  if (!miniMediumUserData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <HomeNav />
      <h3>Explore endless reads</h3>
    </div>
  );
};

export default Explore;
